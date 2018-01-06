using Imglib.Host.Controller.Model;

namespace Imglib.Host.Controller
{
	public class Result
	{
		public static IGenericResult<T> Value<T>(T value)
		{
			return new GenericResult<T> { Success = true, Value = value };
		}

		public static IGenericResult<T> Fail<T>(ErrorCode code)
		{
			return new GenericResult<T> { Success = false, Error = code };
		}

		public static IVoidResult Fail(ErrorCode code)
		{
			return new VoidResult { Success = false, Error = code };
		}

		public static IVoidResult Success()
		{
			return new VoidResult { Success = true };
		}
	}
}
