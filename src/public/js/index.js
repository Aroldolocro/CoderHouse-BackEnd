const socket = io();

socket.on("Socket-01", (data) => {
  let ProductCard = "";

  data.forEach((x) => {
    ProductCard += `<div class="product-background">
    <div class="product-B1">
      <p class="product-txt-1">${x.id}</p>
      <p class="product-txt-2">${x.code}</p>
    </div>
    <div class="product-B2">
      <p class="product-txt-3">?</p>
      <p class="product-txt-4">${x.title}</p>
      <p class="product-txt-5">${x.description}</p>
      <div class="product-B2B1">
        <p class="product-txt-6">Stock: <b>${x.stock}</b></p>
        <p class="product-txt-7">$ ${x.price}</p>
      </div>
    </div>
    <div class="product-B3">
      Add to cart
    </div>
  </div>`;
  });

  const element = document.getElementById("DivProducts");
  element.innerHTML = ProductCard;
});

document
  .getElementById("Form-btn-2")
  .addEventListener("click", function Testinga() {
    var InputLavelValue = document.getElementById("Form-input-1").value;
    if (InputLavelValue) {
      socket.emit("Socket-02", InputLavelValue);
    }
  });

const element1 = document.getElementById("realTimeProducts-btn-1");
const element2 = document.getElementById("Form-background");
const element3 = document.getElementById("Form-shadow");
const element4 = document.getElementById("Form-content");
const element5 = document.getElementById("realTimeProducts-btn-1-delete");
const element6 = document.getElementById("Form-background-delete");
const element7 = document.getElementById("Form-shadow-delete");
const element8 = document.getElementById("Form-content-delete");

function ShowForm() {
  element4.classList.remove("Form-content-v1");
  element2.classList.add("FlexClass");
}

element1.onclick = function () {
  ShowForm();
};

function HideForm() {
  element4.classList.add("Form-content-v1");
  setTimeout(() => {
    element2.classList.remove("FlexClass");
  }, 200);
}

element3.onclick = function () {
  HideForm();
};

function ShowFromDelete() {
  element8.classList.remove("Form-content-v1");
  element6.classList.add("FlexClass");
}

element5.onclick = function () {
  ShowFromDelete();
};

function HideFormDelete() {
  element8.classList.add("Form-content-v1");
  setTimeout(() => {
    element6.classList.remove("FlexClass");
  }, 200);
}

element7.onclick = function () {
  HideFormDelete();
};
