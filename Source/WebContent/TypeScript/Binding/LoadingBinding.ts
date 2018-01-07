interface KnockoutBindingHandlers {
	loading: KnockoutBindingHandler;
}

namespace Binding {

	class LoadingBinding implements KnockoutBindingHandler {

		public init(element: HTMLDivElement, valueAccessor: () => KnockoutObservable<boolean>, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: ViewModel.ViewModelBase, bindingContext?: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {

			if (valueAccessor == null) {
				console.error();
			}
			else {

				const innerHtml = element.innerHTML;
				const spinner = document.createElement("div") as HTMLDivElement;
				spinner.classList.add("loading-spinner");

				const bindingHandler = (value: boolean) => {
					if (value) {
						while (element.lastChild) {
							element.removeChild(element.lastChild);
						}
						element.appendChild(spinner);
					}
					else {
						while (element.lastChild) {
							element.removeChild(element.lastChild);
						}
						element.innerHTML = innerHtml;
						for (var i = 0; i < element.children.length; i++) {
							ko.applyBindings(viewModel, element.children[i]);
						}
					}
				};

				if (valueAccessor()()) {
					bindingHandler(true);
				}

				const subscription = valueAccessor().subscribe(bindingHandler);

				ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
					subscription.dispose();
				});
			}
		}
	}

	ko.bindingHandlers.loading = new LoadingBinding();
}