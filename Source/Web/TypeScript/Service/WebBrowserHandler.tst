${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "WebBrowserHandler.ts";
		};
	 }

}$Interfaces(x => x.Name == "IWindowExternalObject")[interface External {$Methods[
	$Name($Parameters[$name: $Type][, ]): void;
]]}

module Service {
	declare type JQueryEventHandler<T> = (eventObject: JQueryEventObject, param: T) => void;

	export interface ListenerObject<T> {
		event: ScriptInvoke.Configuration<T>;
		handler: JQueryEventHandler<T>;
	}

	export interface IWebBrowserHandler {
		unbind<T>(boundObj: ListenerObject<T>): void;
		bind<T>(event: ScriptInvoke.Configuration<T>, handler: JQueryEventHandler<T>): ListenerObject<T>;$Interfaces(x => x.Name == "IWindowExternalObject")[
		$Methods[$name($Parameters[$name: $Type][;
		]): void;]]
	}

	export class WebBrowserHandler implements IWebBrowserHandler {
		
		unbind<T>(boundObj: ListenerObject<T>): void {
			$(document).off(boundObj.event.name, boundObj.handler);
		}

		bind<T>(event: ScriptInvoke.Configuration<T>, handler: JQueryEventHandler<T>): ListenerObject<T> {
			$(document).on(event.name, handler);
			return {
				event: event,
				handler: handler
			};
		}$Interfaces(x => x.Name == "IWindowExternalObject")[

		$Methods[$name($Parameters[$name: $Type][, ]) {
			if (window.external.$Name)
				window.external.$Name($Parameters[$name[, ]]);
			else
				console.error("$Name is not registered on window.external", window.external);
		}][
		]]
	}
}