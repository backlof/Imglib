using System;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.FileSystems;
using System.IO;
using System.Reflection;
using Microsoft.Owin;

namespace OwinTest
{
	public class FileServerHost : IDisposable
	{
		private readonly IDisposable _webApp;
		private readonly int _port;

		public string Url => $"http://localhost:{_port}";

		public FileServerHost() : this(8080)
		{
		}

		public FileServerHost(int port)
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
