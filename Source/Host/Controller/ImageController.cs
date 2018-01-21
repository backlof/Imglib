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

		public IVoidResult DeleteImage(ImageDelectionQuery query)
		{
			_repository.Images.Remove(x => x.Id == query.Id);
			return Result.Success();
		}

		public IGenericResult<ImageByRate> FindImagesByRating(ImageRatingQuery query)
		{
			var images = _repository.Images.Untracked
				.Where(x => x.Rating == query.Rating)
				.OrderByDescending(x => x.Sort)
				.Select(x => new
				{
					x.Id,
					x.FileName,
					WinCount = x.Wins.Count,
					LossCount = x.Losses.Count
				})
				.Skip(query.Skip)
				.Take(query.Take)
				.ToList()
				.Select(x => new ImageInList
				{
					Id = x.Id,
					FileName = x.FileName,
					Url = _folder.GetRelativeWebPath(x.FileName)
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

		public IGenericResult<ImageSet> FindImageSet(EmptyParameter parameter)
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
				return Result.Fail<ImageSet>(ErrorCode.NoImages);
			}
			else
			{
				var first = images[0];
				var second = images[1];

				return Result.Value(new ImageSet
				{
					First = new ImageFromSet { Id = first.Id, Path = _folder.GetRelativeWebPath(first.FileName) },
					Second = new ImageFromSet { Id = second.Id, Path = _folder.GetRelativeWebPath(second.FileName) }
				});
			}
		}
	}
}
