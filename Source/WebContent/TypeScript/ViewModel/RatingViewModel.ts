/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface IRatingViewModelParams {

	}

	interface Image {
		url: string;
	}

	export class RatingViewModel extends ViewModelBase {

		private isLoading = ko.observable(false);
		private isSaving = ko.observable(false);
		private showSpinner = this.computed(() => { return this.isLoading() || this.isSaving(); });
		private notification = new NotificationTrigger();
		private first = ko.observable<Image>();
		private second = ko.observable<Image>();
		private showRating = ko.observable(true);

		constructor(params: IRatingViewModelParams, private _imageService: Api.IImageService) {
			super();

			this.loadImageSet();
		}

		private loadImageSet() {
			return this._imageService.findImageSet().done((result) => {
				this.first(this.map(result.first));
				this.second(this.map(result.second));
			}).fail((error) => {

				this.showRating(false);

				if (error == Api.ErrorCode.NoImages) {
					this.notification.show("There are no images yet.", NotificationType.Warning);
				}
				else {
					this.notification.show("Failed to load images.", NotificationType.Danger);
				}

			}).always(() => {
				this.isLoading(false);
			});
		}


		private map(image: Api.ImageFromSet): Image {
			return {
				url: image.path,
			};
		}

		public rateFirstAsWinner() {

		}

		public rateSecondAsWinner() {

		}

		public onDisposal(): void {
		}
	}
}