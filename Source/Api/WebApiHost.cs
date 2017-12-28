using Microsoft.Owin.Hosting;
using System;

namespace ImglibApi
{
	public class WebApiHost : IDisposable
	{
		private readonly IDisposable webApp;
		private readonly int _port;
		public string BaseUrl => $"http://localhost:{_port}";

		public WebApiHost() : this(8080)
		{
		}

		public WebApiHost(int port)
		{
			if (port < 8000)
			{
				throw new ArgumentOutOfRangeException();
			}

			_port = port;
			webApp = WebApp.Start<Startup>(BaseUrl);
		}

		public void Dispose()
		{
			webApp.Dispose();
		}
	}
}
