using System;
using System.Linq;
using System.Web.Http;
using Imglib.Host.Controller.Model;
using Imglib.Host.Functionality;
using Imglib.Host.Module;
using Imglib.Repository;

namespace Imglib.Host.Controller
{
	//REMEMBER void type leads to 404
	//REMEMBER Argument needs to be an object instead of a primary value (fails)
	//REMEMBER Method names can't start with Get, Put, Post etc

	public class ImageController : ApiController
	{
		private readonly IRepository _repository;
		private readonly IRatingCalculator _rating;
		private readonly ISortCalculator _sort;
		private readonly IImageFolder _folder;

		public ImageController(IRepository repository, IRatingCalculator rating, ISortCalculator sort, IImageFolder folder)
		{
			_repository = repository;
			_rating = rating;
			_sort = sort;
			_folder = folder;
		}

		public IGenericResult<ImageByRate> FindImagesByRating(ImageRatingQuery query)
		{
			var images = _repository.Images.Untracked
				.Where(x => x.Rating == query.Rating)
				.Select(x => new
				{
					x.Id,
					x.FileName,
					WinCount = x.Wins.Count,
					LossCount = x.Losses.Count
				})
				.ToList()
				.Select(x => new ImageInList
				{
					FileName = x.FileName
				})
				.ToArray();

			return Result.Value(new ImageByRate
			{
				Images = images
			});
		}

		public IVoidResult RateImages(ImageRatingResult ratings)
		{
			new UpdateImageRating(_repository, _rating, _sort).UpdateRating(ratings.WinnerId, ratings.LoserId);
			return Result.Success();
		}

		public IGenericResult<ImageSet> GetImageSet(EmptyParameter parameter)
		{
			var images = _repository.Images.Untracked
				.OrderBy(x => Guid.NewGuid())
				.Select(x => new
				{
					x.Id,
					x.FileName
				})
				.Take(2)
				.ToList();

			if (images.Count != 2)
			{
				return Result.Value(new ImageSet { MissingImages = true });
			}
			else
			{
				var first = images[0];
				var second = images[1];


				return Result.Value(new ImageSet
				{
					First = new ImageFromSet { Id = first.Id, Path = _folder.ImagePath(first.FileName) },
					Second = new ImageFromSet { Id = second.Id, Path = _folder.ImagePath(second.FileName) }
				});
			}
		}
	}
}
