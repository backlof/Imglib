enum StringContainsParameter {
	IgnoreCase,
	CaseSensitive
}

interface String {
	contains(p: string, type?: StringContainsParameter): boolean;
}

String.prototype.contains = (p, type?) => {
	const value: string = this.valueOf();
	switch (type) {
		case StringContainsParameter.IgnoreCase:
			return value.indexOf(p.toLowerCase()) !== -1;
		default:
			return value.indexOf(p) !== -1;
	}
};

interface StringConstructor {
	padLeft(value: string | number, length: number, character?: string): string;
}

String.padLeft = (value, length, type = "0") => {
	if (!type) throw new Error();
	if (type.length !== 1) throw new Error();
	if (value == null) throw new Error();
	let str = value + "";
	if (length < str.length) throw new Error();
	while (str.length < length) str = "0" + str;
	return str;
};