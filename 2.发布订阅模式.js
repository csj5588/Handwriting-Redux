/**
 * count的发布订阅模式
 */

let state = {
  count: 1,
};

let listeners = [];

/*订阅 */
function subscribe(listener) {
  listeners.push(listener);
}

function changeCount(count) {
  state.count = count;
  /*当 count 改变的时候，我们要去通知所有的订阅者*/
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener();
  }
}
subscribe(() => {
  console.log(state.count);
})

changeCount(2);