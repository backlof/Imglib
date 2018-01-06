using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Module
{
	public interface IRatingCalculator
	{
		int? GetRating(int wins, int losses);
	}
}
