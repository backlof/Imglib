${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("ImglibApi");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace(".cs", ".ts");
		};
	}

	IEnumerable<Type> DefinedTypes(Class c)
	{
		return c.Methods.Where(m => m.Type.Unwrap().IsDefined).Select(m => m.Type.Unwrap());
	}
}module Api {$Classes(x => x.Namespace == "ImglibApi.Controller.Model")[

	export interface $Name {$Properties[
		$name: $Type;]
	}
]}