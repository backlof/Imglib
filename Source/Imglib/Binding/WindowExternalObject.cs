using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Security.Permissions;
using System.IO;
using Imglib.Host;

namespace Imglib
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
		private readonly WebHost _host;

		public WindowExternalObject(ref WebBrowser browser, ref WebHost host)
		{
			_webBrowser = browser;
			_host = host;
		}

		public bool AddFiles()
		{
			var fileDialog = new OpenFileDialog
			{
				Multiselect = true,
				Filter = "Image Files|*.jpg;*.jpeg;*.png;",
				InitialDirectory = Directory.GetCurrentDirectory(),
				Title = "Select images to add to library."
			};

			if (fileDialog.ShowDialog() == DialogResult.OK)
			{
				if (fileDialog.FileNames.Any())
				{
					_host.ImageService.AddImages(fileDialog.FileNames);
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		}

		public void OpenWebPageInBrowser(string url)
		{
			System.Diagnostics.Process.Start(@"https://github.com/backlof/Imglib");
		}
	}
}
