/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	//REMEMBER Class shouldn't appear among component configurations, as it doesn't have an html template

	export class MainViewModel extends ViewModelBase {

		private subpage = ko.observable<KnockoutComponent>();

		constructor(private _logger: Service.ILogger, private _browserHandler: Browser.IBrowserInvoker) {
			super();

			this.onBrowserEvent(Browser.Event.Testish, (sda) => {
				alert(sda);
			});

			this.onBrowserEvent(Browser.Event.Test, (value) => {
				alert(value);
			});

			this.openTest();
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
			const url = "https://github.com/backlof/Imglib";
			if (this._browserHandler.isSupported) {
				this._browserHandler.openWebPageInBrowser(url);
			}
			else {
				window.open(url, '_blank');
			}
		}

		public addFiles() {
			if (this._browserHandler.isSupported) {
				this._browserHandler.addFiles();
				//TODO Refresh page
			}
			else {
				console.error("Browser invocation isn't supported");
			}
		}

		public onDisposal(): void {

		}
	}
}