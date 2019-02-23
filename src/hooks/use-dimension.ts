/**
 * @description - viewport dimension hook
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { useEffect, useState } from 'react';

// internal types
interface Dimension {
  width: number;
  height: number;
}

// scope
const initialDimension: Dimension = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function useDimension() {
  const [dimension, setDimension] = useState<Dimension>(initialDimension);

  useEffect(() => {
    const handleViewportChange = () =>
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener('resize', handleViewportChange);

    return () => window.removeEventListener('resize', handleViewportChange);
  }, [dimension.width, dimension.height]);

  return dimension;
}

export default useDimension;
