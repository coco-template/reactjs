/**
 * @description - monitor reader stay time before leave
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { Epic, ofType } from 'redux-observable';
import { concat, Observable, of, timer } from 'rxjs';
import { map, scan, switchMap, takeUntil } from 'rxjs/operators';

// redux
import {
  ActionTimingAction,
  CancelTimingAction,
  DemoActionTypes,
  SpeakTimingAction,
} from './demo.constant';

// 消费类型声明
type DemoEpicInputActions = ActionTimingAction | CancelTimingAction;
type DemoEpicOutputActions = SpeakTimingAction;

/**
 * @description - Virtual Keyboard 功能按钮点击后隐藏
 */
export const demoEpic: Epic = (
  actions: Observable<DemoEpicInputActions>
): Observable<DemoEpicOutputActions> => {
  const brake$ = actions.pipe(ofType(DemoActionTypes.CancelTiming));

  return actions.pipe(
    ofType(DemoActionTypes.ActiveTiming),
    switchMap(() =>
      concat(
        timer(0, 1000).pipe(
          takeUntil(brake$),
          scan((acc) => acc + 1, 0),
          map<number, SpeakTimingAction>((cost) => ({
            type: DemoActionTypes.SpeakTiming,
            cost,
          }))
        ),
        of<SpeakTimingAction>({
          type: DemoActionTypes.SpeakTiming,
          cost: 0,
        })
      )
    )
  );
};
