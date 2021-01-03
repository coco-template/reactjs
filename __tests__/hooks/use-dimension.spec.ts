// package
import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
// internal
import { useDimension } from '../../src/hooks/use-dimension';

describe('useDimension hooks', () => {
  it('should initialize with dimension', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const hook = renderHook(() => useDimension());

    expect(hook.result.current.width).toEqual(width);
    expect(hook.result.current.height).toEqual(height);
  });

  it('should response viewport resize', () => {
    const hook = renderHook(() => useDimension());

    Reflect.defineProperty(window, 'innerWidth', {
      get() {
        return 1000;
      },
    });

    Reflect.defineProperty(window, 'innerHeight', {
      get() {
        return 800;
      },
    });

    act(() => {
      fireEvent(window, new Event('resize'));
    });

    expect(hook.result.current.width).toEqual(1000);
    expect(hook.result.current.height).toEqual(800);
  });
});
