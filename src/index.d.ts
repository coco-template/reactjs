// internal
import { rootReducer } from './redux';

declare module '*.pcss';

// global, avoid redundant unnecessary import
declare global {
  declare type AppState = ReturnType<typeof rootReducer>;
}
