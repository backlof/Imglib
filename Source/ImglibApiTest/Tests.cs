using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using ImglibApi.Controller.Model;
using ImglibApi;

namespace ImglibApiTest
{
	[TestClass]
	public class Tests
	{
		[TestMethod]
		public void ShouldBeAbleToPostWithoutGetting404()
		{
			using (var webApiHost = new WebApiHost())
			{

				var json = new JavaScriptSerializer().Serialize(new Picture { Id = 2, Name = "test" });

				HttpClient client = new HttpClient();

				var response = client.PostAsync($"{webApiHost.BaseUrl}/api/image/givepictureback", new StringContent(json, Encoding.UTF8, "application/json")).Result;

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}
	}
}
