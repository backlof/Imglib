using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ImglibApp
{
	//REMEMBER This only works for one parameter, which is why it's the return type
	//REMEMBER Only checks for methods

	public interface IScriptInvokeFunction
	{
		string Test();
		void Testish();
	}

	public class ScriptInvoker
	{
		private readonly WebBrowser _browser;

		public ScriptInvoker(ref WebBrowser browser)
		{
			_browser = browser;
		}

		public void Invoke(Expression<Action<IScriptInvokeFunction>> method)
		{
			if (method == null)
			{
				throw new ArgumentNullException();
			}

			InternalInvoke((method.Body as MethodCallExpression).Method.Name.ToCamelCase());
		}

		public void Invoke<T>(Expression<Func<IScriptInvokeFunction, T>> method, T argument)
		{
			if (method == null)
			{
				throw new ArgumentNullException();
			}

			InternalInvoke((method.Body as MethodCallExpression).Method.Name.ToCamelCase(), argument);
		}

		private void InternalInvoke<T>(string name, T argument)
		{
			_browser.Document.InvokeScript(name, new object[] { argument });
		}

		private void InternalInvoke(string name)
		{
			_browser.Document.InvokeScript(name);
		}
	}
}
