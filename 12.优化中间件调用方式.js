// 封装进createStore中
const createStore = (reducer, initState, rewriteCreateStoreFunc) => {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore;
  }
  // 否则往下继续走
}

// 最终用法
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware);

const store = createStore(reducer, initState, rewriteCreateStoreFunc);
