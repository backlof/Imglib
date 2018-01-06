namespace Api {

	export interface IImageService {
		rateImages(ratings: ImageRatingResult): Api.VoidDeferred;
		getImageSet(): Api.GenericDeferred<ImageSet>;
	}

	export class ImageService implements IImageService {

		constructor(private _rcpService: Service.IDeferredRcpClient) {	}

		public rateImages(ratings: ImageRatingResult){
			return this._rcpService.put<ImageRatingResult>(ratings,  "image", "rateimages");
		}

		public getImageSet() {
			return this._rcpService.get<ImageSet>("image", "getimageset");
		}
	}
}