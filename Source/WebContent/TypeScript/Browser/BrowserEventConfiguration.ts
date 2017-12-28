var test = (param: string) => {
	$(document).trigger("Test", param);
};

var testish = () => {
	$(document).trigger("Testish");
};

namespace Browser {

	export class BrowserEventConfiguration<T> {
		constructor(public name: string) { }
	}

	export var Event = {
		Test: new BrowserEventConfiguration<string>("Test"),
		Testish: new BrowserEventConfiguration<void>("Testish")
	};
}