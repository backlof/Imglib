interface KnockoutBindingHandlers {
	hide: KnockoutBindingHandler;
}

namespace Binding {

	class HideBinding implements KnockoutBindingHandler {
		public update(element: any, valueAccessor: () => KnockoutValue<boolean>, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext): void {
			ko.bindingHandlers.visible.update(element, () => { return !ko.utils.unwrapObservable(valueAccessor()); }, allBindingsAccessor, viewModel, bindingContext);
		}
	}

	ko.bindingHandlers.hide = new HideBinding();
}