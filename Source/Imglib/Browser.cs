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
		private readonly WebApiHost _webApi;
		private readonly WebServerHost _fileServer;

		public Browser()
		{
			_webApi = new WebApiHost();
			_fileServer = new WebServerHost();
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			webBrowser1.Navigate(_fileServer.Url);
			//var directory = System.IO.Directory.GetCurrentDirectory();
			//new Uri(System.IO.Path.Combine(directory, "Web", "Page.html")));
		}

		private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
		{

		}

		protected override void OnFormClosing(FormClosingEventArgs e)
		{
			_webApi.Dispose();
			_fileServer.Dispose();
			base.OnFormClosing(e);
		}
	}
}
