${
    using Typewriter.Extensions.Types;

	 string Parameter(Method method)
	 {
		if (method.Type == "void")
		{
			return "";
		}
		else{
			return $"param: {method.Type.name}";
		}
	 }

	 string Stuff(Method method)
	 {
		if (method.Type == "void")
		{
			return "";
		}
		else{
			return ", param";
		}
	 }

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "BrowserEventConfiguration.ts";
		};
	 }

}$Interfaces(x => x.Name == "IScriptInvokeFunction")[$Methods[var $name = ($Parameter) => {
	$(document).trigger("$Name"$Stuff);
};][

]]

namespace Browser {

	export class BrowserEventConfiguration<T> {
		constructor(public name: string) { }
	}

	export var Event = {$Interfaces(x => x.Name == "IScriptInvokeFunction")[
		$Methods[$Name: new BrowserEventConfiguration<$Type>("$Name")][,
		]]
	};
}