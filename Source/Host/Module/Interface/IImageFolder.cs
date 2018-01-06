namespace Imglib.Host.Module
{
	public interface IImageFolder
	{
		string DirectoryPath { get; }
		string ImagePath(string filename);
	}
}
