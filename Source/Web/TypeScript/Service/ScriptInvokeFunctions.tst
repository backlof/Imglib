${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "ScriptInvokeFunction.ts";
		};
	 }

}namespace Invoke {
	export class ScriptInvokeFunction<T> {
		constructor(public name: string) { }
	}

	class ScriptInvokeFunctions {$Interfaces(x => x.Name == "IScriptInvokeFunction")[
		$Methods[public $Name = new ScriptInvokeFunction<$Parameters[$Type]>("$Name");][
	]]
	}

	export var Function = new ScriptInvokeFunctions();
}

$Interfaces(x => x.Name == "IScriptInvokeFunction")[$Methods[var $name = (param: any) => {
	$(document).trigger("$Name", param);
};][
]]