
const createStore = function (initState) {
  let state = initState;
  let linsteners = [];

  function subscribe(linstener) {
    linsteners.push(linstener);
  }

  function changeState (newState) {
    state = newState;

    for (let i = 0; i < linsteners.length; i++) {
      const linstener = linsteners[i];
      linstener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState,
  }
}

let initState = {
  counter: {
    count: 0,
  },
  info: {
    name: 'name',
    description: 'juryy',
  }
}

let store = createStore(initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(`${state.info.name}：${state.info.description}`);
});
store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});

store.changeState({
  ...store.getState(),
  counter: {
    count: 1,
  }
});
