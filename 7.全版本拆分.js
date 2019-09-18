let counterState = {
  count: 0
};

function counterReducer(state, action) {
  if (!state) {
    state = counterState;
  }

  switch (action.type) {
    case 'INCREMENT':
      return {
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

let infoState = {
  name: '啦啦啦',
  description: '挺开心',
};

function InfoReducer(state, action) {
  if (!state) {
    state = infoState;
  }

  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

// 第一遍
const reducer = {
  counter: counterReducer,
  info: InfoReducer
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    // 生成新的state
    const nextState = {};

    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      // action 会把所有reducer都走一遍

      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}

function createStore(comb) {
  // 订阅
  let state = {}
  const listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  // 发布
  function dispatch(action, states) {
    const Comreducer = comb
    const nextState = Comreducer(states, action)
    console.log(state);
    console.log(nextState);
    state = nextState;

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState,
  }
}

const store = createStore(combineReducers(reducer));

store.subscribe(() => {
  // console.log(store.getState())
});

store.dispatch({ type: 'SET_NAME', name: '雍和' });
store.dispatch({ type: 'INCREMENT' });
