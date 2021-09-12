import { updateElement } from './updateElement.js';

class Component {
  $target;
  $state;

  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }

  render() {
    const { $target } = this;

    const newNode = $target.cloneNode(true);
    newNode.innerHTML = this.template();

    const oldChildNodes = [...$target.childNodes];
    const newChildNodes = [...newNode.childNodes];

    const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);
    for (let i = 0; i < maxLength; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }

    this.setEvent();
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

export default Component;
