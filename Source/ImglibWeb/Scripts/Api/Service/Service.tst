${
	using Typewriter.Extensions.WebApi;
	
	Template(Settings settings)
	{
		settings.IncludeProject("ImglibApi");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace("Controller.cs", "Service.ts");
		};
	}

	string methodName(Method method){
		return method.Name.ToLower();
	}

	string controllerpage(Class cls){
		return cls.Name.Replace("Controller", "").ToLower();
	}

	string ClassName(Class cls){
		return cls.Name.Replace("Controller", "Service");
	}

	string ReturnType(Method method){
		return  method.Type.Name;
	}

	string FirstParameterName(Method method){
		return method.Parameters.First().Name;
	}

	string FirstParameterType(Method method){
		return method.Parameters.First().Type.Name;
	}
}
import { injectable, inject } from "inversify";
import { $ } from "../jquery-3.2.1.min.js";
import stuff = require("./../jquery-3.2.1.min.js");

namespace Api {$Classes(:ApiController)[
	
	interface I$ClassName {$Methods[
		$name($FirstParameterName: $FirstParameterType) : JQueryDeferred<$ReturnType>;]
	}

	@injectable("IRcpService")
	class $ClassName implements I$ClassName {

		constructor(private _rcpService: IRcpService) { 
		}
		$Methods[
		public $name($FirstParameterName: $FirstParameterType) {
			return this._rcpService.post<$FirstParameterType, $ReturnType>($FirstParameterName, $Parent["$controllerpage"], "$methodName");
		}
	]}
]}