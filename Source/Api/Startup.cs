﻿using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;
using ImglibApi.Repository;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace ImglibApi
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
				 defaults: new { },
				  constraints: new
				  {
					  action = @"[A-Za-z]+",
					  httpMethod = new HttpMethodConstraint(HttpMethod.Post)
				  }
			);

			config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

#if DEBUG
			config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.Indented;
#else
			config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.None;
#endif

			//Deserialization is case insensitive
			config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

			appBuilder.UseNinjectMiddleware(SetUp).UseNinjectWebApi(config);
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
