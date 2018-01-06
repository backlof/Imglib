using Imglib.Host.Functionality;
using Imglib.Host.Module;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Test.Module
{
	[TestClass]
	public class SortCalculatorTests
	{
		public SortCalculator OrderRate => new SortCalculator();

		[TestMethod]
		public void ShouldRatePositiveDifferenceCorrectly()
		{
			Assert.IsTrue(OrderRate.GetSortValue(2, 0) > OrderRate.GetSortValue(1, 0));
			Assert.IsTrue(OrderRate.GetSortValue(2, 1) > OrderRate.GetSortValue(1, 1));
		}

		[TestMethod]
		public void ShouldRateFractionsCorrectly()
		{
			Assert.IsTrue(OrderRate.GetSortValue(2, 10) > OrderRate.GetSortValue(1, 10));
			Assert.IsTrue(OrderRate.GetSortValue(2, 10) > OrderRate.GetSortValue(2, 100));
		}
	}
}
