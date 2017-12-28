using System.Web.Http;
using ImglibHost.Repository;
using ImglibHost.Controller.Model;
using System;

namespace ImglibHost.Controller
{
	//REMEMBER Void type leads to 404
	//REMEMBER Argument needs to be an object instead of a primary value (fails)

	public class ImageController : ApiController
	{
		private readonly ImglibRepository _repository;

		public ImageController(ImglibRepository repository)
		{
			_repository = repository;
		}

		public IResultWithValue<Picture> GivePictureBack(Picture picture)
		{
			return Result.Value(picture);
		}
	}
}
