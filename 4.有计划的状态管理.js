let initState = {
  count: 0,
}

let store = createStore(initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.count);
});

store.changeState({
  count: store.getState().count + 1,
});

store.changeState({
  count: store.getState().count - 1,
});

store.changeState({
  count: 'abs',
});

// 没有约束

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

// 告诉store
// 改写 changeState
const createStore = function (plan, initState) {
  let state = initState;
  let linsteners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }
  
  function dispatch(action) {
    state = plan(state, action);
    // 发布
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
}

// 用plan的方式

store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'DECREMENT'
})