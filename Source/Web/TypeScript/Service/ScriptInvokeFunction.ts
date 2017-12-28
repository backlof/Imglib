namespace Invoke {
	export class ScriptInvokeFunction<T> {
		constructor(public name: string) { }
	}

	class ScriptInvokeFunctions {
		public AddedFolder = new ScriptInvokeFunction<boolean>("AddedFolder");
	}

	export var Function = new ScriptInvokeFunctions();
}

var addedFolder = (param: any) => {
	$(document).trigger("AddedFolder", param);
};