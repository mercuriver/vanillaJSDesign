import { Component } from './core/Component.js';
import { setA, setB, storeRedux } from './storeRedux.js';

const InputA = () =>
  `<input id="stateA" value="${storeRedux.getState().a}" size="5" />`;
const InputB = () =>
  `<input id="stateB" value="${storeRedux.getState().b}" size="5" />`;
const Calculator = () =>
  `<p>a + b = ${storeRedux.getState().a + storeRedux.getState().b}</p>`;

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
      storeRedux.dispatch(setA(Number(target.value)));
    });

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      storeRedux.dispatch(setB(Number(target.value)));
    });
  }
}

export default App;
