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
		private ScriptInvoker _invoker;

		public Browser()
		{
			_webApiHost = new WebApiHost();
			_webServerHost = new WebServerHost();
			InitializeComponent();
		}

		private void OnFormLoaded(object sender, EventArgs e)
		{
			_invoker = new ScriptInvoker(ref browser);
			browser.AllowNavigation = false;
			browser.AllowWebBrowserDrop = false;
			browser.IsWebBrowserContextMenuEnabled = false;
			browser.WebBrowserShortcutsEnabled = false;
			browser.ScrollBarsEnabled = false;
			browser.Navigate(_webServerHost.Url);
		}

		private void OnWebBrowserDocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
		{
			browser.ObjectForScripting = new WindowExternalObject(ref browser);
		}

		protected override void OnFormClosing(FormClosingEventArgs e)
		{
			//_invoker.Invoke(x => x.Testish());
			_invoker.Invoke(x => x.Test(), "Outpit");

			_webApiHost.Dispose();
			_webServerHost.Dispose();

			base.OnFormClosing(e);
		}
	}
}
