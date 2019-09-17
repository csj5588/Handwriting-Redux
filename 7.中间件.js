/**
 * middleware
 * 是对dispatch的扩展，或者说重写，增强dispatch的功能。
 * 我现在有一个需求，在每次修改 state 的时候，记录下来 修改前的 state ，为什么修改了，以及修改后的 state。
 */

const store = createStore(reducer);
const next = store.dispatch;

store.dispatch = (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());

  // 或者
  try {
    next(action);
  } catch (err) {
    console.error('错误报告', err);
  }
}

store.dispatch({ type: 'INCREMENT' })