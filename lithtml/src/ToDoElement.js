// Import LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

export class ToDoElementComponent extends LitElement { 
  static get properties() { 
    return {
    content: { type: String, reflect: true },
    id: { type: Number, reflect: true },
  };}

  render() {
    return html`
    <li class="todo-list-element">
      <div class="content-text">${this.content}</div>
      <div>
        <button class="circular" @click="${this.onDeleteClick}">-</button>
      </div>
    </li>
    `
  }
  
  onDeleteClick() {
    let event = new CustomEvent('deletePressed', {
      detail: {
        id: this.id,
      }
    });
    this.dispatchEvent(event);
  }

  static get styles() {
    return css`
      li.todo-list-element {
        display: flex;
        align-items: center;
        padding: 0.5em;
        justify-content: space-between
      }
      button.circular {
        border-radius: 100%;
        font-weight: bold;
        background-color: white;
      }
    `;
  }
}

customElements.define('todo-element', ToDoElementComponent);
