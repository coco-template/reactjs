/**
 * @description - demo state managerment
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// redux
import {
  defaultDemoState,
  DemoActionTypes,
  DemoState,
  SpeakTimingAction,
} from './demo.constant';
// interface
type DemoMutationActions = SpeakTimingAction;

export function demoReducer(
  state: DemoState = defaultDemoState,
  action: DemoMutationActions
) {
  switch (action.type) {
    case DemoActionTypes.SpeakTiming:
      return { ...state, cost: action.cost };
    default:
      return state;
  }
}
