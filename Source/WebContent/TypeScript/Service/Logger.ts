/// <reference path="../Utility/Date.ts" />

module Service {

	export interface ILogger {
		log(value: string): void;
	}

	export class FooterBarLogger implements ILogger {

		get FooterTimeStamp(): HTMLDivElement {
			return document.getElementById("footer-timestamp") as HTMLDivElement;
		}

		get FooterStatus(): HTMLDivElement {
			return document.getElementById("footer-status") as HTMLDivElement;
		}

		constructor() {

		}

		log(value: string): void {
			this.FooterTimeStamp.innerHTML = formatDate(Date.Now);
			this.FooterStatus.innerHTML = value;
		}
	}
}