// Import LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';

export class ProductCardComponent extends LitElement {
  render() {
    return html`
    <div class="card">
      <img src="${this.img}" alt="generic img" style="width:100%">
      <h1>${this.productName}</h1>
      ${this.discountedPrice ?
        html`
          <p class="previous-price">${this.priceParser(parseFloat(this.price))}</p>
          <p class="discounted-price">
            ${this.priceParser(this.discountedPrice)}
            (${this.calculateDiscount() < 0 ? '+' : '-'}${Math.abs(this.calculateDiscount()).toFixed(2)}%)
          </p>
        `:
        html`<p class="price">${this.priceParser(parseFloat(this.price))}</p>`
      }
      <div class="inner-slot">
        <slot></slot>
      </div>
      <a href="${this.buttonLink}"><button>${this.buttonText}</button></a>
    </div>
    <br />
    `
  }

  static get styles() {
    return css`
    * {
      font-family: -apple-system-rounded, BlinkMacSystemFont, "Courier New";
    }
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      max-width: 300px;
      margin: auto;
      text-align: center;
      padding: 20px;
      border-radius: 15px;
    }
    
    .price {
      color: black;
      font-size: 22px;
    }
    .previous-price {
      color: grey;
      font-size: 22px;
      text-decoration: line-through;
    }
    
    .discounted-price {
      color: black;
      font-size: 22px;
    }
    
    @keyframes wiggle{
      25%{
        transform: scale(1.1,1.1);
      }
      50%{
        transform: scale(1.1,1.1);
      }
      75%{
    transform: scale(1.1,1.1);
      }
  }
    .card button {
      border: none;
      outline: 0;
      padding: 15px;
      color: white;
      background-color: #1d1d1f;
      text-align: center;
      cursor: pointer;
      width: 100%;
      font-size: 18px;
      border-radius: 15px;
    }
    
    .card button:hover {
      opacity: 0.7;
      animation: wiggle 0.5s;
    }
    
    .card .inner-slot {
      padding-bottom: 15px;
      text-align: left;
      color: grey;
    }
    `
  }

  static get properties() {
    return {
      productName: { type: String, reflect: true },
      price: { type: String, reflect: true },
      discountedPrice: { type: String, reflect: true },
      currency: { type: String, reflect: true },
      currencySymbol: { type: String, reflect: true },
      img: { type: String, reflect: true },
      buttonText: { type: String, reflect: true },
      buttonLink: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.productName = 'Generic product';
    this.price = 'Free!';
    this.buttonText = "Add to Cart";
    this.buttonLink = "#"
    this.locale = 'es-CL'
    this.currency = 'USD'
    this.currencySymbol = '$'
    this.opts = { minimumFractionDigits: 2 }
  }
  priceParser(price) {
    return `${this.currency} ${this.currencySymbol}${price.toLocaleString(this.locale, this.opts)}`
  }
  calculateDiscount() {
    const discountedPrice = parseFloat(this.discountedPrice);
    const price = parseFloat(this.price);
    return (1 - (discountedPrice / price)) * 100
  }
}

// Register the element with the browser
customElements.define('product-card', ProductCardComponent);
