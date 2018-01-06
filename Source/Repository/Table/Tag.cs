using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Repository.Table
{
	public partial class Tag : ITable
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime Added { get; set; }
	}

	public partial class Tag
	{
		public ICollection<ImageTag> ImageTags { get; set; }
	}
}
