using Imglib.Host.Controller.Model;
using System;
using System.Web.Http;

namespace Imglib.Host.Controller
{
	public class TestController : ApiController
	{
		public TestController() { }

		public IResult Exception(EmptyParameter value)
		{
			throw new Exception();
		}

		public IResult Fail(TestParamneter input)
		{
			return Result.Fail(ErrorCode.NotFound);
		}

		public IResult Success(TestParamneter input)
		{
			return Result.Success();
		}

		public IResultWithValue<TestData> Stuff(TestParamneter intp)
		{
			throw new System.Exception();
		}

		public IResultWithValue<TestData> Getter(EmptyParameter empty)
		{
			throw new System.Exception();
		}
	}
}
