﻿namespace Imglib.Host.Module
{
	public class RatingCalculator : IRatingCalculator
	{
		public int? GetRating(int wins, int losses)
		{
			if (wins == 0 && losses == 0)
			{
				return null;
			}
			else if (losses == 0)
			{
				return 5;
			}
			else if (wins == 0)
			{
				return 1;
			}

			double ratio = (double)wins / (double)losses;

			if (ratio > 5) return 5;
			else if (ratio > 2) return 4;
			else if (ratio > 1) return 3;
			else if (ratio > 0.5) return 2;
			else return 1;
		}
	}
}
