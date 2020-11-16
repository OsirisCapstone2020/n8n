import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Lowpass implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Low Pass Filter',
		name: 'Lowpass',
		group: ['transform'],
		version: 1,
		description: 'Apply lowpass or blurring filter to a cube',
		defaults: { name: 'LowPass', color: '#772244' },
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const item = this.getInputData();
		return this.prepareOutputData(item);
	}
}
