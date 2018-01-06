namespace Api {

	export interface IImageService {
		rateImages(ratings: ImageRatingResult): Api.VoidDeferred;
		findImagesByRating(query: ImageRatingQuery): Api.GenericDeferred<ImageByRate>;
		getImageSet(): Api.GenericDeferred<ImageSet>;
	}

	export class ImageService implements IImageService {

		constructor(private _rcpService: Service.IDeferredRcpClient) {	}

		public rateImages(ratings: ImageRatingResult){
			return this._rcpService.put<ImageRatingResult>(ratings,  "image", "rateimages");
		}

		public findImagesByRating(query: ImageRatingQuery) {
			return this._rcpService.post<ImageRatingQuery, ImageByRate>(query, "image", "findimagesbyrating");
		}

		public getImageSet() {
			return this._rcpService.get<ImageSet>("image", "getimageset");
		}
	}
}