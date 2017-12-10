namespace Service {

	export interface IHtmlScriptInserter {
		loadScripts(scriptIds: string[]): JQueryDeferred<void>;
	}

	export class LocalWebDirectoryHtmlInserter implements IHtmlScriptInserter {

		private loadSingleScript(scriptId: string): JQueryDeferred<void> {
			const promise = $.Deferred<void>();

			$.get(`Web/${scriptId}.html`).done((data) => {
				var script = document.createElement("script");
				script.type = "text/html";
				script.innerHTML = data;
				script.id = scriptId;
				$("head").append(script);
				promise.resolve();
			}).fail(() => {
				promise.reject();
			});

			var x = document.createElement("script");
			var y = document.createElement("script");

			$("head").append([x, y])

			return promise;
		}

		loadScripts(scriptIds: string[]): JQueryDeferred<void> {
			const promise = $.Deferred<void>();

			$.when(scriptIds.map(x => this.loadSingleScript(x))).done((x) => {
				promise.resolve();
			}).fail(() => {
				promise.reject();
			});

			return promise;
		}
	}
}