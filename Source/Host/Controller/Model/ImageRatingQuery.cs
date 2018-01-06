using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Controller.Model
{
	public class ImageRatingQuery
	{
		public int Skip { get; set; }
		public int Take { get; set; }
		public int Rating { get; set; }
	}
}
