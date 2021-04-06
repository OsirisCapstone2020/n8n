import {
	IExecuteSingleFunctions, INodeExecutionData,
	INodeType,
	INodeTypeDescription
} from 'n8n-workflow';
import { NodeJSON } from './Interfaces';
import * as fs from 'fs';
import config = require('../config');

export class JsonHttpNode implements INodeType {
	description: INodeTypeDescription;

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		const inputData = this.getInputData();
		const node = this.getNode();

		const { url, ...args } = node.parameters;
		const from = inputData.json['from'];

		const outputData = { ...inputData };
		if (!outputData.json) {
			outputData.json = {};
		}

		const apiResponse = await this.helpers.request({
			method: 'POST',
			uri: url,
			json: true,
			body: { from, args },
		});

		if (apiResponse.err) {
			throw new Error(apiResponse.err);
		}

		outputData.json['from'] = apiResponse.to;

		return outputData;
	}

	static fromFile(filePath: string): JsonHttpNode {
		const jsonStr = fs.readFileSync(filePath).toString("utf-8");
		const nodeJson = JSON.parse(jsonStr) as NodeJSON;
		const node = new JsonHttpNode();

		node.description = {
			name: nodeJson.name,
			icon: nodeJson.icon ? nodeJson.icon : '',
			displayName: nodeJson.displayName,
			description: nodeJson.description,
			version: 1,
			group: ['transform'],
			defaults: {
				name: nodeJson.displayName,
			},
			inputs: ['main'],
			outputs: nodeJson.outputs ? nodeJson.outputs : ['main'],
			properties: [
				{
					name: "url",
					displayName: "",
					type: "hidden",
					default: `${config.getProperties().osirisApiUrl}/${nodeJson.name}`,
					required: true,
				},
				...nodeJson.properties,
			],
		};

		return node;
	}
}
