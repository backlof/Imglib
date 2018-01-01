using ImglibRepository.Table;
using ImglibRepository.Wrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImglibRepository.Repository
{
	public interface IRepository
	{
		ITableWrapper<Image> Images { get; }
		ITableWrapper<Rating> Ratings { get; }
	}
}
