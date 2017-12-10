/// <reference path="ViewModelBase.ts" />

namespace ViewModel {

	export interface RatingViewModel {
		rating: number;
	}

	export class RatingViewModel extends ViewModelBase {
		constructor(param: RatingViewModel, private _templateResolver: Bundle.ITemplateResolver) {
			super();
		}
	}
}