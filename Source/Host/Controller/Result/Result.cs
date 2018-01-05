using Imglib.Host.Controller.Model;

namespace Imglib.Host.Controller
{
	public class Result
	{
		public static IResultWithValue<T> Value<T>(T value)
		{
			return new Result<T> { Success = true, Value = value };
		}

		public static IResultWithValue<T> Fail<T>(ErrorCode code)
		{
			return new Result<T> { Success = false, Error = code };
		}

		public static IResult Fail(ErrorCode code)
		{
			return new VoidResult { Success = false, Error = code };
		}

		public static IResult Success()
		{
			return new VoidResult { Success = true };
		}
	}
}
