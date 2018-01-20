/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

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