import {
	IExecuteSingleFunctions, INodeExecutionData,
	INodeType,
	INodeTypeDescription
} from 'n8n-workflow';
import { NodeJSON } from './Interfaces';
import * as fs from 'fs';

export class JsonHttpNode implements INodeType {
	description: INodeTypeDescription;

	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		console.log("GOT HERE");
		// const qParams = new URLSearchParams();
		// const inputData = { ...this.getInputData() };
		// const url = this.getNodeParameter("url") as string;
		//
		// console.log(JSON.stringify(node));

		// Object.keys(node.parameters).forEach((qKey) => {
		// 	qParams.append(qKey, JSON.stringify(this.getNodeParameter(qKey)));
		// });

		// const response: IDataObject = await this.helpers.request({
		// 	url: url,
		// 	qs: qParams.toString(),
		// 	method: "POST",
		// 	json: true,
		// 	body: inputData.json,
		// });
		//
		// return Object.assign({}, inputData, { json: response });

		return Object.assign({}, this.getInputData());
	}

	static fromFile(filePath: string): JsonHttpNode {
		const jsonStr = fs.readFileSync(filePath).toString("utf-8");
		const nodeJson = JSON.parse(jsonStr) as NodeJSON;
		const node = new JsonHttpNode();

		node.description = {
			name: nodeJson.name,
			displayName: nodeJson.displayName,
			description: nodeJson.description,
			version: 1,
			group: ['transform'],
			defaults: {
				name: nodeJson.displayName,
			},
			inputs: ['main'],
			outputs: ['main'],
			properties: [
				{
					name: "url",
					displayName: "",
					type: "hidden",
					default: nodeJson.url,
					required: true,
				},
				...nodeJson.properties,
			],
		};

		return node;
	}
}
