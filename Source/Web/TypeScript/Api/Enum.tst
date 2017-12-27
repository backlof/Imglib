${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("Api");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace(".cs", ".ts");
		};
	}
}namespace Api {$Enums(x => x.Namespace == "ImglibApi.Controller.Model")[

	export enum $Name {$Values[
		$Name = $Value][,]
	}
]}