namespace Imglib.Host.Controller
{
	public interface IResultWithValue<T> : IResult
	{
		T Value { get; set; }
	}
}
