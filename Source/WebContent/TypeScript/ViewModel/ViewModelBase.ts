namespace ViewModel {

	declare type JQueryEventHandler = (eventObject: JQueryEventObject, ...args: any[]) => any;
	declare type EventHandler<T> = (param?: T) => void;

	interface JQueryEventBinding {
		name: string;
		handler: JQueryEventHandler;
	}

	export abstract class ViewModelBase {

		private subscriptions: KnockoutSubscription[] = [];
		private computeds: KnockoutComputed<any>[] = [];
		private eventBindings: JQueryEventBinding[] = [];

		constructor() { }

		private dispose(): void {
			for (let computed of this.computeds) {
				computed.dispose();
			}
			for (let subscription of this.subscriptions) {
				subscription.dispose();
			}
			for (let even of this.eventBindings) {
				$(document).off(even.name, even.handler);
			}
			this.onDisposal();
		}

		protected onBrowserEvent<T>(event: Browser.BrowserEventConfiguration<T>, handler: EventHandler<T>): void {
			this.on(event.name, (jq, param) => { handler(param); });
		}

		protected on(events: string, handler: JQueryEventHandler): void {
			$(document).on(events, handler);
			this.eventBindings.push({ name: events, handler: handler });
		}

		protected subscribe<T>(subsribable: KnockoutSubscribable<T>, callback: (value: T) => void): KnockoutSubscription {
			const subscription = subsribable.subscribe(callback);
			this.subscriptions.push(subscription);
			return subscription;
		}

		protected computed<T>(option: KnockoutComputedDefine<T>): KnockoutComputed<T> {
			const computed = ko.pureComputed(option);
			this.computeds.push(computed);
			return computed;
		}

		public abstract onDisposal(): void;
	}
}