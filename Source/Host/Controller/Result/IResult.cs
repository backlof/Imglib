using Imglib.Host.Controller.Model;

namespace Imglib.Host.Controller
{
	public interface IResult
	{
		bool Success { get; set; }
		ErrorCode Error { get; set; }
	}
}
