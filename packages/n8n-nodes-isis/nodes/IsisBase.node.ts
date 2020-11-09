import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription
} from 'n8n-workflow';

async function executeIsisNode(): Promise<INodeExecutionData[][]> {
	return [];
}

export function readNodeFromJSON(jsonStr: string): INodeType {
	return {
		description: {
			displayName: 'Test Node',
			name: 'exampleNode',
			group: ['transform'],
			version: 1,
			description: 'Runs an ISIS command',
			defaults: {
				name: 'Example Node',
				color: '#660000',
			},
			inputs: ['main'],
			outputs: ['main'],
			properties: []
		},
		execute: executeIsisNode
	};
}
