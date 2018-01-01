using System.Net.Http;

namespace ImglibHostTest.Server
{
	public static class Extensions
	{
		public static bool Received404(this HttpResponseMessage message)
		{
			return message.ToString().Contains("404");
		}
	}
}
