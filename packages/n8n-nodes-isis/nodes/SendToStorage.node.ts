import {
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class SendToStorage implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Send to Output Storage',
		name: SendToStorage.name,
		icon: 'fa:file-import',
		group: ['input'],
		version: 1,
		description: 'Select an output area',
		defaults: {
			name: 'Send to Output Storage',
			color: '#449922',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: "Upload File",
				name: 'outputArea',
				type: 'options',
				options: [
					{
						name: 'Save to USGS storage',
						value: 'usgs'
					},
					{
						name: 'Save to Google Drive',
						value: 'gDrive'
					}
				],
				default: "",
				placeholder: "Select a storage area",
				description: "Where to save pipeline output"
			}
		],
	};

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		const outArea = this.getNodeParameter('outputArea') as string;

		// Use "I00831002RDR.cub" for testing
		const outputData = Object.assign({}, this.getInputData());
		if (!outputData.json) {
			outputData.json = {};
		}
		outputData.json.outputArea = outArea;
		return outputData;
	}
}
