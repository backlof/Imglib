/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	// Class shouldn't appear among component configurations, as it doesn't have an html template

	export class MainViewModel extends ViewModelBase {

		private subpage = ko.observable<KnockoutComponent>();

		constructor() {
			super();
		}

		public navigateToRatedImages(rating: number) {
			this.subpage(Bundle.getComponent(Bundle.Component.Rating, { rating: rating }));
		}

		public navigateToTest() {
			this.subpage(Bundle.getComponent(Bundle.Component.Test, {}))
		}
	}
}