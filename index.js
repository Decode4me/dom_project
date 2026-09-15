// ==========================================================
// Shopping Cart - DOM Events
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const totalDisplay = document.querySelector(".total-price .total");

  // Each product is one of the top-level ".card-body" wrappers
  // inside ".list-products"
  const productCards = document.querySelectorAll(".list-products > .card-body");

  productCards.forEach((product) => {
    const plusBtn = product.querySelector(".fa-plus-circle");
    const minusBtn = product.querySelector(".fa-minus-circle");
    const quantityEl = product.querySelector(".quantity");
    const trashBtn = product.querySelector(".fa-trash-alt");
    const heartBtn = product.querySelector(".fa-heart");
    const unitPriceEl = product.querySelector(".unit-price");

    // Extract the numeric unit price from text like "100 $"
    const unitPrice = parseFloat(unitPriceEl.textContent);

    // --- Increase quantity ---
    plusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityEl.textContent, 10);
      quantity++;
      quantityEl.textContent = quantity;
      updateTotal();
    });

    // --- Decrease quantity (never below 0) ---
    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityEl.textContent, 10);
      if (quantity > 0) {
        quantity--;
        quantityEl.textContent = quantity;
        updateTotal();
      }
    });

    // --- Delete the item from the cart ---
    trashBtn.addEventListener("click", () => {
      product.remove();
      updateTotal();
    });

    // --- Like / unlike the item ---
    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("liked");
    });
  });

  // Recalculate and display the total price of every remaining product
  function updateTotal() {
    const remainingCards = document.querySelectorAll(
      ".list-products > .card-body",
    );
    let total = 0;

    remainingCards.forEach((product) => {
      const unitPriceEl = product.querySelector(".unit-price");
      const quantityEl = product.querySelector(".quantity");

      const unitPrice = parseFloat(unitPriceEl.textContent);
      const quantity = parseInt(quantityEl.textContent, 10);

      total += unitPrice * quantity;
    });

    totalDisplay.textContent = `${total} $`;
  }

  // Initial total calculation on page load
  updateTotal();
});
