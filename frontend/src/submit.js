import { useState } from 'react';
import { useStore } from './store';

const API_URL = 'http://localhost:8000/pipelines/parse';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      alert(
        [
          'Pipeline submitted successfully.',
          `Nodes: ${result.num_nodes}`,
          `Edges: ${result.num_edges}`,
          `Directed acyclic graph: ${result.is_dag ? 'Yes' : 'No'}`,
        ].join('\n')
      );
    } catch (error) {
      alert(`Unable to submit pipeline. ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="submit-bar">
      <button
        className="submit-button"
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
      </button>
    </footer>
  );
};
