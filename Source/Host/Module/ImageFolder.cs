using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Imglib.Host.Module
{
	public class ImageFolder : IImageFolder
	{
		private readonly string _dir;
		public string DirectoryPath => _dir;

		public ImageFolder()
		{
			_dir = Path.Combine(Directory.GetCurrentDirectory(), "Images");

			if (!Directory.Exists(DirectoryPath))
			{
				Directory.CreateDirectory(DirectoryPath);
			}
		}

		public string ImagePath(string filename)
		{
			return Path.Combine(DirectoryPath, filename);
		}
	}
}
