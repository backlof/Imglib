enum StringContainsParameter {
	IgnoreCase,
	CaseSensitive
}

interface String {
	contains(p: string, type?: StringContainsParameter): boolean;
}

String.prototype.contains = (p: string, type?: StringContainsParameter) => {
	const value: string = this.valueOf();
	switch (type) {
		case StringContainsParameter.IgnoreCase:
			return value.indexOf(p.toLowerCase()) !== -1;
		default:
			return value.indexOf(p) !== -1;
	}
};