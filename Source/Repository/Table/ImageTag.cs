using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Repository.Table
{
	public partial class ImageTag : ITable
	{
		public int ImageId { get; set; }
		public int TagId { get; set; }
		public DateTime Added { get; set; }
	}

	public partial class ImageTag
	{
		public virtual Tag Tag { get; set; }
		public virtual Image Image { get; set; }
	}
}
