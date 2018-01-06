namespace Imglib.Host.Module
{
	public class SortCalculator : ISortCalculator
	{
		public double GetSortValue(int wins, int losses)
		{
			return (double)(wins + 1) / (double)(losses + 1);
		}
	}
}
