import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Input"
    description="Start a pipeline with typed data."
    accent="green"
    fields={[
      {
        name: 'inputName',
        label: 'Name',
        defaultValue: (nodeId) => nodeId.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ],
      },
    ]}
    handles={[
      { id: 'value', type: 'source', position: 'right' },
    ]}
  />
);
