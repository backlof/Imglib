using System.Web.Http;
using ImglibApi.Repository;
using ImglibApi.Controller.Model;

namespace ImglibApi.Controller
{
	// Put all DTO models in a single file so TypeWriter puts them in a single file

	public class Wrapper<T>
	{
		public T Value { get; set; }
	}

	public class ImageController : ApiController
	{
		private readonly ImglibRepository _repository;

		public ImageController(ImglibRepository repository)
		{
			_repository = repository;
		}

		public Picture GivePictureBack(Picture picture)
		{
			return picture;
		}

		public void TestStuff(int value)
		{
			throw new System.Exception();
		}
	}
}
