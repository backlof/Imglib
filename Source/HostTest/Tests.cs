using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using ImglibHost;
using ImglibHost.Controller.Model;

namespace ImglibHostTest
{
	[TestClass]
	public class Tests
	{
		[TestMethod]
		public void ShouldBeAbleToPostWithoutGetting404()
		{
			using (var host = new Host())
			{

				var json = new JavaScriptSerializer().Serialize(new Picture { Id = 2, Name = "test" });

				HttpClient client = new HttpClient();

				var response = client.PostAsync($"{host.BaseUrl}/api/image/givepictureback", new StringContent(json, Encoding.UTF8, "application/json")).Result;

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}

		[TestMethod]
		public void ShouldNotGet404WhenGettingIndexHtml()
		{
			using (var host = new Host())
			{
				HttpClient client = new HttpClient();

				var response = client.GetAsync($"{host.BaseUrl}/index.html").Result;
				var result = response.ToString();

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}
	}
}
