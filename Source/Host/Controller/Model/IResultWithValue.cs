namespace ImglibHost.Controller.Model
{
	public interface IResultWithValue<T> : IResult
	{
		T Value { get; set; }
	}
}
