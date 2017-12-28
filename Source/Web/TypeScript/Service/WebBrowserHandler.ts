interface External {
	AddFiles(): void;

	OpenAboutPage(): void;
}

module Service {
	declare type JQueryEventHandler<T> = (eventObject: JQueryEventObject, param: T) => void;

	export interface ListenerObject<T> {
		event: ScriptInvokeFunction;
		handler: JQueryEventHandler<T>;
	}

	export interface IWebBrowserHandler {
		unbind<T>(boundObj: ListenerObject<T>): void;
		bind<T>(event: ScriptInvokeFunction, handler: JQueryEventHandler<T>): ListenerObject<T>;
		addFiles(): void;openAboutPage(): void;
	}

	export class WebBrowserHandler implements IWebBrowserHandler {
		
		unbind<T>(boundObj: ListenerObject<T>): void {
			$(document).off(boundObj.event, boundObj.handler);
		}

		bind<T>(event: ScriptInvokeFunction, handler: JQueryEventHandler<T>): ListenerObject<T> {
			$(document).on(event as string, handler);
			return {
				event: event,
				handler: handler
			};
		}

		addFiles() {
			if (window.external.AddFiles)
				window.external.AddFiles();
			else
				console.error("AddFiles is not registered on window.external", window.external);
		}
		openAboutPage() {
			if (window.external.OpenAboutPage)
				window.external.OpenAboutPage();
			else
				console.error("OpenAboutPage is not registered on window.external", window.external);
		}
	}
}