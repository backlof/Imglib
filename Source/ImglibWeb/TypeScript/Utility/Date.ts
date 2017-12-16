interface DateConstructor {
	readonly Now: Date;
}

Object.defineProperty(Date, "Now", {
	get: () => {
		return new Date();
	}
});

var formatDate = (value: Date) => {
	return `${value.getFullYear()}-${String.padLeft(value.getMonth() + 1, 2)}-${String.padLeft(value.getDate(), 2)} ${String.padLeft(value.getHours(), 2)}:${String.padLeft(value.getMinutes(), 2)}:${String.padLeft(value.getSeconds(), 2)}`;
};