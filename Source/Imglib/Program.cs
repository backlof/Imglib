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
			OpenApplicationInBrowser();
#else
			OpenApplicationInWindowsForms();
#endif
		}


		public static void OpenApplicationInBrowser()
		{
			//Console.WriteLine("Initializing...");
			//Console.WriteLine();

			var api = new WebApiHost();
			var fileServer = new WebServerHost();
			System.Diagnostics.Process.Start(fileServer.Url);

			Console.Write("Press enter to exit:");
			Console.Read();

			api.Dispose();
			fileServer.Dispose();
		}

		public static void OpenApplicationInWindowsForms()
		{
			Application.EnableVisualStyles();
			Application.SetCompatibleTextRenderingDefault(false);
			Application.Run(new Browser());
		}
	}
}
