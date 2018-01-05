using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Controller.Model
{
	public class VoidResult : IResult
	{
		public bool Success { get; set; }
		public ErrorCode Error { get; set; }
	}
}
