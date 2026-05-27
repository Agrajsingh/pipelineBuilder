import { createConfiguredNode } from './baseNode';

export const FilterNode = createConfiguredNode({
  title: 'Filter',
  description: 'Keep records that match a condition.',
  accent: 'teal',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      defaultValue: 'status == "active"',
    },
  ],
  handles: [
    { id: 'items', type: 'target', position: 'left' },
    { id: 'filtered', type: 'source', position: 'right' },
  ],
});

export const TransformNode = createConfiguredNode({
  title: 'Transform',
  description: 'Map data into a new shape.',
  accent: 'blue',
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      defaultValue: 'Map',
      options: [
        { value: 'Map', label: 'Map' },
        { value: 'Normalize', label: 'Normalize' },
        { value: 'Flatten', label: 'Flatten' },
      ],
    },
  ],
  handles: [
    { id: 'input', type: 'target', position: 'left' },
    { id: 'output', type: 'source', position: 'right' },
  ],
});

export const ApiNode = createConfiguredNode({
  title: 'API Call',
  description: 'Fetch data from an external endpoint.',
  accent: 'red',
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
      ],
    },
    {
      name: 'url',
      label: 'URL',
      defaultValue: 'https://api.example.com',
    },
  ],
  handles: [
    { id: 'payload', type: 'target', position: 'left' },
    { id: 'response', type: 'source', position: 'right' },
  ],
});

export const SummarizeNode = createConfiguredNode({
  title: 'Summarize',
  description: 'Condense long text into a short answer.',
  accent: 'yellow',
  fields: [
    {
      name: 'length',
      label: 'Length',
      type: 'select',
      defaultValue: 'Short',
      options: [
        { value: 'Short', label: 'Short' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Detailed', label: 'Detailed' },
      ],
    },
  ],
  handles: [
    { id: 'document', type: 'target', position: 'left' },
    { id: 'summary', type: 'source', position: 'right' },
  ],
});

export const MergeNode = createConfiguredNode({
  title: 'Merge',
  description: 'Combine two upstream values.',
  accent: 'violet',
  fields: [
    {
      name: 'strategy',
      label: 'Strategy',
      type: 'select',
      defaultValue: 'Append',
      options: [
        { value: 'Append', label: 'Append' },
        { value: 'Join', label: 'Join' },
        { value: 'Prefer first', label: 'Prefer first' },
      ],
    },
  ],
  handles: [
    { id: 'first', type: 'target', position: 'left', top: '35%' },
    { id: 'second', type: 'target', position: 'left', top: '68%' },
    { id: 'merged', type: 'source', position: 'right' },
  ],
});
