import {
	BaseMonitorParams,
	createPlugin,
	MonitorBindingPlugin,
	parseRecord,
} from '@tweakpane/core';

import {PluginController} from './controller.js';

export interface PluginMonitorParams extends BaseMonitorParams {
	view: 'note';
	readonly: true;
}

export const MonitorNotePlugin: MonitorBindingPlugin<
	string,
	PluginMonitorParams
> = createPlugin({
	id: 'note-plugin',

	// type: The plugin type.
	// - 'input': Input binding
	// - 'monitor': Monitor binding
	// - 'blade': Blade without binding
	type: 'monitor',

	accept(value: unknown, params: Record<string, unknown>) {
		if (typeof value !== 'string') {
			// Return null to deny the user input
			return null;
		}

		// Parse parameters object
		const result = parseRecord<PluginMonitorParams>(params, (p) => ({
			readonly: p.required.constant(true),
			view: p.required.constant('note'),
		}));

		if (!result) {
			return null;
		}

		// Return a typed value and params to accept the user input
		return {
			initialValue: value,
			params: result,
		};
	},

	binding: {
		reader(_args) {
			return (value: unknown): string => {
				// Convert an external unknown value into the internal value
				return typeof value === 'string' ? value : 'Something went wrong';
			};
		},
	},

	controller(args) {
		// Create a controller for the plugin
		return new PluginController(args.document, {
			value: args.value,
			viewProps: args.viewProps,
		});
	},
});
