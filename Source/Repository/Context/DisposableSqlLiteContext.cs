using System;
using System.IO;

namespace Imglib.Repository.Context
{
	public class DisposableSqlLiteContext : SqlLiteContext
	{
		public DisposableSqlLiteContext() : base(Directory.GetCurrentDirectory(), "Test.db") { }

		public void DeleteDbFile()
		{
			//Database.EnsureDeleted();
			if (File.Exists(_location))
			{
				File.Delete(_location);
			}
		}

		public override void Dispose()
		{
			DeleteDbFile();
			base.Dispose();
		}
	}
}
