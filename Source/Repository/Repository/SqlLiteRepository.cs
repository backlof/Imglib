using ImglibRepository.Context;
using ImglibRepository.Table;
using ImglibRepository.Wrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImglibRepository.Repository
{
	public class SqlLiteRepository : IRepository, IDisposable
	{
		private readonly SqlLiteContext _context;

		public ITableWrapper<Image> Images { get; private set; }
		public ITableWrapper<Rating> Ratings { get; private set; }

		public SqlLiteRepository(SqlLiteContext context)
		{
			_context = context;

			Images = new TableWrapper<Image>(context, c => c.Images);
			Ratings = new TableWrapper<Rating>(context, c => c.Ratings);
		}

		public void Dispose()
		{
			_context.Dispose();
		}
	}
}
