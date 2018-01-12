/// <reference path="ViewModelBase.ts" />
/// <reference path="../Binding/NotificationBinding.ts" />

namespace ViewModel {

	export interface IRatedViewModelParams {
		rating?: number;
	}

	//export interface Image {
	//	url: string;
	//	delete: () => void;
	//	isDeleting:
	//}

	class Image {

		private url: string;
		private isDeleting = ko.observable(false);

		constructor(fileName: string, private id: number, private _imageService: Api.IImageService, private notification: NotificationTrigger) {
			//this.backgroundImage = `url(Images/${fileName})`;
			this.url = `Images/${fileName}`;
		}

		private onDeleteClick(): void {
			this.isDeleting(true);
			this._imageService.deleteImage({ id: this.id }).done(() => {
			}).fail(() => {
				this.notification.show("Failed to delete image", NotificationType.Danger);
			}).always(() => {
				this.isDeleting(false);
			});
		}
	}

	export class RatedViewModel extends ViewModelBase {

		private header = ko.observable<string>();

		private images = ko.observableArray<Image>();
		private skip = 0;
		private take = 20;

		private isLoading = ko.observable(false);
		private notification = new NotificationTrigger();

		constructor(param: IRatedViewModelParams, private _imageService: Api.IImageService) {
			super();

			this.header(param.rating === 0 ? "Unrated" : `${param.rating} stars`);
			//TODO Create a scroll handler

			this._imageService.findImagesByRating({ rating: param.rating, skip: this.skip, take: this.take }).done((value) => {
				this.notification.show("Failed", NotificationType.Danger);
				this.images(value.images.map(image => {
					return new Image(image.fileName, image.id, this._imageService, this.notification);
				}));
			}).fail(() => {
				this.notification.show("Failed to load images", NotificationType.Danger);
			}).always(() => {

			});
		}

		public onDisposal(): void {
		}
	}
}