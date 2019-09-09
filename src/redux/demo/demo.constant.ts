/**
 * @description - redux demo boilerplate
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

export enum DemoActionTypes {
  ActiveTiming = 'ActiveTiming',
  CancelTiming = 'CancelTiming',
  SpeakTiming = 'SpeakTiming',
}

/***********************************************************************/
/* declare actions */
/***********************************************************************/
export interface ActionTimingAction {
  type: DemoActionTypes.ActiveTiming;
}

export interface CancelTimingAction {
  type: DemoActionTypes.CancelTiming;
}

export interface SpeakTimingAction {
  type: DemoActionTypes.SpeakTiming;
  cost: number;
}

/***********************************************************************/
/* declare state structure and default state */
/***********************************************************************/
export interface DemoState {
  cost: number;
}

export const defaultDemoState: DemoState = {
  cost: 0,
};
