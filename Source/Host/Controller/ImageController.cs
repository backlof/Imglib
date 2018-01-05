using System.Web.Http;
using Imglib.Host.Controller.Model;
using Imglib.Repository;

namespace Imglib.Host.Controller
{
	//REMEMBER void type leads to 404
	//REMEMBER Argument needs to be an object instead of a primary value (fails)

	public class ImageController : ApiController
	{
		private readonly IRepository _repository;

		public ImageController(IRepository repository)
		{
			_repository = repository;
		}
	}
}
