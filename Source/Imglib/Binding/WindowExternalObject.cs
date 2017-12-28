using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Security.Permissions;

namespace ImglibApp
{
	//REMEMBER Frontend feezes when these functions are running
	//REMEMBER Lists and arrays don't work
	//REMEMBER Multiple parameters are okay
	//REMEMBER I only think primary values work, probably nothing invisible to COM
	//REMEMBER Only checks for methods

	public interface IWindowExternalObject
	{
		bool AddFiles();
		void OpenWebPageInBrowser(string url);
	}

	[PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
	[ComVisibleAttribute(true)]
	public class WindowExternalObject : IWindowExternalObject
	{
		private readonly WebBrowser _webBrowser;

		public WindowExternalObject(ref WebBrowser browser)
		{
			_webBrowser = browser;
		}

		public bool AddFiles()
		{
			return true;
		}

		public void OpenWebPageInBrowser(string url)
		{
			System.Diagnostics.Process.Start(@"https://github.com/backlof/Imglib");
		}
	}
}
