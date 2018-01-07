using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Imglib.Host;

namespace Imglib
{
	public partial class Browser : Form
	{
		private WebHost _host;
		private ScriptInvoker _invoker;

		public Browser()
		{
			_host = new WebHost();
			InitializeComponent();
		}

		private void OnFormLoaded(object sender, EventArgs e)
		{
			_invoker = new ScriptInvoker(ref browser);
			browser.AllowNavigation = false;
			browser.AllowWebBrowserDrop = false;
			browser.IsWebBrowserContextMenuEnabled = false;
			browser.WebBrowserShortcutsEnabled = false;
			//browser.ScrollBarsEnabled = false;
			browser.Navigate(_host.Url);
		}

		private void OnWebBrowserDocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
		{
			browser.ObjectForScripting = new WindowExternalObject(ref browser, ref _host);
		}

		protected override void OnFormClosing(FormClosingEventArgs e)
		{
			_host.Dispose();
			base.OnFormClosing(e);
		}
	}
}
