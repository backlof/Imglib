declare type ScriptInvokeFunction = "AddedFolder";

var addedFolder = (param: any) => {
	$(document).trigger("AddedFolder", param);
};