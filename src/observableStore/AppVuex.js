import { Component } from './core/Component.js';
import { storeVuex } from './storeVuex.js';

const InputA = () => `<input id="stateA" value="${storeVuex.state.a}" />`;
const InputB = () => `<input id="stateB" value="${storeVuex.state.b}" />`;
const Calculator = () =>
  `<p>a + b = ${storeVuex.state.a + storeVuex.state.b}</p>`;

class App extends Component {
  template() {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      storeVuex.commit('SET_A', Number(target.value));
    });

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      storeVuex.commit('SET_B', Number(target.value));
    });
  }
}

export default App;
