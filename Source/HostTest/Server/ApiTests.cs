using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Script.Serialization;
using ImglibHost.Controller.Model;
using System.Net.Http;
using System.Text;
using ImglibHost;

namespace ImglibHostTest.Server
{

	[TestClass]
	public class ApiTests
	{
		private TestInput DefaultMethodArgument => new TestInput { Age = 999, Name = "John Doe" };

		private HttpResponseMessage Post(string hostUrl, string action, object content)
		{
			return (new HttpClient()).PostAsync($"{hostUrl}/api/test/${action}", new StringContent(new JavaScriptSerializer().Serialize(content), Encoding.UTF8, "application/json")).Result;
		}

		[TestMethod]
		public void ShouldBeAbleToRunAction()
		{
			using (var host = new Host())
			{
				var response = Post(host.Url, "valuecheck", DefaultMethodArgument);
				Assert.IsFalse(response.Received404());

				//TODO Check values; first that success = true, then that value is correct
			}
		}

		public void ShouldGet404WhenThereIsNoSuchAction()
		{
			using (var host = new Host())
			{
				var response = Post(host.Url, "nonexistantmethod", DefaultMethodArgument);
				Assert.IsTrue(response.Received404());
			}
		}

		public void Should404WhenThereIsAnException()
		{
			using (var host = new Host())
			{
				var response = Post(host.Url, "exceptionmethod", DefaultMethodArgument);
				Assert.IsTrue(response.Received404());
			}
		}

		public void ShouldFailWhenCantSerialize()
		{
			using (var host = new Host())
			{
				var response = Post(host.Url, "valuecheck", new NonDeserializableObject { Id = 10, Name = "John Doe" });
				Assert.IsFalse(response.Received404());
			}
		}

		public void ShouldReturnSuccessEqualsFalse()
		{
			using (var host = new Host())
			{
				var response = Post(host.Url, "failmethod", DefaultMethodArgument);
				Assert.IsFalse(response.Received404());
				//TODO Check that method returned success = false
			}
		}
	}
}
