using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Controller.Model
{
	public class Result<T> : IResultWithValue<T>
	{
		public T Value { get; set; }
		public bool Success { get; set; }
		public ErrorCode Error { get; set; }
	}
}
