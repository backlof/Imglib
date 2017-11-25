${
	using Typewriter.Extensions.WebApi;
	using Typewriter.Extensions.Types;
	
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

	IEnumerable<Type> DefinedTypes(Class c)
	{
		return c.Methods.Where(m => m.Type.Unwrap().IsDefined).Select(m => m.Type.Unwrap());
	}
}module Api {$Classes(:ApiController)[
	
	export interface I$ClassName {$Methods[
		$name($FirstParameterName: $FirstParameterType) : JQueryDeferred<$ReturnType>;]
	}

	export class $ClassName implements I$ClassName {

		constructor(private _rcpService: Service.IDeferredRcpClient) { 
		}
		$Methods[
		public $name($FirstParameterName: $FirstParameterType) {
			return this._rcpService.post<$FirstParameterType, $ReturnType>($FirstParameterName, $Parent["$controllerpage"], "$methodName");
		}
	]}
]}