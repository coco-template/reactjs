/**
 * @description - HOC wrap lazy import component with suspense
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, { ComponentType, Suspense } from 'react';
// internal
import Loading from '../components/Loading';

// scope
const fallback = <Loading message="Loading" />;

function withLazySuspense<P extends object>(LazyImport: ComponentType<P>) {
  return (props: P) => {
    const safeProps = props || {};

    return (
      <Suspense fallback={fallback}>
        <LazyImport {...safeProps} />
      </Suspense>
    );
  };
}

export default withLazySuspense;
