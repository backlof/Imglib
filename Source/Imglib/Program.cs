using Imglib.Host;
using System;
using System.Windows.Forms;

namespace Imglib
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
			//OpenApplicationInBrowser();
			OpenApplicationInWindowsForms();
#else
			OpenApplicationInWindowsForms();
#endif
		}


		public static void OpenApplicationInBrowser()
		{
			var host = new Host.WebHost();

			System.Diagnostics.Process.Start(host.Url);

			Console.Write("Press enter to exit:");
			Console.Read();

			host.Dispose();
		}

		public static void OpenApplicationInWindowsForms()
		{
			Application.EnableVisualStyles();
			Application.SetCompatibleTextRenderingDefault(false);
			Application.Run(new Browser());
		}
	}
}
