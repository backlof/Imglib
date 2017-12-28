namespace ScriptInvoke {

	export class Configuration<T> {
		constructor(public name: string) { }
	}

}
var ScriptInvokeFunction = {
	AddedFolder: new ScriptInvoke.Configuration<boolean>("AddedFolder")
};

var addedFolder = (param: any) => {
	$(document).trigger("AddedFolder", param);
};