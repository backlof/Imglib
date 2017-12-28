${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "BrowserExternalHandler.ts";
		};
	 }

}$Interfaces(x => x.Name == "IWindowExternalObject")[interface External {
	$Methods[$Name($Parameters[$name: $Type][, ]): void;][
	]
]}

namespace Browser {

	export interface IBrowserExternalHandler {
		readonly hasBrowserSupport: boolean;
		$Interfaces(x => x.Name == "IWindowExternalObject")[$Methods[$name($Parameters[$name: $Type][;]): $Type;][
		]]
	}

	export class BrowserExternalHandler implements IBrowserExternalHandler {

		get hasBrowserSupport(): boolean {
			return $Interfaces(x => x.Name == "IWindowExternalObject")[$Methods[window.external.$Name != null][ && ]];
		}

		$Interfaces(x => x.Name == "IWindowExternalObject")[$Methods[public $name($Parameters[$name: $Type][, ]) {
			window.external.$Name($Parameters[$name[, ]]);
		}][

		]]
	}
}