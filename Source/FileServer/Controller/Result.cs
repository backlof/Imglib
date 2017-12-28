using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ImglibHost.Controller.Model;

namespace ImglibHost.Controller
{
	public class Result
	{
		public static IResultWithValue<T> Value<T>(T value)
		{
			return new GenericResult<T> { Success = true, Value = value };
		}

		public static IResultWithValue<T> Fail<T>()
		{
			return new GenericResult<T> { Success = false };
		}

		public static IResult Fail()
		{
			return new VoidResult { Success = false };
		}

		public static IResult Success()
		{
			return new VoidResult { Success = true };
		}
	}

	public class ConcatResult<T> : IResult, IResultWithValue<T>
	{
		public T Value { get; set; }
		public bool Success { get; set; }
	}

	public class GenericResult<T> : IResultWithValue<T>
	{
		public T Value { get; set; }
		public bool Success { get; set; }
	}

	public class VoidResult : IResult
	{
		public bool Success { get; set; }
	}
}
