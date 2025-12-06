const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 69999,
    image: "images/iphone16.png"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 40999,
    image: "images/s23.png"
  },
  {
    id: 3,
    name: "Vivo T4",
    price: 18999,
    image: "images/VivoT4.png"
  },
  {
    id: 4,
    name: "Oppo K13",
    price: 15999,
    image: "images/k13.png"
  },
  {
    id: 5,
    name: "Motorola G96",
    price: 16999,
    image: "images/G96.png"
  },
  {
    id: 6,
    name: "Realme Narzo 80 Lite",
    price: 10999,
    image: "images/narzo80lite.png"
  }
];
const searchinput = document.getElementById("search-input");
const productContainer = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");
let cart =JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();
function renderproducts(productlist) {
  productContainer.innerHTML="";

productlist.forEach((product)=>{
  const card = document.createElement("div");
  card.className ="bg-gray-50 p-4 rounded shadow hover:shadow-lg transition";
  card.innerHTML =`<img src ="${product.image}" class="mx-auto h-40 object-contain mb-3">
  <p class="text-sm font-medium"> ${product.name}</p>
  <p class="text-green-600 font-bold mb-3">&#8377;${product.price}</p>
  <button onclick="addToCart(${product.id})"
  class ="w-full bg-yellow-400 py-2 rounded font-bold hover:bg-yellow-500">
  Add to Cart</button>
  `;
  productContainer.appendChild(card);
});
}
renderproducts(products);
searchinput.addEventListener("input",function(){
  const searchtext = searchinput.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchtext)
  );
  renderproducts(filteredProducts);
});
function addToCart(id) {
  const selectedProduct = products.find(p => p.id === id);

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {

    existingItem.quantity += 1;
  } else {
    cart.push({
      ...selectedProduct,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert(`${selectedProduct.name} added to cart!`);
}
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalItems;
}