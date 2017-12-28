${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "ScriptInvokeFunction.ts";
		};
	 }

}$Interfaces(x => x.Name == "IScriptInvokeFunction")[declare type ScriptInvokeFunction = $Methods["$Name"][|];]

$Interfaces(x => x.Name == "IScriptInvokeFunction")[$Methods[var $name = (param: any) => {
	$(document).trigger("$Name", param);
};][
]]