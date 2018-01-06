﻿using Imglib.Host.Controller.Model;
using System;
using System.Web.Http;

namespace Imglib.Host.Controller
{
	public class TestController : ApiController
	{
		public TestController() { }

		public IVoidResult Exception(EmptyParameter value)
		{
			throw new Exception();
		}

		public IVoidResult Fail(TestParamneter input)
		{
			return Result.Fail(ErrorCode.NotFound);
		}

		public IVoidResult Success(TestParamneter input)
		{
			return Result.Success();
		}

		public IGenericResult<TestData> Stuff(TestParamneter intp)
		{
			throw new System.Exception();
		}

		public IGenericResult<TestData> Getter(EmptyParameter empty)
		{
			throw new System.Exception();
		}
	}
}
