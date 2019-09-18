let state = {
  counter: {
    count: 0
  },
  info: {
    name: '啦啦啦',
    description: '挺开心',
  },
};

function counterReducer(state, action) {
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

function InfoReducer(state, action) {
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

// handwriting第三遍
const reducers = comReducer({
  count: countReducer,
  info: InfoReducer,
})

function combReducers(reducers) {
  const reducerKeysArr = Object.keys(reducers);

  return function comb (state = {}, action) {
    const nextState = state;

    for (let i = 0; i < reducerKeysArr.length; i++) {
      const key = reducerKeysArr[i];
      const reducerChild = reducers[key];
      const nextStateForKey = reducerChild(nextState[key], action);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  }

}

// 第二遍
const reducers = comReducers({
  counter: counterReducer,
  info: InfoReducer,
})

function comb(reducer) {
  const reducerKeysArr = Object.keys(reducer)

  return function reducerAll(state = {}, action) {
    const nextState = state;

    for (let i = 0; i < reducerKeysArr; i++) {
      const key = reducerKeysArr[i];
      const childReducer = reducers[key];
      const nextStateForKey = childReducer(nextState[key], action);

      nextState[key] = nextStateForKey
    }
    return nextState;
  }
}

// 第一遍
const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
})

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
