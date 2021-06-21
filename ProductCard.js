const style = /*html*/`
<style>
* {
  font-family: -apple-system, BlinkMacSystemFont;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.price {
  color: grey;
  color: black;
  font-size: 22px;
}

.discounted-price {
  color: black;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #1d1d1f;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}

.card .inner-slot {
  padding-bottom: 15px;
  text-align: left;
  padding-left: 15px;
  color: grey;
}

</style>

<div class="card">
  <img src="jeans3.jpg" alt="generic img" style="width:100%">
  <h1>Generic product</h1>
  <p class="price">Free!</p>
  <p class="discounted-price"></p>
  <div class="inner-slot">
    <slot></slot>
  </div>  
  <a href=""><button>Add to Cart</button></a>
</div>
<br />
`


class ProductCardComponent extends HTMLElement {
  constructor() {
      super()
      this.template = document.createElement('template');
      this.template.innerHTML = style;
      
      this.shadow = this.attachShadow({ mode: 'open' });
      this.locale = 'es-CL'
      this.currency = 'USD'
      this.opts = {minimumFractionDigits: 2}
      this.priceParser = (price) => {
        return `${this.currency} $${price.toLocaleString(this.locale, this.opts)}`
      }
  }

  render(){
    if(this.getAttribute('currency'))
      this.currency = this.getAttribute('currency')
    if(this.getAttribute('product-name'))
      this.shadow.querySelector('h1').innerHTML = this.getAttribute('product-name')
    if(this.getAttribute('price')){
      // if currency is present preapend to prices
      let price = parseFloat(this.getAttribute('price'))
      this.shadow.querySelector('.price').innerHTML = `${this.priceParser(price)}`

      // if discount, then make the old a strike through and highlight the new one
      if(this.getAttribute('discounted-price')){
        let discountedPrice = parseFloat(this.getAttribute('discounted-price'))
        let discountPercentage = (1 - (discountedPrice /price)) * 100
        this.shadow.querySelector('.price').innerHTML = `${this.priceParser(price)}`
        this.shadow.querySelector('.price').style = `text-decoration: line-through; color: grey;`;
        this.shadow.querySelector('.discounted-price').innerHTML = `${this.priceParser(discountedPrice)} (${discountPercentage < 0 ? '+' : '-'}${Math.abs(discountPercentage).toFixed(2)}%)`
      }
    }

    if(this.getAttribute('button-text'))
      this.shadow.querySelector('button').innerHTML = this.getAttribute('button-text')
    if(this.getAttribute('button-link'))
      this.shadow.querySelector('a').href = this.getAttribute('button-link')
    
    if(this.getAttribute('img'))
      this.shadow.querySelector('img').src = this.getAttribute('img');

    if(this.innerHTML) 
      this.shadow.querySelector('.inner-slot').innerHTML = this.innerHTML;     
  }

  connectedCallback() {
      this.shadow.appendChild(this.template.content.cloneNode(true));
      this.render();
      this.shadowRoot.querySelector('button').addEventListener('click', () => this.buttonClicked());
  }
  attributeChangedCallback(){
      this.render();
  }
  disconnectedCallback() {
      this.shadowRoot.querySelector('button').removeEventListener('click', () => this.buttonClicked());
  }
}

window.customElements.define('product-card', ProductCardComponent);