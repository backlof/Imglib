${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "ScriptInvokeFunction.ts";
		};
	 }

}$Interfaces(x => x.Name == "IScriptInvokeFunction")[$Methods[var $name = (param: any) => {
	$(document).trigger("$Name", param);
};][
]]

namespace Browser {

	export class ScriptInvokeConfiguration<T> {
		constructor(public name: string) { }
	}

	export var InvokeFunction = {$Interfaces(x => x.Name == "IScriptInvokeFunction")[
		$Methods[$Name: new ScriptInvokeConfiguration<$Parameters[$Type]>("$Name")][,
	]]
	};
}