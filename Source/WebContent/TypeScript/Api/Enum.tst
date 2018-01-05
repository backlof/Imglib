${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("Host");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace(".cs", ".ts");
		};
	}
}namespace Api {$Enums(x => x.Namespace == "Imglib.Host.Controller.Model")[

	export enum $Name {$Values[
		$Name = $Value][,]
	}
]}