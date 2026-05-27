import { DraggableNode } from './draggableNode';

const nodeGroups = [
  {
    title: 'Core',
    nodes: [
      { type: 'customInput', label: 'Input' },
      { type: 'llm', label: 'LLM' },
      { type: 'customOutput', label: 'Output' },
      { type: 'text', label: 'Text' },
    ],
  },
  {
    title: 'Utilities',
    nodes: [
      { type: 'filter', label: 'Filter' },
      { type: 'transform', label: 'Transform' },
      { type: 'api', label: 'API Call' },
      { type: 'summarize', label: 'Summarize' },
      { type: 'merge', label: 'Merge' },
    ],
  },
];

export const PipelineToolbar = () => (
  <header className="toolbar">
    <div className="toolbar-heading">
      <div>
        <span className="eyebrow">VectorShift Assessment</span>
        <h1>Pipeline Builder</h1>
      </div>
    </div>

    <div className="node-palette">
      {nodeGroups.map((group) => (
        <div className="node-group" key={group.title}>
          <span className="node-group-title">{group.title}</span>
          <div className="node-group-items">
            {group.nodes.map((node) => (
              <DraggableNode key={node.type} type={node.type} label={node.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </header>
);
