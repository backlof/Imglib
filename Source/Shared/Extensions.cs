using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib
{
	public static class Extensions
	{
		public static string ToCamelCase(this string value)
		{
			return Char.ToLowerInvariant(value[0]) + value.Substring(1);
		}
	}
}
