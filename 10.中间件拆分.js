const store = createStore(reducer);
const next = store.dispatch;

const loggerMiddleware = store => next => action => {
  console.log(store.getState());
  next(action);
  // dispatch (action);
}

const exceptionMiddleware = store => next => action => {
  try {
    next(action)
  } catch (err) {
    console.error('错误报告', err);
  }
}

const timeMiddleware = store => next => action => {
  console.log('time', new Date().getTime());
  next(action);
}

const logger = loggerMiddleware(store);
const exception = exceptionMiddleware(store);
const time = timeMiddleware(store);
store.dispatch = exception(time(logger(next)));