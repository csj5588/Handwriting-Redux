// counter 自己的 state和reducer 写在一起

let initState = {
  count: 0,
}

function counterReducer(state, action) {
  // 如果state没有初始值，那就给他初始值。
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    default:    
      return state;
  }
}

const createStore = function (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    linsteners.push(listener);
  }

  function dispatch() {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }
  // 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值
  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState
  }
}