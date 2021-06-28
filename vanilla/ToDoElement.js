const elementTemplate = document.createElement('template');

elementTemplate.innerHTML = `
  <style>
  li.todo-list-element {
    display: flex;
    align-items: center;
    padding: 0.5em;
    justify-content: space-between;
    font-family: -apple-system-rounded, BlinkMacSystemFont, "Courier New";
  }
  button.circular {
    height: 30px;
    line-height: 30px;  
    width: 30px;  
    font-size: 1em;
    font-weight: bold;
    border-radius: 50%;
    background-color: #1d1d1f;
    color: white;
    text-align: center;
    cursor: pointer;
}
button.circular:hover{
  opacity:0.7;
}
  </style>

  <li class="todo-list-element">
  <div class="content-text"></div>
  <div>
    <button class="circular">-</button>
  </div>
  </li>
`

class ToDoElementComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(elementTemplate.content.cloneNode(true));

    this.$content = this.shadow.querySelector('div');
    this.$deleteButton = this.shadow.querySelector('button');

    this.$deleteButton.addEventListener('click', () => {
      var event = new CustomEvent("deletePressed", { detail: this.id });
      this.dispatchEvent(event);
    });
  }

  get id() {
    return this.getAttribute('id');
  }

  get content() {
    return this.getAttribute('content');
  }

  static get observedAttributes() {
    return ['content'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$content.innerHTML = this.content;
  }
}

window.customElements.define('todo-element', ToDoElementComponent);

