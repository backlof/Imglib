/// <reference path="ViewModelBase.ts" />

module ViewModel {

	export interface ITagViewModelParams {
		tag: string;
	}

	export class TagViewModel extends ViewModelBase {

		private header: string;

		constructor(params: ITagViewModelParams) {
			super();

			this.header = params.tag;
		}

		public onDisposal(): void {
		}
	}
}