namespace Imglib.Host.Module
{
	public interface IImageFolder
	{
		string DirectoryPath { get; }
		string GetFullPath(string filename);
		string GetRelativeWebPath(string filename);
	}
}
