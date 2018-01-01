using System;
using Microsoft.Owin.Hosting;
using Ninject;
using Owin;
using System.Web.Http;
using System.Net.Http;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.FileSystems;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using System.Web.Http.Routing;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ImglibRepository.Context;
using ImglibRepository.Repository;
using ImglibHost.Service;
using System.IO;

namespace ImglibHost
{
	public class Host : IDisposable
	{
		private readonly IDisposable _owin;
		private readonly int _port;
		public string Url => $"http://localhost:{_port}";
		private readonly StandardKernel _kernel;

		#region Services
		public ImageService ImageService { get; private set; }
		#endregion

		public Host() : this(8080)
		{

		}

		public Host(int port)
		{
			if (port < 8000 || port > 9999)
			{
				throw new ArgumentOutOfRangeException();
			}

			_port = port;
			_kernel = new StandardKernel();
			#region Declare dependencies
			//TODO Clean up dependencies?
			_kernel.Bind<IRepository>().To<LocalSqlLiteRepository>().InSingletonScope();
			_kernel.Bind<ImageService>().To<ImageService>().InTransientScope();
			#endregion
			#region Create services
			ImageService = _kernel.Get<ImageService>();
			#endregion
			_owin = WebApp.Start(Url, Configuration);
		}

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
			appBuilder.UseNinjectMiddleware(() => _kernel).UseNinjectWebApi(config);

			appBuilder.UseFileServer(new FileServerOptions
			{
				EnableDefaultFiles = true,
				FileSystem = new PhysicalFileSystem(""),
				EnableDirectoryBrowsing = true, //REMEMBER Will not happen as long as there is an Index.html
			});
		}

		public void Dispose()
		{
			_owin.Dispose();
			_kernel.Dispose(); //REMEMBER Ninject disposes of the objects it creates when they're not in transient scope
		}
	}
}
