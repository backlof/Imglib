using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Imglib.Repository.Table;

namespace Imglib.Repository.Wrapper
{
	public interface ITableWrapper<TTable> where TTable : class, ITable
	{
		IQueryable<TTable> Tracked { get; }
		IQueryable<TTable> Untracked { get; }

		void Insert(TTable entry);
		void Insert(params TTable[] entry);
		void Insert(IEnumerable<TTable> entry);

		void Update(TTable entry);
		void Update(params TTable[] entries);
		void Update(IEnumerable<TTable> entries);
		void Update(Action<TTable> changes, Expression<Func<TTable, bool>> condition);

		void Remove(TTable entry);
		void Remove(params TTable[] entries);
		void Remove(IEnumerable< TTable> entries);
		void Remove(Expression<Func<TTable, bool>> condition);

		void RemoveById(int id);
		void RemoveById(params int[] ids);
		void RemoveById(IEnumerable<int> ids);
	}
}
