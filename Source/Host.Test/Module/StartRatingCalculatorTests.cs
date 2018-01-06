using Imglib.Host.Module;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Imglib.Host.Test.Module
{
	[TestClass]
	public class StartRatingCalculatorTests
	{
		private RatingCalculator StarRatingCalculator => new RatingCalculator();

		[TestMethod]
		public void ShouldReturnNullWhenThereAreNoRatings()
		{
			Assert.IsNull(StarRatingCalculator.GetRating(0, 0));
		}

		[TestMethod]
		public void ShouldReturnFiveWhenThereAreNoLosses()
		{
			Assert.AreEqual(5, StarRatingCalculator.GetRating(1, 0));
			Assert.AreEqual(5, StarRatingCalculator.GetRating(10, 0));
			Assert.AreEqual(5, StarRatingCalculator.GetRating(100, 0));
		}


		[TestMethod]
		public void ShouldReturnOneWhenThereAreNoWins()
		{
			Assert.AreEqual(1, StarRatingCalculator.GetRating(0, 1));
			Assert.AreEqual(1, StarRatingCalculator.GetRating(0, 10));
			Assert.AreEqual(1, StarRatingCalculator.GetRating(0, 100));
		}

		[TestMethod]
		public void ShouldScaleCorrectly()
		{
			Assert.AreEqual(1, StarRatingCalculator.GetRating(10, 80));
			Assert.AreEqual(1, StarRatingCalculator.GetRating(10, 20));
			Assert.AreEqual(2, StarRatingCalculator.GetRating(11, 20));
			Assert.AreEqual(2, StarRatingCalculator.GetRating(10, 10));
			Assert.AreEqual(3, StarRatingCalculator.GetRating(11, 10));
			Assert.AreEqual(3, StarRatingCalculator.GetRating(20, 10));
			Assert.AreEqual(4, StarRatingCalculator.GetRating(25, 10));
			Assert.AreEqual(4, StarRatingCalculator.GetRating(50, 10));
			Assert.AreEqual(5, StarRatingCalculator.GetRating(60, 10));
		}
	}
}
