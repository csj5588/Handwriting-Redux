/**
 * 通过柯里化特性，写可扩展嵌套中间件
 */

const store = createStore(reducer);
const next = store.dispatch;

const loggerMiddleware = next => action => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

const exceptionMiddleware = next => action => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告', err);
  }
}

store.dispatch = exceptionMiddleware(loggerMiddleware(next));