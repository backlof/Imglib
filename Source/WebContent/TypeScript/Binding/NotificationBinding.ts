interface KnockoutBindingHandlers {
	notification: KnockoutBindingHandler;
}

enum NotificationType {
	Warning,
	Danger,
	Info,
	Success
}

class NotificationTrigger {

	private onHide: () => void;
	private onShow: (text: string, alert: NotificationType) => void;

	constructor() {

	}

	public show(text: string, type: NotificationType) {
		if (this.onShow)
			this.onShow(text, type);
	}

	public hide() {
		if (this.onHide)
			this.onHide();
	}
}

namespace Binding {

	class NotificationBinding implements KnockoutBindingHandler {

		public init(element: HTMLDivElement, valueAccessor: () => NotificationTrigger, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext): void {
			const value = valueAccessor();
			element.hidden = true;

			if (value != null && value instanceof NotificationTrigger) {
				element.innerHTML = `<span class="notification-text"></span><span class="notification-close-button">&times;</span>`;

				let children = element.getElementsByTagName("span");
				const textNode = children[0];
				const buttonNode = children[1];

				value["onHide"] = () => {
					element.hidden = true;
				};

				value["onShow"] = (text: string, alert: NotificationType) => {
					switch (alert) {
						case NotificationType.Danger:
							element.className = "notification danger";
							break;
						case NotificationType.Info:
							element.className = "notification info";
							break;
						case NotificationType.Success:
							element.className = "notification success";
							break;
						case NotificationType.Warning:
							element.className = "notification warning";
							break;
						default:
							console.error("Not an accepted notification type");
							break;
					}

					textNode.textContent = text;
					element.hidden = false;
				};

				const callback = () => {
					element.hidden = true;
				}

				buttonNode.addEventListener("click", callback);

				ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
					buttonNode.removeEventListener("click", callback);
				});
			}
			else {
				console.error("Param should be of Alert type");
			}
		}
	}

	ko.bindingHandlers.notification = new NotificationBinding();
}
