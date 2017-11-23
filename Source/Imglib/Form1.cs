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

namespace Imglib
{
	public partial class Form1 : Form
	{
		private readonly ImglibHost _host;

		public Form1()
		{
			_host = new ImglibHost();
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			var directory = System.IO.Directory.GetCurrentDirectory();
			webBrowser1.Navigate(new Uri(System.IO.Path.Combine(directory, "Web", "Page.html")));
		}

		private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
		{

		}

		protected override void OnFormClosing(FormClosingEventArgs e)
		{
			_host.Dispose();
			base.OnFormClosing(e);
		}
	}
}
