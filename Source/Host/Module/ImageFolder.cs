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
		private static readonly string Folder = "Images";
		private readonly string _directoryPath;
		public string DirectoryPath => _directoryPath;

		public ImageFolder()
		{
			_directoryPath = Path.Combine(Directory.GetCurrentDirectory(), ImageFolder.Folder);

			if (!Directory.Exists(_directoryPath))
			{
				Directory.CreateDirectory(_directoryPath);
			}
		}


		public string GetFullPath(string filename)
		{
			return Path.Combine(_directoryPath, filename);
		}

		public string GetRelativeWebPath(string filename)
		{
			return $"{ImageFolder.Folder}/{filename}";
		}
	}
}
