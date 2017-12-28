using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ImglibApp
{
	public interface IScriptInvokeFunction
	{
		void AddedFolder(object arguments);
	}

	public class ScriptInvoker : IScriptInvokeFunction
	{
		private readonly WebBrowser _browser;

		public ScriptInvoker(WebBrowser browser)
		{
			_browser = browser;
		}

		public void AddedFolder(object arguments)
		{
			Invoke("AddedFolder", arguments);
		}

		private void Invoke(string method, object arguments)
		{
			if (method == null)
			{
				throw new ArgumentNullException();
			}

			_browser.Document.InvokeScript(Char.ToLowerInvariant(method[0]) + method.Substring(1), new object[] { arguments });
		}
	}
}
