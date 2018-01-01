using ImglibHost.Controller.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace ImglibHost.Controller
{
	public class TestController : ApiController
	{
		public TestController()
		{

		}

		public IResultWithValue<TestData> ValueCheck(TestInput input)
		{
			return Result.Value(new TestData { PersonData = $"{input.Name} ({input.Age})" });
		}

		public IResultWithValue<TestData> ExceptionMethod(TestInput input)
		{
			throw new Exception();
		}

		public IResultWithValue<TestData> FailMethod(TestInput input)
		{
			return Result.Fail<TestData>();
		}
	}
}
