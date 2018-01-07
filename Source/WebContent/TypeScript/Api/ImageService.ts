namespace Api {

	export interface IImageService {
		deleteImage(query: ImageDelectionQuery): Api.VoidDeferred;
		rateImages(ratings: ImageRatingResult): Api.VoidDeferred;
		findImagesByRating(query: ImageRatingQuery): Api.GenericDeferred<ImageByRate>;
		getImageSet(): Api.GenericDeferred<ImageSet>;
	}

	export class ImageService implements IImageService {

		constructor(private _rcpService: Service.IDeferredRcpClient) {	}

		public deleteImage(query: ImageDelectionQuery){
			return this._rcpService.put<ImageDelectionQuery>(query,  "image", "deleteimage");
		}

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