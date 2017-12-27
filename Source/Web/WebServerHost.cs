using System;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.FileSystems;
using System.IO;
using System.Reflection;
using Microsoft.Owin;

namespace ImglibWeb
{
	public class WebServerHost : IDisposable
	{
		private readonly IDisposable _webApp;
		private readonly int _port;

		public string Url => $"http://localhost:{_port}";

		public WebServerHost() : this(8080)
		{
		}

		public WebServerHost(int port)
		{
			if (port < 8000)
			{
				throw new ArgumentOutOfRangeException();
			}

			_port = port;
			_webApp = WebApp.Start<Startup>(Url);
		}

		public void Dispose()
		{
			_webApp.Dispose();
		}
	}
}
