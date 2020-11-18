import {
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class UploadFile implements INodeType {
	private static readonly KEY_INPUT_FILE = 'file';

	description: INodeTypeDescription = {
		displayName: 'Upload File',
		name: UploadFile.name,
		icon: 'fa:file-import',
		group: ['input'],
		version: 1,
		description: 'Upload an input file',
		defaults: {
			name: 'Upload File',
			color: '#449922',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: "Upload File",
				name: UploadFile.KEY_INPUT_FILE,
				type: 'string',
				default: "",
				placeholder: "Upload...",
				description: "The file to upload"
			}
		],
	};

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		const file = this.getNodeParameter(UploadFile.KEY_INPUT_FILE) as string;

		// Use "I00831002RDR.cub" for testing
		const outputData = Object.assign({}, this.getInputData());
		if (!outputData.json) {
			outputData.json = {};
		}
		outputData.json.inputFile = file;
		return outputData;
	}
}
