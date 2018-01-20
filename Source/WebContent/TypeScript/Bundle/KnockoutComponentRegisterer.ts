namespace Bundle {

	export interface IKnockoutComponentRegisterer {
		register(components: KnockoutComponentConfiguration[]): JQueryDeferred<void>;
	}

	export class HtmlScriptInsertKnockoutComponentRegisterer implements IKnockoutComponentRegisterer {

		constructor(private _serviceResolver: Service.IServiceResolver) { }

		private loadHtml(scriptId: string): JQueryDeferred<string> {
			const promise = $.Deferred<string>();

			$.get(`Web/${scriptId}.html`).done((data: string) => {
				promise.resolve(data);
			}).fail(() => {
				promise.reject();
			});

			return promise;
		}

		private registerComponent(component: KnockoutComponentConfiguration) {
			return this.loadHtml(component.name).done((html: string) => {
				ko.components.register(component.name, {
					viewModel: (params) => {
						return component.init(params, this._serviceResolver);
					},
					template: html,
					synchronous: true

				} as KnockoutComponentTypes.Config);
			});
		}

		public register(components: KnockoutComponentConfiguration[]) {
			const promise = $.Deferred<void>();

			$.when.apply($, components.map(component => this.registerComponent(component))).done(() => {
				promise.resolve();
			}).fail(() => {
				promise.reject();
			});

			return promise;
		}
	}
}