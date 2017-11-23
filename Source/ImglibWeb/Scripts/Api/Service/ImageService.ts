
namespace Api {
	
	export interface IImageService {
		givePictureBack(picture: Picture) : JQueryDeferred<Picture>;
		testStuff(value: number) : JQueryDeferred<void>;
	}

	export class ImageService implements IImageService {

		constructor(private _rcpService: IRcpService) { 
		}
		
		public givePictureBack(picture: Picture) {
			return this._rcpService.post<Picture, Picture>(picture, "image", "givepictureback");
		}
	
		public testStuff(value: number) {
			return this._rcpService.post<number, void>(value, "image", "teststuff");
		}
	}
}