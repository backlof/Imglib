namespace Browser {

	export interface IBrowserInvoker {
		readonly isSupported: boolean;
		addFiles(): boolean;
		openWebPageInBrowser(url: string): void;
	}

	export class BrowserInvoker implements IBrowserInvoker {

		get isSupported(): boolean {
			return "AddFiles" in window.external && "OpenWebPageInBrowser" in window.external;
		}

		public addFiles(): boolean {
			return (window.external as any).AddFiles();
		}

		public openWebPageInBrowser(url: string): void {
			(window.external as any).OpenWebPageInBrowser(url);
		}
	}
}