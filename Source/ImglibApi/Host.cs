using Microsoft.Owin.Hosting;
using System;

namespace ImglibApi
{
	public class ImglibHost : IDisposable
	{
		private readonly IDisposable webApp;

		public ImglibHost()
		{
			webApp = WebApp.Start<Startup>("http://localhost:9000/");
		}

		public void Dispose()
		{
			webApp.Dispose();
		}
	}
}
