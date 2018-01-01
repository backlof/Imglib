using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Text;
using ImglibHost;
using ImglibHost.Controller.Model;

namespace ImglibHostTest.Server
{
	[TestClass]
	public class FileServerTests
	{
		[TestMethod]
		public void ShouldNotGet404WhenGettingFile()
		{
			using (var host = new Host())
			{
				HttpClient client = new HttpClient();

				var response = client.GetAsync($"{host.Url}/index.html").Result;
				var result = response.ToString();

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}
	}
}
