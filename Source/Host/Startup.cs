using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;
using ImglibHost.Repository;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace ImglibHost
{
	public class Startup
	{
		public void Configuration(IAppBuilder appBuilder)
		{
			// Configure Web API for self-host. 
			HttpConfiguration config = new HttpConfiguration();

			config.Routes.MapHttpRoute(
				 name: "Web Api RPC",
				 routeTemplate: "api/{controller}/{action}",
				 defaults: new { id = RouteParameter.Optional },
				 constraints: new
				 {
					 action = @"[A-Za-z]+",
					 httpMethod = new HttpMethodConstraint(HttpMethod.Post)
				 }
			);

#if DEBUG
			config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.Indented;
#else
			config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.None;
#endif
			config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
			config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver(); //REMEMBER Deserialization is case insensitive
			appBuilder.UseNinjectMiddleware(SetUp).UseNinjectWebApi(config);

			appBuilder.UseFileServer(new FileServerOptions
			{
				EnableDefaultFiles = true,
				FileSystem = new PhysicalFileSystem(""),
				EnableDirectoryBrowsing = true, // Will not happen as long as there is an Index.html
			});
		}

		public StandardKernel SetUp()
		{
			//TODO Recieve kernel? That way Imglib can have the same Repository
			var kernel = new StandardKernel();
			kernel.Bind<ImglibRepository>().ToSelf().InSingletonScope();
			return kernel;
		}
	}
}