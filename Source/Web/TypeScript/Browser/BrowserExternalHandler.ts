interface External {
	AddFiles(): void;
	OpenAboutPage(): void;
}

namespace Browser {

	export interface IBrowserExternalHandler {
		readonly hasBrowserSupport: boolean;
		addFiles(): void;
		openAboutPage(): void;
	}

	export class BrowserExternalHandler implements IBrowserExternalHandler {

		get hasBrowserSupport(): boolean {
			return window.external.AddFiles != null && window.external.OpenAboutPage != null;
		}

		public addFiles() {
			window.external.AddFiles();
		}

		public openAboutPage() {
			window.external.OpenAboutPage();
		}
	}
}