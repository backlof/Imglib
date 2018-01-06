using Imglib.Host.Controller.Model;

namespace Imglib.Host.Controller.Model
{
	public interface IVoidResult
	{
		bool Success { get; set; }
		ErrorCode Error { get; set; }
	}

	public class VoidResult : IVoidResult
	{
		public bool Success { get; set; }
		public ErrorCode Error { get; set; }
	}
}
