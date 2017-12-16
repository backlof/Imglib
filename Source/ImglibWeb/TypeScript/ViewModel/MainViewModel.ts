/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	// Class shouldn't appear among component configurations, as it doesn't have an html template

	export class MainViewModel extends ViewModelBase {

		private subpage = ko.observable<KnockoutComponent>();

		constructor(private _logger: Service.ILogger) {
			super();

			this.subpage(Bundle.getComponent(Bundle.Component.Test, {}))
			this._logger.log("Testing the logging system");

			setTimeout(() => {
				this._logger.log("2000 ms have passed");
			}, 2000);
		}

		public navigateToRatedImages(rating: number) {
			//console.log("test");
			//this.subpage(null);
			//console.log(null);
			this.subpage(Bundle.getComponent(Bundle.Component.Rating, { rating: rating }));
		}

		public navigateToTest() {
			this.subpage(Bundle.getComponent(Bundle.Component.Test, {}))
		}
	}
}