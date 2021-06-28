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
    `;
  }

  static get properties() {
    return {
      titulo: { type: String, reflect: true },
      promt: { type: String, reflect: true },
      items: { type: Array, reflect: true },
    };
  }

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
