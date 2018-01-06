/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface IRatedViewModelParams {
		rating?: number;
	}

	export class RatedViewModel extends ViewModelBase {

		private header = ko.observable<string>();

		private images = ko.observableArray();
		private skip = 0;
		private take = 20;

		constructor(param: IRatedViewModelParams, private _imageService: Api.IImageService) {
			super();

			//TODO Create a scroll handler

			this._imageService.findImagesByRating({ rating: param.rating, skip: this.skip, take: this.take }).done((value) => {
				this.images(value.images.map(image => {
					return {
						path: `Images/${image.fileName}`
					};
				}));
			}).fail(() => {

			}).always(() => {

			});

			this.header(`${param.rating} stars`);
		}

		public onDisposal(): void {
		}
	}
}