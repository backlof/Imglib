using System.Net.Http;

namespace Imglib.Host.Test.Server
{
	public static class Extensions
	{
		public static bool ReceivedNotFoundError(this HttpResponseMessage message)
		{
			return message.ToString().Contains("404");
		}

		public static bool ReceivedInternalServerError(this HttpResponseMessage message)
		{
			return message.ToString().Contains("500");
		}
	}
}
