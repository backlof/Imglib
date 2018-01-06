using System;

namespace Imglib.Repository.Table
{
	public partial class Rating : ITable
	{
		public int Id { get; set; }
		public int LoserId { get; set; }
		public int WinnerId { get; set; }
		public DateTime Added { get; set; }
	}

	public partial class Rating
	{
		public virtual Image Loser { get; set; }
		public virtual Image Winner { get; set; }
	}
}
