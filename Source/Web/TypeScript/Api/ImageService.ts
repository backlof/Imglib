/// <reference path="../Service/DeferredRcpClient.ts" />

namespace Api {
	
	export interface IImageService {
		givePictureBack(picture: Picture) : JQueryDeferred<Picture>;
	}

	export class ImageService implements IImageService {

		constructor(private _rcpService: Service.IDeferredRcpClient) { 
		}
		
		public givePictureBack(picture: Picture) {
			return this._rcpService.post<Picture, Picture>(picture, "image", "givepictureback");
		}
	}
}