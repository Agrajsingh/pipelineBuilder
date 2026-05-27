import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="LLM"
    description="Generate a response from system and prompt inputs."
    accent="orange"
    fields={[
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'GPT-4',
        options: [
          { value: 'GPT-4', label: 'GPT-4' },
          { value: 'Claude', label: 'Claude' },
          { value: 'Gemini', label: 'Gemini' },
        ],
      },
    ]}
    handles={[
      { id: 'system', type: 'target', position: 'left', top: '35%' },
      { id: 'prompt', type: 'target', position: 'left', top: '68%' },
      { id: 'response', type: 'source', position: 'right' },
    ]}
  />
);
