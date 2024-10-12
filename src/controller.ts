import {BufferedValue, Controller, ViewProps} from '@tweakpane/core';

import {PluginView} from './view.js';

interface Config {
	value: BufferedValue<string>;
	viewProps: ViewProps;
	titleDisabled: boolean;
}

// Custom controller class should implement `Controller` interface
export class PluginController implements Controller<PluginView> {
	public readonly value: BufferedValue<string>;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;
	public readonly titleDisabled: boolean;

	constructor(doc: Document, config: Config) {
		// Receive the bound value from the plugin
		this.value = config.value;
		// and also view props
		this.viewProps = config.viewProps;
		this.titleDisabled = config.titleDisabled || false;

		this.viewProps.handleDispose(() => {
			// Called when the controller is disposing
			console.log('TODO: dispose controller');
		});

		// Create a custom view
		this.view = new PluginView(doc, {
			value: this.value,
			viewProps: this.viewProps,
			titleDisabled: this.titleDisabled,
		});
	}
}
