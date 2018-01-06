using Imglib.Repository.Context;
using Imglib.Repository.Table;
using Imglib.Repository.Wrapper;
using System;

namespace Imglib.Repository
{
	public class SqlLiteRepository : IRepository, IDisposable
	{
		private readonly SqlLiteContext _context;

		public ITableWrapper<Image> Images { get; private set; }
		public ITableWrapper<Rating> Ratings { get; private set; }
		public ITableWrapper<Tag> Tags { get; private set; }
		public ITableWrapper<ImageTag> ImageTags { get; private set; }

		public SqlLiteRepository(SqlLiteContext context)
		{
			_context = context;

			Images = new TableWrapper<Image>(context, c => c.Images);
			Ratings = new TableWrapper<Rating>(context, c => c.Ratings);
			Tags = new TableWrapper<Tag>(context, c => c.Tags);
			ImageTags = new TableWrapper<ImageTag>(context, c => c.ImageTags);
		}

		public void Dispose()
		{
			_context.Dispose();
		}
	}
}
