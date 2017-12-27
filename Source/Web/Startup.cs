using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

namespace ImglibWeb
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			app.UseFileServer(new FileServerOptions
			{
				EnableDefaultFiles = true,
				FileSystem = new PhysicalFileSystem(""),
				EnableDirectoryBrowsing = true, // Will not happen as long as there is an Index.html
			});
		}
	}
}
