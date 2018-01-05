using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using Imglib.Host;
using Imglib.Host.Controller.Model;
using System.Net;

namespace Imglib.Host.Test.Server
{
	[TestClass]
	public class FileServerTests
	{
		private void ShouldReceiveNotFound(string url)
		{
			Assert.AreEqual(HttpStatusCode.NotFound, Get(url).StatusCode);
		}

		private void ShouldReceiveOK(string url)
		{
			Assert.AreEqual(HttpStatusCode.OK, Get(url).StatusCode);
		}

		private HttpResponseMessage Get(string url)
		{
			return (new HttpClient()).GetAsync(url).Result;
		}

		[TestMethod]
		public void ShouldBeAbleToFindIndexHtml()
		{
			using (var host = new WebHost())
			{
				ShouldReceiveOK($"{host.Url}/index.html");
			}
		}

		[TestMethod]
		public void ShouldReceiveNotFoundWhenThereIsNoSuchFile()
		{
			using (var host = new WebHost())
			{
				ShouldReceiveNotFound($"{host.Url}/notfound.html");
			}
		}
	}
}
