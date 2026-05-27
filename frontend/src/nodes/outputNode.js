import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Output"
    description="Return the final pipeline result."
    accent="purple"
    fields={[
      {
        name: 'outputName',
        label: 'Name',
        defaultValue: (nodeId) => nodeId.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
        ],
      },
    ]}
    handles={[
      { id: 'value', type: 'target', position: 'left' },
    ]}
  />
);
