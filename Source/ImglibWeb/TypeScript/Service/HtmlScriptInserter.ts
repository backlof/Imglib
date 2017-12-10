namespace Service {

	export interface IHtmlScriptInserter {
		loadScripts(scriptIds: string[]): JQueryDeferred<void>;
	}

	export class LocalWebDirectoryHtmlInserter implements IHtmlScriptInserter {

		private loadSingleScript(scriptId: string): JQueryDeferred<void> {
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

		loadScripts(scriptIds: string[]): JQueryDeferred<void> {
			const promise = $.Deferred<void>();

			$.when.apply($, scriptIds.map(x => this.loadSingleScript(x))).done(() => {
				promise.resolve();
			}).fail(() => {
				promise.reject();

			});

			return promise;
		}
	}
}