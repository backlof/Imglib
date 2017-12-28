/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	// Class shouldn't appear among component configurations, as it doesn't have an html template

	export class MainViewModel extends ViewModelBase {

		private subpage = ko.observable<KnockoutComponent>();

		constructor(private _logger: Service.ILogger, private _browserHandler: Service.IBrowserHandler) {
			super();

			this.openTest();
			this._logger.log("Testing the logging system");

			setTimeout(() => {
				this._logger.log("2000 ms have passed");
			}, 2000);
		}

		public openRating() {
			this.subpage(Bundle.getComponent(Bundle.Component.Rating, {}));
		}

		public openRated(rating: number) {
			this.subpage(Bundle.getComponent(Bundle.Component.Rated, { rating: rating }));
		}

		public openTest() {
			this.subpage(Bundle.getComponent(Bundle.Component.Test, {}));
		}

		public openTags() {
			this.subpage(Bundle.getComponent(Bundle.Component.Tags, {}));
		}

		public openTag(tag: string) {
			this.subpage(Bundle.getComponent(Bundle.Component.Tag, { tag: tag }));
		}

		public openAbout() {
			this._browserHandler.external.openAboutPage();
		}

		public addFiles() {
			if (this._browserHandler.hasBrowserSupport) {
				const binding = this._browserHandler.on(Browser.InvokeFunction.AddedFolder, (jq, param) => {
					this._logger.log(`${param}`);
					this._browserHandler.off(binding);
				});
				this._browserHandler.external.addFiles();
			}
		}
	}
}