// Update Button State
let btnNames = JSON.parse(localStorage.getItem("productsInCart"));
if (btnNames) {
  btnNames = Object.values(btnNames);
  // Check if button array is not empty and update button state
  if (btnNames?.length > 0)
    btnNames.map((btns) => {
      const { btnName, btnId } = btns;
      const currentBtn = document.getElementById(btnId);
      if (currentBtn){
        currentBtn.innerHTML = btnName;
        btnName.replace(/\s+/g, "") === "ADDTOCART"
        ? currentBtn.classList.remove("rmvBtn")
        : currentBtn.classList.add("rmvBtn");
      }
      
      
    });
}

// Display the modal
document.getElementById("cart").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".bg-modal").style.display = "flex";
  document.body.style.position = "fixed";
});

// Continue shopping
document.getElementById("continue").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
  document.body.style.position = "relative";
});

// input validation
document.getElementById("phone").addEventListener("focusout", phoneValidate);
document.getElementById("name").addEventListener("focusout", nameValidate);
document.getElementById("email").addEventListener("focusout", emailValidate);

//Check name input
function nameValidate() {
  let name = document.getElementById("name").value.trim();
  var numbers = /[0-9]+/;
  if (name == "") {
    document.getElementById("name-error").innerHTML = "Please input your name";
    document.getElementById("name-error").style.visibility = "visible";
    document.getElementById("name").style.borderColor = "red";
  } else if (name.match(numbers)) {
    document.getElementById("name-error").innerHTML = "Please check your input";
    document.getElementById("name-error").style.visibility = "visible";
    document.getElementById("name").style.borderColor = "red";
  } else if (name.length < 3) {
    document.getElementById("name-error").innerHTML =
      "Name cannot be less than three digit";
    document.getElementById("name-error").style.visibility = "visible";
    document.getElementById("name").style.borderColor = "red";
  } else {
    document.getElementById("name").style.borderColor = "green";
    document.getElementById("name-error").style.visibility = "hidden";
  }
}

// Check email input
function emailValidate() {
  let email = document.getElementById("email").value.trim();
  if (email == "") {
    document.getElementById("email-error").innerHTML =
      "Please input your email";
    document.getElementById("email-error").style.visibility = "visible";
    document.getElementById("email").style.borderColor = "red";
  } else if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    ) === false
  ) {
    document.getElementById("email-error").innerHTML =
      "Please input a valid email address";
    document.getElementById("email-error").style.visibility = "visible";
    document.getElementById("email").style.borderColor = "red";
  } else {
    document.getElementById("email").style.borderColor = "green";
    document.getElementById("email-error").style.visibility = "hidden";
  }
}

// Check phone-number input
function phoneValidate() {
  let phoneNumber = document.getElementById("phone").value.trim();
  // console.log(typeof(phoneNumber));
  // var numbers = /^[0-9]+$/;
  let letter = /[A-Za-z]+/;
  if (phoneNumber == "") {
    document.getElementById("phone-error").innerHTML =
      "Please input your phone number";
    document.getElementById("phone-error").style.visibility = "visible";
    document.getElementById("phone").style.borderColor = "red";
  } else if (phoneNumber.match(letter)) {
    document.getElementById("phone-error").innerHTML =
      "Please input a correct phone number";
    document.getElementById("phone-error").style.visibility = "visible";
    document.getElementById("email").style.borderColor = "red";
  } else if (phoneNumber.length < 11) {
    document.getElementById("phone-error").innerHTML =
      "Phone Number cannot be less than 11";
    document.getElementById("phone-error").style.visibility = "visible";
    document.getElementById("email").style.borderColor = "red";
  } else {
    document.getElementById("phone").style.borderColor = "green";
    document.getElementById("phone-error").style.visibility = "hidden";
  }
}

//list of display products
let products = [
  {
    name: "Samsung Tv",
    price: 50000,
    tag: "Samsungtv",
    inCart: 0,
  },
  {
    name: "Pixel 4a",
    price: 45000,
    tag: "pixel",
    inCart: 0,
  },
  {
    name: "Ps5",
    price: 65000,
    tag: "Ps5",
    inCart: 0,
  },
  {
    name: "Macbook Air",
    price: 95000,
    tag: "Macbook",
    inCart: 0,
  },
  {
    name: "Apple Watch",
    price: 40000,
    tag: "Apple",
    inCart: 0,
  },
  {
    name: "Airpods",
    price: 25000,
    tag: "Airpod",
    inCart: 0,
  },
];

//tracking the click button
let carts = document.querySelectorAll(".add-cart");
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", (e) => {
    e.preventDefault();
    let btnId = carts[i].attributes.id.value;
    handleBtn(btnId, i);
    cartNumber();
  });
}

//deleting item from cart

function delItem() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let delButton = document.querySelectorAll(".remove-cart");
  for (let i = 0; i < delButton.length; i++) {
    let button = delButton[i];
    button.addEventListener("click", (event) => {
      let value =
        event?.target.parentElement.parentElement.children[1]?.innerHTML;
      let btnId = cartItems[value]?.btnId;
      handleBtn(btnId, "", value);
    });
  }
}

// handle button Click
const handleBtn = (btn, index, name) => {
  if (btn){
    let myBtn = document.getElementById(btn);
    if (myBtn.innerHTML.replace(/\s+/g, "") === "ADDTOCART") {
      setItems({ ...products[index], btnId: btn, btnName: "REMOVE FROM CART" });
      myBtn.innerHTML = "REMOVE FROM CART";
      myBtn.classList.add("rmvBtn");
    } else {
      const prdName = name ? name : products[index]?.name;
      handleDeleteItem(prdName);
      myBtn.innerHTML = "ADD TO CART";
      myBtn.classList.remove("rmvBtn");
      refreshCart();
    }
  }
  // Get the ID of the button being cliked
  
};

function cartNumber() {
  let items = JSON.parse(localStorage.getItem("productsInCart"));
  if (items != undefined) {
    let names = Object.keys(items);
    let len = names.length;
    document.querySelector(".cart-button p").textContent = len;
    localStorage.setItem("cartNumbers", JSON.stringify(len));
  }
}

// adding clicked product to the memory and updating the incart
function setItems(product) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  if (cartItems !== null) {
    if (cartItems[product.name] === undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    } else return "";
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//load the cart
let cartButton = document.querySelector(".cart-button");
let contents = document.querySelector("contents");
cartButton.addEventListener("click", displayCart);

//empty the cart
document.getElementById("continue").addEventListener("click", emptyCart());

function emptyCart() {
  let contents = document.querySelectorAll(".contents");
  if (contents) {
    for (let i = 0; i < contents.length; i++) {
      contents[i].remove();
    }
  } else {
    return;
  }
}

function refreshCart() {
  let content = document.querySelectorAll(".contents");
  if (content) {
    for (let i = 0; i < content.length; i++) {
      content[i].remove();
    }
    displayCart();
  }
}

function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let content = document.getElementById("table");
  emptyCart();
  if (cartItems) {
    Object.values(cartItems).map((item, index) => {
      content.innerHTML += `
        <tr class="contents" id="content">
        <td>${(index += 1)}</td>
        <td class="item-name">${item.name}</td>
        <td class="item-price">#${item.price}</td>
        <td>
        <button class="minus"> - </button>
        <input type="text" id="quantity"  class="item-quantity" value=${item.inCart}>
        <button class="plus"> + </button>
        </td>
        <td><button class="remove-cart">Remove</button></td>
        </tr>
        `;
    });
  }
  increaseCount();
  decreaseCount();
  delItem();
  updateTotal();
  checkOut();
}

// update the item total
function updateTotal() {
  let contents = document.querySelectorAll(".contents");
  let total = 0;

  for (let i = 0; i < contents.length; i++) {
    let content = contents[i];
    let price = content.querySelector(".item-price").innerHTML;
    price = parseInt(price.slice(1, price.length));
    let quantity = content.querySelector(".item-quantity").value;
    total = total + price * quantity;
  }

  let Total = document.querySelector(".total-cost");
  Total.innerHTML = total;
  localStorage.setItem("totalCost", JSON.stringify(total));
}

function handleDeleteItem(value) {
  let counter = JSON.parse(localStorage.getItem("cartNumbers"));
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  const items = Object.keys(cartItems);
  for (let j = 0; j < items.length; j++) {
    if (value === items[j]) {
      delete cartItems[value];
      counter = counter - 1;
      counter = JSON.stringify(counter);
      localStorage.setItem("cartNumbers", counter);
      cartItems = JSON.stringify(cartItems);
      localStorage.setItem("productsInCart", cartItems);
      updateTotal();
      cartNumber();
    }
  }
}
//increase count

function increaseCount() {
  let incrementCount = document.querySelectorAll(".plus");
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  for (let i = 0; i < incrementCount.length; i++) {
    let button = incrementCount[i];
    button.addEventListener("click", (event) => {
      let buttonClicked = event.target;
      let count = parseInt(buttonClicked.parentElement.children[1].value);
      let name =
        buttonClicked.parentElement.parentElement.children[1].innerHTML;
      count += 1;
      buttonClicked.parentElement.children[1].value = count;
      cartItems[name].inCart += 1;
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      updateTotal();
    });
  }
}

//decrease count

function decreaseCount() {
  let incrementCount = document.querySelectorAll(".minus");
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  for (let i = 0; i < incrementCount.length; i++) {
    let button = incrementCount[i];
    button.addEventListener("click", (event) => {
      let buttonClicked = event.target;
      let count = parseInt(buttonClicked.parentElement.children[1].value);
      let name =
        buttonClicked.parentElement.parentElement.children[1].innerHTML;
      if (count == 1) {
        alert(
          "quantity cannot be less than 1, if you wish to remove click remove"
        );
      } else {
        count -= 1;
        buttonClicked.parentElement.children[1].value = count;
        cartItems[name].inCart -= 1;
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        updateTotal();
      }
    });
  }
}

function checkOut() {
  let checked = document.querySelector(".checkout-button");

  checked.addEventListener("click", (e) => {
    e.preventDefault();
    checkProduct();
  });
}

function checkProduct() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phoneNumber = document.getElementById("phone").value.trim();
  let items = document.getElementById("content");

  if (name == "") {
    document.getElementById("name-error").innerHTML =
      "Please input your phone number";
    document.getElementById("name-error").style.visibility = "visible";
    document.getElementById("name").style.borderColor = "red";
  } else if (email == "") {
    document.getElementById("email-error").innerHTML =
      "Please input your email ";
    document.getElementById("email-error").style.visibility = "visible";
    document.getElementById("email").style.borderColor = "red";
  } else if (phoneNumber == "") {
    document.getElementById("phone-error").innerHTML =
      "Please input your phone number";
    document.getElementById("phone-error").style.visibility = "visible";
    document.getElementById("phone").style.borderColor = "red";
  } else if (items == null) {
    alert("Cart items cannot be empty");
  } else {
    // document.getElementById("summary").style.display = "flex";
    // document.getElementById("summary2").style.display = "none";
    payWithPaystack();
  }
}
// product summary

function productSummary() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let content = document.querySelector("#summary-details");
  document.querySelector(".summary-section").style.display = "flex";
  document.querySelector(".bg-modal").style.display = "none";
  let customerName = document.querySelector("#name").value;
  document.querySelector(".customer-name").innerHTML = customerName;

  if (cartItems) {
    Object.values(cartItems).map((item, index) => {
      content.innerHTML += `
        <tr class="contents" id="content">
        <td>${(index += 1)}</td>
        <td class="item-name">${item.name}</td>
        <td class ="quantity">${item.inCart}</td>
        <td>
        </tr>
        `;
    });
  }
  document.querySelector(".ok-button").addEventListener("click", () => {
    document.querySelector(".summary-section").style.display = "none";
    localStorage.clear();
    window.location.reload();
  });
}

//paystack page

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: "pk_test_0cf400c602268d06bbba26454b61c1a4f858f698", // Replace with your public key
    email: document.getElementById("email").value,
    amount: document.getElementById("total").innerHTML * 100,
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      // let message = 'Payment complete! Reference: ' + response.reference;
      // alert(message);
      productSummary();
    },
  });
  handler.openIframe();
}

cartNumber();
