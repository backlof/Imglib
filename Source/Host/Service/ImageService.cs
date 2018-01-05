using Imglib.Repository;
using System;

namespace Imglib.Host.Service
{
	public class ImageService
	{
		private readonly IRepository _repository;

		public ImageService(IRepository repository)
		{
			_repository = repository;
		}

		public void AddImages()
		{
			throw new NotImplementedException();
		}
	}
}
