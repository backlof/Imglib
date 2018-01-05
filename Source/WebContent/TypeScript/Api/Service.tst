${
	using Typewriter.Extensions.WebApi;
	using Typewriter.Extensions.Types;
	
	Template(Settings settings)
	{
		settings.IncludeProject("Host");
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
	
	string ResultType(Method method)
	{
		return method.Type.Unwrap().Name;
	}

	bool AcceptableType(Type t)
	{
		return t.Name != "EmptyParameter" && !t.IsPrimitive && !t.IsEnum && !t.IsNullable && !t.IsEnumerable && !t.IsDate && !t.IsTask && !t.IsTimeSpan && !t.IsGuid && !t.IsValueTuple;
	}

	IEnumerable<Method> AcceptableMethods(Class c)
	{
		return c.Methods.Where(x => x.Type.Name != "void" && x.Parameters.Count == 1 && AcceptableType(x.Parameters[0].Type));
	}

	IEnumerable<Method> ValueMethods(Class c)
	{
		return AcceptableMethods(c).Where(x => x.Type.Name.StartsWith("IResultWithValue<"));
	}

	IEnumerable<Method> VoidMethods(Class c)
	{
		return AcceptableMethods(c).Where(x => x.Type.Name == "IResult");
	}

	IEnumerable<Method> GetMethods(Class c)
	{
		return c.Methods.Where(x => x.Type.Name.StartsWith("IResultWithValue<") && x.Parameters.Count == 1 && x.Parameters[0].Type.Name == "EmptyParameter");
	}

}namespace Api {$Classes(:ApiController)[

	export interface I$ClassName {
		$VoidMethods[$name($FirstParameterName: $FirstParameterType): Api.VoidDeferred;][
		]
		$ValueMethods[$name($FirstParameterName: $FirstParameterType): Api.GenericDeferred<$ResultType>;][
		]
		$GetMethods[$name(): Api.GenericDeferred<$ResultType>;][
		]
	}

	export class $ClassName implements I$ClassName {

		constructor(private _rcpService: Service.IDeferredRcpClient) {	}$VoidMethods[

		public $name($FirstParameterName: $FirstParameterType){
			return this._rcpService.put<$FirstParameterType>($FirstParameterName,  $Parent["$controllerpage"], "$methodName");
		}][]$ValueMethods[

		public $name($FirstParameterName: $FirstParameterType) {
			return this._rcpService.post<$FirstParameterType, $ResultType>($FirstParameterName, $Parent["$controllerpage"], "$methodName");
		}][]$GetMethods[

		public $name() {
			return this._rcpService.get<$ResultType>($Parent["$controllerpage"], "$methodName");
		}][]
	}
]}