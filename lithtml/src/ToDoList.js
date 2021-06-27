// Import LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';
import './ToDoElement.js';


export class ToDoListComponent extends LitElement { 
  render() {
    return html`
    <div class="general">
      <div class="container">
        <h2>${this.titulo}</h2>
        <ul class="list-wrapper">
        ${this.items.map((item, index) => 
          html`
            <todo-element id="${index}" content="${item}" @deletePressed="${this.deleteElement}">
            </todo-element>
          `)}
        </ul>
        <div class="input-group">
          <p class="prompt">${this.promt}</p> 
          <input class="new-todo"></input>
          <button class="circular" @click="${this.addElement}">+</button>
        </div>
      </div>
    </div>
    `
  }

  static get styles() {
    return css`
      .general {
        width: 100%;
      }
      .container {
        width: 50%;
        margin: auto;
        font-family: -apple-system-rounded, BlinkMacSystemFont
      }
      ul {
        list-style-type: none;
      }
      .input-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .new-todo {
        width: 65%;
      }
      button.circular {
        border-radius: 100%;
        font-weight: bold;
        background-color: white;
      }
    `;
  }

  static get properties() { 
    return {
    titulo: { type: String, reflect: true },
    promt: { type: String, reflect: true },
    items: { type: Array, reflect: true },
  };}

  constructor() {
    super();
    this.titulo = 'Avanzada Represents Todo';
    this.promt = 'Inserta nuevo quehacer aqui';
    this.items = [];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  addElement() {
    let input = this.shadowRoot.querySelector(".new-todo");
    this.items.push(input.value)
    this.setAttribute('items', JSON.stringify(this.items))
    input.value = ''
  }

  deleteElement(e) {
    const elementIndex = e.detail.id;
    this.items.splice(elementIndex, 1);
    this.setAttribute('items', JSON.stringify(this.items))
  }
}

// Register the element with the browser
customElements.define('todo-list', ToDoListComponent);
