using Imglib.Repository.Table;
using Imglib.Repository.Wrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Repository
{
	public interface IRepository
	{
		ITableWrapper<Image> Images { get; }
		ITableWrapper<Rating> Ratings { get; }
	}
}
