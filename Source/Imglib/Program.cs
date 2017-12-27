using ImglibApi;
using ImglibWeb;
using System;
using System.Windows.Forms;

namespace ImglibApp
{
	static class Program
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
#if DEBUG
			InitializeDebug();
#else
			InitializeRelease();
#endif
		}

		public static void InitializeDebug()
		{
			Console.WriteLine("Initializing api...");
			var api = new WebApiHost();
			Console.WriteLine("Initializing file server");
			var fileServer = new WebServerHost();

			Console.WriteLine("Opening web site...");
			System.Diagnostics.Process.Start(fileServer.Url);

			Console.Write("Press enter to exit:");
			Console.Read();

			Console.WriteLine("Disposing of api...");
			api.Dispose();
			Console.WriteLine("Disposing of file server...");
			fileServer.Dispose();
		}

		public static void InitializeRelease()
		{
			Application.EnableVisualStyles();
			Application.SetCompatibleTextRenderingDefault(false);
			Application.Run(new Browser());
		}
	}
}
