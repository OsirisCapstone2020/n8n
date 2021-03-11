import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';


// Test file: http://pdsimage.wr.usgs.gov/Missions/Mars_Reconnaissance_Orbiter/CTX/mrox_0674/data/P22_009816_1745_XI_05S073W.IMG
export class Start implements INodeType {
	private static readonly NAME_INPUT_FILE = 'inputURL';
	private static readonly API_URL = 'http://127.0.0.1:8080/start';

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
				name: Start.NAME_INPUT_FILE,
				displayName: 'Input file URL',
				type: 'string',
				required: true,
				default: '',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const inputUrl = this.getNodeParameter(Start.NAME_INPUT_FILE, 0);
		const outputData: INodeExecutionData[] = [];

		for (const inputItem of this.getInputData()) {
			const outputItem = { ...inputItem };
			if (!outputItem.json) {
				outputItem.json = {};
			}

			const apiResponse = await this.helpers.request({
				method: 'POST',
				uri: Start.API_URL,
				json: true,
				body: {
					from: inputUrl,
					args: {},
				},
			});

			if (apiResponse.err) {
				throw new Error(`Server returned ${JSON.stringify(apiResponse.err)}`);
			}

			outputItem.json[Start.NAME_INPUT_FILE] = apiResponse.to;
			outputData.push(outputItem);
		}

		return this.prepareOutputData(outputData);
	}
}
