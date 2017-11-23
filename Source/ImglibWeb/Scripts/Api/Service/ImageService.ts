
import { injectable, inject } from "inversify";
import { $ } from "../jquery-3.2.1.min.js";
import stuff = require("./../jquery-3.2.1.min.js");

namespace Api {
	
	interface IImageService {
		givePictureBack(picture: Picture) : JQueryDeferred<Picture>;
		testStuff(value: number) : JQueryDeferred<void>;
	}

	@injectable("IRcpService")
	class ImageService implements IImageService {

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