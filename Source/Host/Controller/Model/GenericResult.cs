namespace Imglib.Host.Controller.Model
{
	public interface IGenericResult<T> : IVoidResult
	{
		T Value { get; set; }
	}

	public class GenericResult<T> : IGenericResult<T>
	{
		public T Value { get; set; }
		public bool Success { get; set; }
		public ErrorCode Error { get; set; }
	}
}
