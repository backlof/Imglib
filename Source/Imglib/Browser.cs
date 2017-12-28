using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ImglibApi;
using ImglibWeb;

namespace ImglibApp
{
	public partial class Browser : Form
	{
		private readonly WebApiHost _webApiHost;
		private readonly WebServerHost _webServerHost;

		public Browser()
		{
			_webApiHost = new WebApiHost();
			_webServerHost = new WebServerHost();
			InitializeComponent();
		}

		private void OnFormLoaded(object sender, EventArgs e)
		{
			browser.AllowNavigation = false;
			browser.AllowWebBrowserDrop = false;
			browser.IsWebBrowserContextMenuEnabled = false;
			browser.WebBrowserShortcutsEnabled = false;
			browser.ObjectForScripting = new WindowExternalObject(browser, new ScriptInvoker(browser));
			browser.Navigate(_webServerHost.Url);
		}

		private void OnWebBrowserDocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
		{
		}

		protected override void OnFormClosing(FormClosingEventArgs e)
		{
			_webApiHost.Dispose();
			_webServerHost.Dispose();

			base.OnFormClosing(e);
		}

		public void OpenAboutPage()
		{
			
		}
	}
}
