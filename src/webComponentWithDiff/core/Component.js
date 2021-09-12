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

    // requestAnimationFrame를 사용하는 이유는 this가 binding되는 시점 문제.
    // setEvent를 실행되는 시점에서 this는 App이 아닌 Component를 가르킨다,
    // 때문에 setEvent가 호출되면 1프레임 이후에 이벤트를 등록/삭제하도록 한다.
    // 기존에 구현부에서 처리하던 로직을 다음과 같이 Component에서 추상화하여 관리하도록 한다.
    requestAnimationFrame(() => this.setEvent());
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

export default Component;
