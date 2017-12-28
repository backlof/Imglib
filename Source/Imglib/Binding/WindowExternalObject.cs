using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ImglibApp
{
	public interface IWindowExternalObject
	{
		void AddFiles();
		void OpenAboutPage();
	}

	[ComVisibleAttribute(true)]
	public class WindowExternalObject : IWindowExternalObject
	{
		private readonly WebBrowser _webBrowser;
		private readonly ScriptInvoker _scriptInvoker;

		public WindowExternalObject(WebBrowser browser, ScriptInvoker scriptInvoker)
		{
			_webBrowser = browser;
			_scriptInvoker = scriptInvoker;
		}

		public void AddFiles()
		{
			MessageBox.Show("Should add files now");
			_scriptInvoker.AddedFolder(true);
		}

		public void OpenAboutPage()
		{
			System.Diagnostics.Process.Start(@"https://github.com/backlof/Imglib");
		}
	}
}
