/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

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