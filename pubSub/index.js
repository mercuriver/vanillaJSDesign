class Publish {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  onUpdateState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.notify();
  }

  addSubscriber(subscriber) {
    this.#observers.add(subscriber);
  }

  notify() {
    this.#observers.forEach((fn) => fn());
  }
}

class Subscriber {
  #fn;
  constructor(callback) {
    this.#fn = callback;
  }

  subscribe(publisher) {
    publisher.addSubscriber(this.#fn);
  }
}

const state = new Publish({ a: 10, b: 20 });

const adder = new Subscriber(() => console.log(`a + b = ${state.a + state.b}`));
const multiplier = new Subscriber(() =>
  console.log(`a * b = ${state.a * state.b}`)
);

adder.subscribe(state);
multiplier.subscribe(state);

state.notify();
state.onUpdateState({ a: 100, b: 200 });
