/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	// Class shouldn't appear among template configurations, as it doesn't have an html

	export class MainViewModel extends ViewModelBase {
		private helloWorld = ko.observable("Hello world!");
		public test = ko.observable("testing");

		private subpage = ko.observable<KnockoutTemplate<any>>();

		constructor(private _templateResolver: Bundle.ITemplateResolver) {
			super();
		}

		public navigateToRatedImages(rating: number) {
			const subpage = this._templateResolver.getTemplate(Bundle.Template.Rating, { rating: rating });
			this.subpage(subpage);
		}
	}
}