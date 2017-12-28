${
    using Typewriter.Extensions.Types;

	 Template(Settings settings)
	 {
		settings.IncludeProject("Imglib");
		settings.OutputFilenameFactory = (file) => {
			return "BrowserInvoker.ts";
		};
	 }

	string Execution(Method method){
		if (method.Type == "void")
		{
			return $"(window.external as any).{method.Name}";
		}
		else
		{
			return $"return (window.external as any).{method.Name}";
		}
	 }

}namespace Browser {

	export interface IBrowserInvoker {
		readonly isSupported: boolean;
		$Interfaces(x => x.Name == "IWindowExternalObject")[$Methods[$name($Parameters[$name: $Type][,]): $Type;][
		]]
	}

	export class BrowserInvoker implements IBrowserInvoker {

		get isSupported(): boolean {
			return $Interfaces(x => x.Name == "IWindowExternalObject")[$Methods["$Name" in window.external][ && ]];
		}

		$Interfaces(x => x.Name == "IWindowExternalObject")[$Methods[public $name($Parameters[$name: $Type][, ]): $Type {
			$Execution($Parameters[$name][, ]);
		}][

		]]
	}
}