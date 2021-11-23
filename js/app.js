const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // fixed an error.Not images , image  
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product mx-2 shadow-lg border-0">
      <div>
         <img class="product-image" src=${image}></img>
      </div>
      <div class="middle-sec">
      <h5 class="fw-bold text-success">${product.title}</h5>
      <p><span class="text-danger">Category :</span> ${product.category}</p>
      <p><span class="text-danger">Rating :</span> ${product.rating.rate}</p>
      <p><span class="text-danger">No of People rated :</span>${product.rating.count}</p>
      <h5><span class="text-danger">Price : $ </span> ${product.price}</h5>
      </div>
      <div class="">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="details(${product.description})" id="details-btn" class="btn btn-danger">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;

const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
};
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  //fixed showing the correct price of the product
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const newTotal = total.toFixed(2);
  document.getElementById(id).innerText = newTotal;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {

    setInnerText("delivery-charge", 30);
    //document.getElementById("delivery-charge").innerText = 30;
    const tax = priceConverted * 0.2;
    const taxTotal = tax.toFixed(2);
    //document.getElementById("total-tax").innerText = taxTotal;
    setInnerText("total-tax", taxTotal);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    const tax = priceConverted * 0.3;
    const taxTotal = tax.toFixed(2);
    setInnerText("total-tax", taxTotal);
    //setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    const tax = priceConverted * 0.4;
    const taxTotal = tax.toFixed(2);
    setInnerText("total-tax", taxTotal);
    //setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  const newGrandTotal = grandTotal.toFixed(2);
  document.getElementById("total").innerText = newGrandTotal;
};
