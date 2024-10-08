import {BufferedValue, ClassName, View, ViewProps} from '@tweakpane/core';

interface Config {
	value: BufferedValue<string>;
	viewProps: ViewProps;
}

// Create a class name generator from the view name
// ClassName('tmp') will generate a CSS class name like `tp-tmpv`
const className = ClassName('tnp');

// Custom view class should implement `View` interface
export class PluginView implements View {
	public readonly element: HTMLElement;
	private value_: BufferedValue<string>;
	private textElem_: HTMLElement;

	constructor(doc: Document, config: Config) {
		// Create a root element for the plugin
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		// Bind view props to the element
		config.viewProps.bindClassModifiers(this.element);

		// Receive the bound value from the controller
		this.value_ = config.value;

		// Create child elements
		this.textElem_ = doc.createElement('div');
		this.textElem_.classList.add(className('text'));
		this.element.appendChild(this.textElem_);

		// Apply the initial value
		this.refresh_();

		config.viewProps.handleDispose(() => {
			// Called when the view is disposing
			console.log('TODO: dispose view');
		});
	}

	private refresh_(): void {
		const rawValue = this.value_.rawValue;

		this.textElem_.textContent = rawValue.toString();
	}
}
