${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "ScriptInvokeFunction.ts";
		};
	 }

}namespace ScriptInvoke {

	export class Configuration<T> {
		constructor(public name: string) { }
	}

}
var ScriptInvokeFunction = {$Interfaces(x => x.Name == "IScriptInvokeFunction")[
	$Methods[$Name: new ScriptInvoke.Configuration<$Parameters[$Type]>("$Name")][,
]]
};

$Interfaces(x => x.Name == "IScriptInvokeFunction")[$Methods[var $name = (param: any) => {
	$(document).trigger("$Name", param);
};][
]]