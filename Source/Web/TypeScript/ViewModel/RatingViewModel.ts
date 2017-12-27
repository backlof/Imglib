/// <reference path="ViewModelBase.ts" />

module ViewModel {

	export interface IRatingViewModelParams {

	}

	export class RatingViewModel extends ViewModelBase {

		constructor(params: IRatingViewModelParams, private _imageService: Api.IImageService) {
			super();
		}
	}
}