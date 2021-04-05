import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';


// Test file: http://pdsimage.wr.usgs.gov/Missions/Mars_Reconnaissance_Orbiter/CTX/mrox_0674/data/P22_009816_1745_XI_05S073W.IMG
export class Start implements INodeType {
	private static readonly USER_PARAM_INPUT_FILE = 'inputURLs';
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
				name: Start.USER_PARAM_INPUT_FILE,
				displayName: 'Input files',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				required: true,
				default: [],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const inputUrls = this.getNodeParameter(Start.USER_PARAM_INPUT_FILE, 0);
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
					from: inputUrls,
					args: {},
				},
			});

			if (apiResponse.err) {
				throw new Error(`Server returned ${JSON.stringify(apiResponse.err)}`);
			}

			outputItem.json['from'] = apiResponse.to;
			outputData.push(outputItem);
		}

		return this.prepareOutputData(outputData);
	}
}
