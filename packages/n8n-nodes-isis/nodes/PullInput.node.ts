import {
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// Test file: http://pdsimage.wr.usgs.gov/Missions/Mars_Reconnaissance_Orbiter/CTX/mrox_0674/data/P22_009816_1745_XI_05S073W.IMG
export class PullInput implements INodeType {
	private static readonly KEY_INPUT_FILE = 'file';

	description: INodeTypeDescription = {
		displayName: 'Input from URL',
		name: PullInput.name,
		icon: 'fa:file-import',
		group: ['input'],
		version: 1,
		description: 'Specify a URL for the input',
		defaults: {
			name: 'Input from URL',
			color: '#449922',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: "File URL",
				name: PullInput.KEY_INPUT_FILE,
				type: 'string',
				default: "",
				placeholder: "",
				description: "The input file for the workflow"
			}
		],
	};

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		const file = this.getNodeParameter(PullInput.KEY_INPUT_FILE) as string;

		// This is just an example for input validation
		if (!file.toLowerCase().endsWith("img")) {
			throw new Error("The specified file type is not allowed");
		}

		const outputData = Object.assign({}, this.getInputData());
		if (!outputData.json) {
			outputData.json = {};
		}

		outputData.json.inputFile = file;
		return outputData;
	}
}
