// preact
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// functional component
export default function Load(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  })

  return <div>{loading ? 'Loading' : 'Surprise!'}</div>;
}
