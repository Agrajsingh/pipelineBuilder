import { useEffect, useMemo, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

const variablePattern = /\{\{\s*([^{}]+?)\s*\}\}/g;
const validVariableName = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

const extractVariables = (text) => {
  const variables = [];
  const seen = new Set();
  let match;

  while ((match = variablePattern.exec(text)) !== null) {
    const variableName = match[1].trim();

    if (validVariableName.test(variableName) && !seen.has(variableName)) {
      seen.add(variableName);
      variables.push(variableName);
    }
  }

  return variables;
};

const getNodeSize = (text, variableCount) => {
  const lines = text.split('\n');
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);

  return {
    width: Math.min(440, Math.max(240, longestLine * 7 + 72)),
    minHeight: Math.max(170, lines.length * 24 + variableCount * 22 + 118),
  };
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{ input }}');
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(currText), [currText]);
  const size = useMemo(
    () => getNodeSize(currText, variables.length),
    [currText, variables.length]
  );

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variables]);

  const handleTextChange = (event) => {
    const nextText = event.target.value;
    setCurrText(nextText);
    updateNodeField(id, 'text', nextText);
  };

  const handles = [
    ...variables.map((variableName, index) => ({
      id: `var-${variableName}`,
      type: 'target',
      position: 'left',
      top: `${((index + 1) / (variables.length + 1)) * 100}%`,
    })),
    { id: 'output', type: 'source', position: 'right' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      description="Compose prompts and expose {{ variables }} as inputs."
      accent="pink"
      handles={handles}
      className="text-node"
      style={{ width: size.width, minHeight: size.minHeight }}
    >
      <label className="node-field">
        <span>Text</span>
        <textarea
          className="text-node-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={Math.max(4, currText.split('\n').length)}
          placeholder="Write text with {{ variableName }} placeholders"
        />
      </label>

      {variables.length > 0 && (
        <div className="variable-list">
          {variables.map((variableName) => (
            <span key={variableName} className="variable-pill">
              {variableName}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
