using ImglibRepository.Context;
using ImglibRepository.Table;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace ImglibRepository.Wrapper
{
	public class TableWrapper<TTable> : ITableWrapper<TTable> where TTable : class, ITable
	{
		protected readonly SqlLiteContext _context;
		protected readonly DbSet<TTable> _dbSet;

		public TableWrapper(SqlLiteContext context, Func<SqlLiteContext, DbSet<TTable>> dbSetFunc)
		{
			_context = context;
			_dbSet = dbSetFunc(context);
		}

		public IQueryable<TTable> Untracked => _dbSet.AsNoTracking();
		public IQueryable<TTable> Tracked => _dbSet.AsTracking();

		public void DetachAll(params TTable[] entries)
		{
			foreach (var entry in entries)
			{
				_context.Entry(entry).State = EntityState.Detached;
			}
		}

		public void Insert(TTable entry)
		{
			if (entry == null)
			{
				throw new ArgumentNullException("entry");
			}

			Insert(new[] { entry });
		}

		public void Insert(params TTable[] entries)
		{
			if (entries == null)
			{
				throw new ArgumentNullException("entries");
			}

			_dbSet.AddRange(entries);
			_context.SaveChanges();

			DetachAll(entries);
		}

		public void Update(TTable entry)
		{
			if (entry == null)
			{
				throw new ArgumentNullException("entry");
			}

			Update(new[] { entry });
		}

		public void Update(params TTable[] entries)
		{
			if (entries == null)
			{
				throw new ArgumentNullException("entries");
			}

			_dbSet.UpdateRange(entries);
			_context.SaveChanges();

			DetachAll(entries);
		}

		public void Remove(params TTable[] entries)
		{
			if (entries == null)
			{
				throw new ArgumentNullException("entries");
			}

			_dbSet.RemoveRange(entries);
			_context.SaveChanges();

			DetachAll(entries);
		}

		public void Remove(TTable entry)
		{
			if (entry == null)
			{
				throw new ArgumentNullException("entry");
			}

			Remove(new[] { entry });
		}

		public void RemoveById(int id)
		{
			if (id < 1)
			{
				throw new ArgumentOutOfRangeException("id");
			}

			Remove(x => x.Id == id);
		}

		public void RemoveById(params int[] ids)
		{
			if (ids == null)
			{
				throw new ArgumentNullException("ids");
			}

			Remove(x => ids.Contains(x.Id));
		}

		public void Remove(Expression<Func<TTable, bool>> condition)
		{
			if (condition == null)
			{
				throw new ArgumentNullException("condition");
			}

			Remove(Untracked.Where(condition).ToArray());
		}

		public void Update(Action<TTable> changes, Expression<Func<TTable, bool>> condition)
		{
			if (condition == null)
			{
				throw new ArgumentNullException("condition");
			}
			if (changes == null)
			{
				throw new ArgumentNullException("changes");
			}

			Update(Untracked.Where(condition).ToList().Select(x =>
			{
				changes(x);
				return x;

			}).ToArray());
		}
	}
}
