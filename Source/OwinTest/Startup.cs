using Microsoft.Owin.StaticFiles;
using Owin;

namespace OwinTest
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			//var x = System.AppDomain.CurrentDomain.BaseDirectory;

			app.UseFileServer(new FileServerOptions
			{
				//EnableDefaultFiles = true,
				//FileSystem = new PhysicalFileSystem("Assets"),
				EnableDirectoryBrowsing = true
			});

			//app.UseStaticFiles(new StaticFileOptions
			//{
			//	RequestPath = new PathString()
			//})


			//var relativePath = string.Format(@"..{0}..{0}", Path.DirectorySeparatorChar);
			//string contentPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), relativePath);

			//app.UseFileServer(new FileServerOptions()
			//{
			//	RequestPath = PathString.Empty,
			//	FileSystem = new PhysicalFileSystem(contentPath),
			//});

			//app.UseStaticFiles(new StaticFileOptions()
			//{
			//	RequestPath = new PathString(""),
			//	FileSystem = new PhysicalFileSystem(contentPath)
			//});
		}
	}
}
