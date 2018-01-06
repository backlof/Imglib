using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Controller.Model
{
	public class ImageSet
	{
		public bool MissingImages { get; set; }
		public ImageFromSet First { get; set; }
		public ImageFromSet Second { get; set; }
	}
}
