/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface IRatedViewModelParams {
		rating: number;
	}

	export class RatedViewModel extends ViewModelBase {

		private header = ko.observable<string>();

		constructor(param: IRatedViewModelParams, private _imageService: Api.IImageService) {
			super();

			this.header(`${param.rating} stars`);
		}

		public onDisposal(): void {
		}
	}
}