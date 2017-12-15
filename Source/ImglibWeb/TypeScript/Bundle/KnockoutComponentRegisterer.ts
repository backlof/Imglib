module Bundle {

	export interface IKnockoutComponentRegisterer {
		register: (components: KnockoutComponentConfiguration[]) => JQueryDeferred<void>;
	}

	export class HtmlScriptInsertKnockoutComponentRegisterer implements IKnockoutComponentRegisterer {

		constructor(private _serviceResolver: Service.IServiceResolver) { }

		private loadHtml(scriptId: string): JQueryDeferred<void> {
			const promise = $.Deferred<void>();

			$.get(`Web/${scriptId}.html`).done((data: string) => {
				var script = document.createElement("script");
				script.type = "text/html";
				script.innerHTML = data;
				script.id = scriptId;
				$("head").append(script);
				promise.resolve();
			}).fail(() => {
				promise.reject();
			});

			return promise;
		}

		private registerComponent(component: KnockoutComponentConfiguration) {
			const promise = $.Deferred<void>();

			this.loadHtml(component.name).done(() => {
				ko.components.register(component.name, {
					viewModel: (params) => {
						return component.init(params, this._serviceResolver);
					},
					template: document.getElementById(component.name).innerHTML as string,
					synchronous: true

				} as KnockoutComponentTypes.Config);
				promise.resolve();
			}).fail(() => {
				promise.reject();
			});

			return promise;
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