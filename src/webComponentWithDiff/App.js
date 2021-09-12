import Component from './core/Component.js';

class App extends Component {
  setup() {
    this.$state = {
      items: ['item1', 'item2'],
    };
  }

  template() {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `;
  }

  addItem = () => {
    const { items } = this.$state;
    this.setState({ items: [...items, `item${items.length + 1}`] });
  };

  setEvent() {
    // requestAnimationFrame를 사용하는 이유는 this가 binding되는 시점 문제.
    // setEvent를 실행되는 시점에서 this는 App이 아닌 Component를 가르킨다,
    // 때문에 setEvent가 호출되면 1프레임 이후에 이벤트를 등록/삭제하도록 한다.
    requestAnimationFrame(() => {
      const $addButton = this.$target.querySelector('button');

      $addButton.removeEventListener('click', this.addItem);
      $addButton.addEventListener('click', this.addItem);
    });
  }
}

export default App;
