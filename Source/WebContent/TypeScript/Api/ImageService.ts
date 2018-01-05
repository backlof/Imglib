namespace Api {

	export interface IImageService {
		
		
		
	}

	export class ImageService implements IImageService {

		constructor(private _rcpService: Service.IDeferredRcpClient) {	}
	}
}