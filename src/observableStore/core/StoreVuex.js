import { observable } from './observer.js';

export class StoreVuex {
  #state;
  #mutations;
  #actions;
  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, { get: () => this.#state[key] });
    });
  }

  commit(action, payload) {
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    // 예제에서는 사용되고 있지 않음
    return this.#actions[action](
      {
        state: this.#state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }
}
