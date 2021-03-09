import {
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class NoOp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Debug',
		name: NoOp.name,
		group: ['input'],
		version: 1,
		description: 'No operation',
		defaults: {
			name: 'NoOp',
			color: '#449922'
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		const outputData = Object.assign({}, this.getInputData());
		if (!outputData.json) {
			outputData.json = {};
		}
		return outputData;
	}
}
