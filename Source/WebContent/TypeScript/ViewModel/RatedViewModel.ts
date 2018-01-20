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
		private skip: number;
		private take = 10;

		private isLoadingPage = ko.observable(false);
		private isLoadingMore = ko.observable(false);
		private notification = new NotificationTrigger();
		private rating: number;
		private hasReachedEnd = ko.observable(false);

		constructor(param: IRatedViewModelParams, private _imageService: Api.IImageService) {
			super();

			this.header(param.rating === 0 ? "Unrated" : `${param.rating} stars`);
			this.rating = param.rating;
			this.skip = 0;

			this.load();
			//TODO Create a scroll handler
			//TODO Hide load button on end
		}

		private load() {
			this.isLoadingPage(true);

			return this._imageService.findImagesByRating({ rating: this.rating, skip: this.skip, take: this.skip + this.take }).done((value) => {
				this.images(value.images.map(image => this.map(image)));
				this.skip = this.skip + value.images.length;
				this.hasReachedEnd(value.images.length < this.take);
			}).fail(() => {
				this.notification.show("Failed to load images", NotificationType.Danger);
			}).always(() => {
				this.isLoadingPage(false);
			});
		}

		private loadMore() {
			this.isLoadingMore(true);

			return this._imageService.findImagesByRating({ rating: this.rating, skip: this.skip, take: this.skip + this.take }).done((value) => {
				const images = value.images.map(image => this.map(image))
				this.images.valueWillMutate();

				for (var image of images) {
					this.images.push(image);
				}
				this.images.valueHasMutated();
				this.skip = this.skip + value.images.length;
				this.hasReachedEnd(value.images.length < this.take);
			}).fail(() => {
				this.notification.show("Failed to load images", NotificationType.Danger);
			}).always(() => {
				this.isLoadingMore(false);
			});
		}

		private map(image: Api.ImageInList) {
			return new Image(image.fileName, image.id, this._imageService, this.notification);
		}

		public onDisposal(): void {
		}
	}
}