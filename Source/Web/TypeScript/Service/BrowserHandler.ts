module Service {

	declare type JQueryEventHandler<T> = (eventObject: JQueryEventObject, param: T) => void;

	export interface ScriptInvokeObject<T> {
		event: Browser.ScriptInvokeConfiguration<T>;
		handler: JQueryEventHandler<T>;
	}

	export interface IBrowserHandler {
		readonly hasBrowserSupport: boolean;
		on<T>(event: Browser.ScriptInvokeConfiguration<T>, handler: JQueryEventHandler<T>): ScriptInvokeObject<T>;
		off<T>(obj: ScriptInvokeObject<T>): void;
		readonly external: Browser.IBrowserExternalHandler;
	}

	export class BrowserHandler implements IBrowserHandler {

		constructor(private _external: Browser.IBrowserExternalHandler) { }

		get hasBrowserSupport(): boolean {
			return this._external.hasBrowserSupport;
		}

		public on<T>(event: Browser.ScriptInvokeConfiguration<T>, handler: JQueryEventHandler<T>): ScriptInvokeObject<T> {
			$(document).on(event.name, handler);
			return {
				event: event,
				handler: handler
			};
		}

		public off<T>(obj: ScriptInvokeObject<T>): void {
			$(document).off(obj.event.name, obj.handler);
		}

		get external(): Browser.IBrowserExternalHandler {
			return this._external;
		}
	}
}