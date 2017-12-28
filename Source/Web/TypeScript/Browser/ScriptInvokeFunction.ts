var addedFolder = (param: any) => {
	$(document).trigger("AddedFolder", param);
};

namespace Browser {

	export class ScriptInvokeConfiguration<T> {
		constructor(public name: string) { }
	}

	export var InvokeFunction = {
		AddedFolder: new ScriptInvokeConfiguration<boolean>("AddedFolder")
	};
}