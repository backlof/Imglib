${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("Host");
		settings.OutputFilenameFactory = (file) => {
			return "Result.ts";
		};
	}
}namespace Api {$Classes(x => x.Namespace == "Imglib.Host.Controller" && x.Name == "ConcatResult")[

	export interface Result$TypeParameters {
		$Properties[$name: $Type;][
		]
	}
]}