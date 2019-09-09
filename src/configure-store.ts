/**
 * @description - redux connection
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// internal
import { rootEpic, rootReducer } from './redux';
// state
export type AppState = ReturnType<typeof rootReducer>;

export function configureStore() {
  const middleware = {
    epic: createEpicMiddleware(),
  };
  const middleWares: Middleware[] = [middleware.epic];
  const middleWaresEnhancer = applyMiddleware(...middleWares);
  // redux-devtools-extension 引入
  const devtoolsExtensionCompose =
    typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
      ? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          features: {
            persist: false,
            dispatch: true,
          },
        })
      : compose;
  const composeEnhancers =
    process.env.NODE_ENV === 'production' ? compose : devtoolsExtensionCompose;

  const store = createStore(rootReducer, composeEnhancers(middleWaresEnhancer));

  // redux-observable setup
  middleware.epic.run(rootEpic);

  if (module.hot) {
    module.hot.accept('./redux', () => store.replaceReducer(rootReducer));
  }

  return store;
}

export const rootStore = configureStore();
