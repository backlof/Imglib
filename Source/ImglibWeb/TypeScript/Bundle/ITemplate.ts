module Bundle {
	export interface ITemplate<TViewModel> {
		name: string;
		data: TViewModel;
	}
}