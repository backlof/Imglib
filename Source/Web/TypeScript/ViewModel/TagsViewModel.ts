/// <reference path="ViewModelBase.ts" />

module ViewModel {

	export interface ITagsViewModelParams {

	}

	export class TagsViewModel extends ViewModelBase {
		constructor(params: ITagsViewModelParams) {
			super();
		}

		public onDisposal(): void {
		}
	}
}