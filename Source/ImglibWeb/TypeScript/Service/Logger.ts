module Service {

	export interface ILogger {
		log(value: string): void;
	}

	export class FooterBarLogger implements ILogger {

		get Footer(): HTMLElement {
			return document.getElementsByTagName("footer")[0] as HTMLElement;
		}

		constructor() {

		}

		log(value: string): void {
			this.Footer.innerHTML = value;
		}
	}
}