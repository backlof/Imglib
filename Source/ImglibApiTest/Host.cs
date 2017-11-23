using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using ImglibApi.Controller.Model;

namespace ImglibApiTest
{
	[TestClass]
	public class Host
	{
		[TestMethod]
		public void Post()
		{
			using (var host = new ImglibApi.ImglibHost())
			{

				var json = new JavaScriptSerializer().Serialize(new Picture { Id = 2, Name = "test" });

				HttpClient client = new HttpClient();
				var requestUri = $"http://localhost:9000/image/givepictureback";


				var response = client.PostAsync("http://localhost:9000/api/image/givepictureback", new StringContent(json, Encoding.UTF8, "application/json")).Result;

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}
	}
}
