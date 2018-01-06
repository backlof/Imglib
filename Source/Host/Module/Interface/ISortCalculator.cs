using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Module
{
	public interface ISortCalculator
	{
		double GetSortValue(int wins, int losses);
	}
}
