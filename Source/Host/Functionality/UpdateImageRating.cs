using Imglib.Host.Module;
using Imglib.Repository;
using Imglib.Repository.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Functionality
{
	public class UpdateImageRating
	{
		private readonly IRepository _repository;
		private readonly IRatingCalculator _rating;
		private readonly ISortCalculator _sort;

		public UpdateImageRating(IRepository repository, IRatingCalculator rating, ISortCalculator sort)
		{
			_repository = repository;
			_rating = rating;
			_sort = sort;
		}

		public void UpdateRating(int winnerId, int loserId)
		{
			var ids = new[] { winnerId, loserId };

			var winner = _repository.Images.Untracked
				.Where(x => x.Id == winnerId)
				.Select(x => new { Image = x, Wins = x.Wins.Count, Losses = x.Losses.Count })
				.Single();

			var loser = _repository.Images.Untracked
				.Where(x => x.Id == loserId)
				.Select(x => new { Image = x, Wins = x.Wins.Count, Losses = x.Losses.Count })
				.Single();

			winner.Image.Rating = _rating.GetRating(winner.Wins + 1, winner.Losses);
			winner.Image.Sort = _sort.GetSortValue(winner.Wins + 1, winner.Losses);

			loser.Image.Rating = _rating.GetRating(winner.Wins, winner.Losses + 1);
			loser.Image.Sort = _sort.GetSortValue(winner.Wins, winner.Losses + 1);

			_repository.Ratings.Insert(new Rating
			{
				Added = DateTime.Now,
				WinnerId = winner.Image.Id,
				LoserId = loser.Image.Id
			});

			_repository.Images.Update(new[] { winner.Image, loser.Image });
		}
	}
}
