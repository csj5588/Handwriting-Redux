// 期望用法

// 接收旧的createStore, 返回新的createStore/
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware);

const newCreateStore = rewriteCreateStoreFunc(createStore);

const store = newCreateStore(reducer);

// 实现 applyMiddleware
const applyMiddleware = function (...middlewares) {
  return function rewriteCreateStoreFunc(oldCreateStore) {
    return function newCreateStore(reducer, initState) {

      const store = oldCreateStore(reducer, initState);
      const chain = middlewares.map(middleware => middleware(store));
      let dispatch = store.dispatch;

      chain.reverse().map(middleware => {
        dispatch = middleware(dispatch);
      });

      // 重写dispatch
      store.dispatch = dispatch;
      return store;
    }
  }
}

