import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class UploadSingleFile implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'File Upload',
		name: 'UploadSingleFile',
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
		properties: [
			{
				displayName: "File",
				name: "file",
				type: 'string',
				default: "",
				placeholder: "Upload...",
				description: "File file to upload"
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const item = this.getInputData();
		return this.prepareOutputData(item);
	}
}
