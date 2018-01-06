using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using Imglib.Repository.Table;
using Imglib.Repository;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;

namespace Imglib.Repository.Test
{
	[TestClass]
	public class TableWrapperTests
	{
		[TestMethod]
		public void ShouldBeAbleToCountWinsAndLosses()
		{
			using (var repository = new DisposableSqlLiteRepository())
			{
				repository.Images.Insert(MakeImages(2).ToArray());

				repository.Ratings.Insert(new Rating
				{
					WinnerId = 1,
					LoserId = 2,
					Added = DateTime.Now
				});

				var images = repository.Images.Untracked.Select(image => new
				{
					image.Id,
					WinCount = image.Wins.Count(),
					LossCount = image.Losses.Count()

				}).ToList();

				Assert.AreEqual(1, images.First(image => image.Id == 1).WinCount);
				Assert.AreEqual(0, images.First(image => image.Id == 1).LossCount);
				Assert.AreEqual(0, images.First(image => image.Id == 2).WinCount);
				Assert.AreEqual(1, images.First(image => image.Id == 2).LossCount);
			}
		}

		[TestMethod]
		public void ShouldBeAbleToUpdate()
		{
			using (var repository = new DisposableSqlLiteRepository())
			{
				// Should be able to update one item

				var date = DateTime.Now;

				repository.Images.Insert(MakeImages(1, date).ToArray());

				repository.Images.Update(repository.Images.Untracked.ToList().Select(x => { x.Added = x.Added.AddDays(1); return x; }).First());

				Assert.IsTrue(repository.Images.Untracked.All(x => x.Added > date));
			}

			using (var repository = new DisposableSqlLiteRepository())
			{
				// Should be able to update where criteria matches

				var date = DateTime.Now;

				repository.Images.Insert(MakeImages(20, date).ToArray());

				repository.Images.Update(image =>
				{
					image.Added = image.Added.AddDays(1);

				}, image => image.Id == 1);

				Assert.AreEqual(1, repository.Images.Untracked.Count(x => x.Added > date));
			}

			using (var repository = new DisposableSqlLiteRepository())
			{
				// Should be able to update multiple items

				var date = DateTime.Now;

				repository.Images.Insert(MakeImages(20, date).ToArray());

				repository.Images.Update(repository.Images.Untracked.ToList().Select(image =>
				{
					image.Added = image.Added.AddDays(1);
					return image;

				}).ToArray());

				Assert.AreEqual(20, repository.Images.Untracked.Count(x => x.Added > date));
			}
		}

		[TestMethod]
		public void ShouldAutomaticallyDeleteRequiredRelationships()
		{
			using (var repository = new DisposableSqlLiteRepository())
			{
				repository.Images.Insert(MakeImages(2).ToArray());

				repository.Ratings.Insert(new Rating
				{
					Added = DateTime.Now,
					LoserId = 1,
					WinnerId = 2
				});

				repository.Images.Remove(x => x.Id == 1);

				Assert.IsFalse(repository.Ratings.Untracked.Any());
			}
		}

		[TestMethod]
		public void ShouldBeAbleToRemove()
		{
			using (var repository = new DisposableSqlLiteRepository())
			{
				// Should be able to remove by criteria

				repository.Images.Insert(MakeImages(20).ToArray());

				repository.Images.Remove(x => x.Id > 10);

				Assert.AreEqual(10, repository.Images.Untracked.Count());
			}

			using (var repository = new DisposableSqlLiteRepository())
			{
				// Should be able to remove multiple items

				repository.Images.Insert(MakeImages(5).ToArray());

				repository.Images.Remove(repository.Images.Untracked.ToArray());

				Assert.IsFalse(repository.Images.Untracked.Any());
			}

			using (var repository = new DisposableSqlLiteRepository())
			{
				// Should be able to remove one item

				repository.Images.Insert(MakeImages(1).ToArray());

				repository.Images.Remove(repository.Images.Untracked.First());

				Assert.IsFalse(repository.Images.Untracked.Any());
			}
		}

		public IEnumerable<Image> MakeImages(int count, DateTime? date = null)
		{
			using (MD5 md5 = MD5.Create())
			{
				for (int i = 0; i < count; i++)
				{
					var padded = i.ToString().PadLeft(20, '0');

					yield return new Image
					{
						FileName = $"{padded}.jpg",
						Checksum = md5.ComputeHash(Encoding.UTF8.GetBytes(padded)),
						Added = date ?? DateTime.Now
					};
				}
			}
		}
	}
}