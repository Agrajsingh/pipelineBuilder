import { useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const getDefaultValue = (field, id, data) => {
  if (data?.[field.name] !== undefined) {
    return data[field.name];
  }

  if (typeof field.defaultValue === 'function') {
    return field.defaultValue(id, data);
  }

  return field.defaultValue ?? '';
};

const FieldControl = ({ id, field, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [value, setValue] = useState(() => getDefaultValue(field, id, data));

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);
    updateNodeField(id, field.name, nextValue);
  };

  if (field.type === 'select') {
    return (
      <label className="node-field">
        <span>{field.label}</span>
        <select value={value} onChange={handleChange}>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="node-field">
        <span>{field.label}</span>
        <textarea
          value={value}
          onChange={handleChange}
          rows={field.rows ?? 3}
          placeholder={field.placeholder}
        />
      </label>
    );
  }

  return (
    <label className="node-field">
      <span>{field.label}</span>
      <input
        type={field.type ?? 'text'}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
      />
    </label>
  );
};

const NodeHandle = ({ id, handle }) => {
  const position = positionMap[handle.position] ?? Position.Right;
  const style = {};

  if (handle.top) {
    style.top = handle.top;
  }

  return (
    <Handle
      id={`${id}-${handle.id}`}
      type={handle.type}
      position={position}
      style={style}
      className="node-handle"
    />
  );
};

export const BaseNode = ({
  id,
  data = {},
  title,
  description,
  accent = 'blue',
  fields = [],
  handles = [],
  children,
  style,
  className = '',
}) => {
  const groupedHandles = useMemo(() => handles, [handles]);

  return (
    <div
      className={`base-node accent-${accent} ${className}`}
      style={style}
    >
      {groupedHandles.map((handle) => (
        <NodeHandle key={`${handle.type}-${handle.id}`} id={id} handle={handle} />
      ))}

      <div className="node-header">
        <div>
          <span className="node-kicker">Node</span>
          <h3>{title}</h3>
        </div>
      </div>

      {description && <p className="node-description">{description}</p>}

      {fields.length > 0 && (
        <div className="node-fields">
          {fields.map((field) => (
            <FieldControl key={field.name} id={id} field={field} data={data} />
          ))}
        </div>
      )}

      {children}
    </div>
  );
};

export const createConfiguredNode = (config) => {
  return ({ id, data }) => (
    <BaseNode
      id={id}
      data={data}
      title={config.title}
      description={config.description}
      accent={config.accent}
      fields={config.fields}
      handles={config.handles}
    />
  );
};
