using Imglib.Repository.Context;
using System;

namespace Imglib.Repository
{
	//TODO Class is redundant if test class uses dependency injection

	public class DisposableSqlLiteRepository : SqlLiteRepository
	{
		public DisposableSqlLiteRepository() : base(new DisposableSqlLiteContext()) { }
	}
}
