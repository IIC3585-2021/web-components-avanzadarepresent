const template = document.createElement('template');

template.innerHTML = `
  <style>
  .general {
    width: 100%;
    
  }
  .container {
    width: 50%;
    margin: auto;
    font-family: -apple-system-rounded, BlinkMacSystemFont, "Courier New";
  }
  ul {
    list-style-type: none;
  }
  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em;
  }
  .new-todo {
    width: 65%;
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
  .prompt {
    border: none;
    outline: 0;
    padding: 15px;
    color: white;
    background-color: #1d1d1f;
    text-align: center;
    cursor: pointer;
    width: 20%;
    font-size: 15px;
    border-radius: 15px;
  }

  </style>
  <div class="general">
    <div class="container">
      <h2></h2>
      <ul class="list-wrapper">
      </ul>
      <div class="input-group">
        <p class="prompt"></p> 
        <input class="new-todo"></input>
        <button class="circular">+</button>
      </div>
    </div>
  </div>
`

class ToDoListComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));

    this.$promt = this.shadow.querySelector('p');
    this.$title = this.shadow.querySelector('h2');
    this.$listWrapper = this.shadow.querySelector('ul');
    this.$addButton = this.shadow.querySelector('.circular');
    this.$addButton.addEventListener('click', () => this.addElement());
    this.itemList = [];
    this.counter = 1;

  }

  get titulo() {
    return this.getAttribute('titulo');
  }
  get promt() {
    return this.getAttribute('promt');
  }
  get itemsProps() {
    const items = [];
    while (this.getAttribute(`item${this.counter}`) && this.getAttribute(`item${this.counter}`) !== '') {
      let value = { id: this.counter, value: this.getAttribute(`item${this.counter}`) }
      items.push(value);
      this.counter++;
    }
    this.counter = 1;
    this.itemList = items;
    return items
  }

  set itemsProps(values) {
    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      this.setAttribute(`item${index + 1}`, element.value);
    }
  }

  static get observedAttributes() {
    return ['titulo', 'promt'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$promt.innerHTML = this.promt;
    this.$title.innerHTML = this.titulo;
    this.$listWrapper.innerHTML = '';
    this.itemsProps.forEach(element => {
      const newItem = document.createElement("todo-element");
      newItem.setAttribute("content", element.value);
      newItem.setAttribute("id", element.id);
      newItem.addEventListener("deletePressed", (e) => { this.deleteItem(e.detail) });
      this.$listWrapper.appendChild(newItem);
    });
  }

  deleteItem(itemID) {
    let otro = this.itemList.filter(item => item.id != itemID)
    this.resetItemAttrs();
    this.itemsProps = otro;
    this.render();
  }

  resetItemAttrs() {
    let count = 1
    while (this.getAttribute(`item${count}`)) {
      this.setAttribute(`item${count}`, '');
      count++;
    }
  }

  addElement() {
    let input = this.shadow.querySelector('.new-todo');
    const itemIndex = this.itemList.length + 1;
    this.setAttribute(`item${itemIndex}`, input.value);
    input.value = ''
    this.render();
  }

}

window.customElements.define('todo-list', ToDoListComponent);
