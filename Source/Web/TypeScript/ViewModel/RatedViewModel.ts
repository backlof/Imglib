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

			this._imageService.givePictureBack({ id: 10, myProperty: new Date(), name: "the name" }).done(() => {
				console.log("done");
			}).fail(() => {
				console.log("fail");
			}).always(() => {
				console.log("always");
			});
		}

		public onDisposal(): void {
		}
	}
}