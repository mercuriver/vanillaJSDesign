import { StoreVuex } from './core/StoreVuex.js';

export const storeVuex = new StoreVuex({
  state: { a: 10, b: 20 },

  mutations: {
    SET_A(state, payload) {
      state.a = payload;
    },
    SET_B(state, payload) {
      state.b = payload;
    },
  },

  // 필요할 경우 actions도 여기에 구현
});
