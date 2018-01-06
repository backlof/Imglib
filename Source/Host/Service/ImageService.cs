using Imglib.Repository;
using Imglib.Repository.Table;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;

namespace Imglib.Host.Service
{
	public class ImageService
	{
		private readonly IRepository _repository;

		public ImageService(IRepository repository)
		{
			_repository = repository;
		}

		public void AddImages(string[] files)
		{
			if (files == null)
			{
				throw new ArgumentNullException("files");
			}
			if (!files.Any())
			{
				throw new ArgumentException("files");
			}
			if (files.Any(path => !File.Exists(path)))
			{
				throw new ArgumentException("files");
			}

			var dirPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
			if (!Directory.Exists(dirPath))
			{
				Directory.CreateDirectory(dirPath);
			}

			using (MD5 md5 = MD5.Create())
			{
				_repository.Images.Insert(files.Select(file =>
				{
					using (var fileStream = File.OpenRead(file))
					{
						var fileName = Path.GetFileName(file);
						File.Copy(file, Path.Combine(dirPath, fileName));
						return new Image
						{
							FileName = fileName,
							Added = DateTime.Now,
							Checksum = md5.ComputeHash(fileStream)
						};
					}
				}));
			}
		}
	}
}
