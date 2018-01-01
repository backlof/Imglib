﻿using ImglibRepository.Context;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImglibRepository.Repository
{
	public class LocalSqlLiteRepository : SqlLiteRepository
	{
		public LocalSqlLiteRepository() : base(new SqlLiteContext(Directory.GetCurrentDirectory(), "Data.db")) { }
	}
}
