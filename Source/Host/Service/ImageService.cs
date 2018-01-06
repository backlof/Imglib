using Imglib.Host.Module;
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
		private readonly IImageFolder _folder;

		public ImageService(IRepository repository, IImageFolder folder)
		{
			_repository = repository;
			_folder = folder;
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

			using (MD5 md5 = MD5.Create())
			{
				_repository.Images.Insert(files.Select(file =>
				{
					using (var fileStream = File.OpenRead(file))
					{
						var fileName = $"{Guid.NewGuid().ToString()}{Path.GetExtension(file)}";
						File.Copy(file, Path.Combine(_folder.DirectoryPath, fileName));
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
