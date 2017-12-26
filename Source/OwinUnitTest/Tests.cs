using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OwinTest;
using System.Net.Http;

namespace OwinUnitTest
{
	[TestClass]
	public class Tests
	{
		[TestMethod]
		public void ShouldNotGet404WhenGettingIndexHtml()
		{
			using (var fileServerHost =  new FileServerHost())
			{
				HttpClient client = new HttpClient();

				var response = client.GetAsync($"{fileServerHost.Url}/index.html").Result;
				var result = response.ToString();

				Assert.IsFalse(response.ToString().Contains("404"));
			}
		}
	}
}
