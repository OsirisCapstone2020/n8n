import { IExecuteFunctions } from 'n8n-core';
import {
	IExecuteSingleFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { CommandResponse } from '../src/interfaces';

export class Lowpass implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Low Pass Filter',
		name: Lowpass.name,
		group: ['transform'],
		version: 1,
		description: 'Apply lowpass or blurring filter to a cube',
		defaults: { name: 'LowPass', color: '#772244' },
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		const inputData = this.getInputData();
		const outputData = Object.assign({}, inputData);
		const inputFile = inputData.json.inputFile as string;

		if (!inputFile) {
			throw new Error("Input file not defined!");
		}

		// TODO: All image extensions
		if (!inputFile.endsWith("cub")) {
			throw new Error("Requested file is not allowed");
		}

		const request: CommandResponse = await this.helpers.request({
			url: "http://127.0.0.1:8000",
			method: "POST",
			json: true,
			body: {
				cmd: "lowpass",
				args: [],
				input_file: inputFile
			}
		});

		if (!outputData.json) {
			outputData.json = {};
		}
		outputData.json.inputFile = request.output;
		return outputData;
	}
}
