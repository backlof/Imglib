using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Script.Serialization;
using Imglib.Host.Controller.Model;
using System.Net.Http;
using System.Text;
using Imglib.Host;
using System.Net;
using Imglib.Host.Controller;
using System.Linq.Expressions;

namespace Imglib.Host.Test.Server
{
	[TestClass]
	public class ApiTests
	{
		private void ShouldReceiveInternalError(string hosturl, string action, object content)
		{
			Assert.AreEqual(HttpStatusCode.InternalServerError, Post(hosturl, action, content).StatusCode);
		}

		private void ShouldReceiveNotFound(string hosturl, string action, object content)
		{
			Assert.AreEqual(HttpStatusCode.NotFound, Post(hosturl, action, content).StatusCode);
		}

		private void ShouldReceiveOK(string hosturl, string action, object content)
		{
			Assert.AreEqual(HttpStatusCode.OK, Post(hosturl, action, content).StatusCode);
		}

		private HttpResponseMessage Post(string hostUrl, string action, object content)
		{
			return (new HttpClient()).PostAsync($"{hostUrl}/api/test/{action}", new StringContent(new JavaScriptSerializer().Serialize(content), Encoding.UTF8, "application/json")).Result;
		}

		[TestMethod]
		public void ShouldBeAbleToDeserialize()
		{
			using (var host = new WebHost())
			{
				ShouldReceiveOK(host.Url, "success", null);
				ShouldReceiveOK(host.Url, "success", new { Name = "John Doe", Id = 0  });
				ShouldReceiveOK(host.Url, "success", 0);
			}
		}

		[TestMethod]
		public void ShouldReceiveInternalErrorDuringException()
		{
			using (var host = new WebHost())
			{
				ShouldReceiveInternalError(host.Url, "exception", new { });
			}
		}

		[TestMethod]
		public void ShouldReceiveNotFoundWhenThereIsNoSuchAction()
		{
			using (var host = new WebHost())
			{
				ShouldReceiveNotFound(host.Url, "notfound", new { });
			}
		}
	}
}
