${
	using Typewriter.Extensions.Types;

	Template(Settings settings)
	{
		settings.IncludeProject("Host");
		settings.OutputFilenameFactory = (file) => {
			return file.Name.Replace(".cs", ".ts");
		};
	}

	IEnumerable<Type> DefinedTypes(Class c)
	{
		return c.Methods.Where(m => m.Type.Unwrap().IsDefined).Select(m => m.Type.Unwrap());
	}
}namespace Api {$Classes(x => x.Namespace == "Imglib.Host.Controller.Model")[

	export interface $Name$TypeParameters {$Properties[
		$name: $Type;]
	}
]}