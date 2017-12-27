using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ImglibWeb;
using System.Net.Http;

namespace ImglibWebTest
{
	[TestClass]
	public class Tests
	{
		[TestMethod]
		public void ShouldNotGet404WhenGettingIndexHtml()
		{
			using (var fileServerHost =  new WebServerHost())
			{
				HttpClient client = new HttpClient();

				var response = client.GetAsync($"{fileServerHost.Url}/index.html").Result;
				var result = response.ToString();

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}
	}
}
