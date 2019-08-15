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

function withLazySuspense<P>(LazyImport: ComponentType<P>): ComponentType<P> {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <LazyImport {...props} />
    </Suspense>
  );
}

export default withLazySuspense;
