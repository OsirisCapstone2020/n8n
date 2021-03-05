import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// Test file: http://pdsimage.wr.usgs.gov/Missions/Mars_Reconnaissance_Orbiter/CTX/mrox_0674/data/P22_009816_1745_XI_05S073W.IMG
export class Start implements INodeType {
	private static readonly INPUT_FILE = 'inputURL';

	description: INodeTypeDescription = {
		displayName: 'Start',
		name: 'start',
		icon: 'fa:file-import',
		group: ['input'],
		version: 1,
		description: 'Starts the workflow execution from this node',
		maxNodes: 1,
		defaults: {
			name: 'Start',
			color: '#00a000',
		},
		inputs: [],
		outputs: ['main'],
		properties: [
			{
				name: Start.INPUT_FILE,
				displayName: 'Input file URL',
				type: 'string',
				required: true,
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const inputUrl = this.getNodeParameter(Start.INPUT_FILE, 0);
		const outputData = this.getInputData().map((output) => {
			if (!output.json) {
				output.json = {};
			}
			output.json.inputFile = inputUrl;
			return output;
		});
		return this.prepareOutputData(outputData);
	}
}
