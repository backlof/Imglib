﻿${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("ImglibApi");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace(".cs", ".ts");
		};
	}
}
namespace Api {$Classes(x => x.Namespace == "ImglibApi.Controller.Model")[

	export interface $Name {$Properties[
		$name: $Type;]
	}
]}