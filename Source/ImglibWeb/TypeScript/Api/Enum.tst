${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("ImglibApi");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace(".cs", ".ts");
		};
	}
}
module Api {$Enums(x => x.Namespace == "ImglibApi.Controller.Enum")[

	export enum $Name {$Values[
		$Name = $Value][,]
	}
]}