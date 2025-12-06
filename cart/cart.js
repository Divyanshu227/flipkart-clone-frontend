let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    div.className = "flex justify-between items-center border-b pb-3";

    div.innerHTML = `
      <div class="flex items-center gap-4">
        <img src="${item.image}" class="h-16 object-contain">
        <div>
          <p class="font-medium">${item.name}</p>
          <p class="text-green-600 font-bold">₹${item.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="decreaseQty(${index})" class="px-3 py-1 bg-gray-200 rounded">−</button>
        <span class="font-bold">${item.quantity}</span>
        <button onclick="increaseQty(${index})" class="px-3 py-1 bg-gray-200 rounded">+</button>
        <button onclick="removeItem(${index})" class="ml-3 text-red-500 font-bold">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  updateTotal();
}

function increaseQty(index) {
  cart[index].quantity += 1;
  saveAndUpdate();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveAndUpdate();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndUpdate();
}

function updateTotal() {
  let total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalPriceElement.innerText = total;
}

function saveAndUpdate() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


renderCart();
