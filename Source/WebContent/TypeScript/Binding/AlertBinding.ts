interface KnockoutBindingHandlers {
	alert: KnockoutBindingHandler;
}

namespace Binding {

	class AlertBinding implements KnockoutBindingHandler {

		public init(element: HTMLDivElement, valueAccessor: () => KnockoutValue<boolean>, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext): void {
			if (ko.isWriteableObservable(valueAccessor())) {

				const observable = (valueAccessor() as KnockoutObservable<boolean>);

				element.innerHTML = `<span class="alert-close-button">&times;</span>${element.innerHTML}`;
				let span = element.getElementsByTagName("span")[0] as HTMLSpanElement;

				let callback = () => {
					observable(false);
					element.hidden = true;
				}

				span.addEventListener("click", callback);

				const subscription = observable.subscribe((value) => {
					element.hidden = !value;
				});

				ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
					span.removeEventListener("click", callback);
					subscription.dispose();
				});

				element.hidden = !observable();
			}
			else if (valueAccessor() != null && valueAccessor() == true) {

				element.innerHTML = `<span class="alert-close-button">&times;</span>${element.innerHTML}`;
				let span = element.getElementsByTagName("span")[0] as HTMLSpanElement;

				let callback = () => {
					element.hidden = true;
					span.removeEventListener("click", callback);
					element.parentNode.removeChild(element);
				};

				span.addEventListener("click", callback);
			}
		}
	}

	ko.bindingHandlers.alert = new AlertBinding();
}