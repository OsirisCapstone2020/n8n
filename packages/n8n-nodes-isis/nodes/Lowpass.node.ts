import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ISISLowPass implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Low Pass Filter',
		name: 'lowpass',
		group: ['transform'],
		version: 1,
		description: 'Apply lowpass or blurring filter to a cube',
		defaults: { name: 'LowPass', color: '#772244' },
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const item = Object.assign({}, this.getInputData());
		return this.prepareOutputData(item);
	}
}
