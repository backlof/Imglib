using System;
using Microsoft.Owin.Hosting;

namespace ImglibHost
{
	public class Host : IDisposable
	{
		private readonly IDisposable _owin;
		private readonly int _port;
		public string BaseUrl => $"http://localhost:{_port}";

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
			_owin = WebApp.Start<Startup>(BaseUrl);
		}

		public void Dispose()
		{
			_owin.Dispose();
		}
	}
}
