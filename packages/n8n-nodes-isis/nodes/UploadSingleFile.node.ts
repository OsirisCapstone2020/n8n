import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class UploadSingleFile implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'File Upload',
		name: 'uploadSingleFile',
		icon: 'fa:file-import',
		group: ['input'],
		version: 1,
		description: 'Upload an input file',
		defaults: {
			name: 'File Upload',
			color: '#449922',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const item = Object.assign({}, this.getInputData());
		return this.prepareOutputData(item);
	}
}
