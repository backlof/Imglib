using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ImglibHost;

namespace Imglib
{
	public partial class Browser : Form
	{
		private readonly Host _host;
		private ScriptInvoker _invoker;

		public Browser()
		{
			_host = new Host();
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
			browser.Navigate(_host.BaseUrl);
		}

		private void OnWebBrowserDocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
		{
			browser.ObjectForScripting = new WindowExternalObject(ref browser);
		}

		protected override void OnFormClosing(FormClosingEventArgs e)
		{
			//_invoker.Invoke(x => x.Testish());
			_invoker.Invoke(x => x.Test(), "Outpit");

			_host.Dispose();

			base.OnFormClosing(e);
		}
	}
}
