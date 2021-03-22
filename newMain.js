// Update Button State
document.addEventListener("DOMContentLoaded", function (event) {
    const btnNames = JSON.parse(localStorage.getItem("btnArray"));

    // Check if button array is not empty and update button state
    if (btnNames?.length > 0)
      btnNames.map((btnName) => {
        const { name, btnId } = btnName;
        document.getElementById(btnId).innerHTML = name;
      });
  });



// Display the modal
document.getElementById('cart').addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector('.bg-modal').style.display='flex';
    document.body.style.position='fixed';
    
});

// Continue shopping
document.getElementById('continue').addEventListener('click', function(){
    document.getElementById('modal').style.display='none';
    document.body.style.position='relative';
});

// input validation
document.getElementById('phone').addEventListener('focusout', phoneValidate);
document.getElementById('name').addEventListener('focusout', nameValidate);
document.getElementById('email').addEventListener('focusout', emailValidate);

//Check name input
function nameValidate(){
    let name = (document.getElementById('name').value).trim()
    var numbers = /[0-9]+/;
    if ( name== ''){
        document.getElementById('name-error').innerHTML='Please input your name';
        document.getElementById('name-error').style.visibility= 'visible';
        document.getElementById('name').style.borderColor='red';
    }else if(name.match(numbers)){
        document.getElementById('name-error').innerHTML='Please check your input';
        document.getElementById('name-error').style.visibility= 'visible';
        document.getElementById('name').style.borderColor='red';
    }else if(name.length < 3){
        document.getElementById('name-error').innerHTML='Name cannot be less than three digit';
        document.getElementById('name-error').style.visibility= 'visible';
        document.getElementById('name').style.borderColor='red';
    }
    else{
        document.getElementById('name').style.borderColor='green';
        document.getElementById('name-error').style.visibility= 'hidden';
    }
}

// Check email input
function emailValidate(){
    let email = (document.getElementById('email').value).trim()
    if ( email== ''){
        document.getElementById('email-error').innerHTML='Please input your email';
        document.getElementById('email-error').style.visibility= 'visible';
        document.getElementById('email').style.borderColor='red';

    }else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false){
        document.getElementById('email-error').innerHTML='Please input a valid email address';
        document.getElementById('email-error').style.visibility= 'visible';
        document.getElementById('email').style.borderColor='red';

    }
    else{
        document.getElementById('email').style.borderColor='green';
        document.getElementById('email-error').style.visibility= 'hidden';
    
    }
}


// Check phone-number input
function phoneValidate(){
    let phoneNumber = (document.getElementById('phone').value).trim();
    // console.log(typeof(phoneNumber));
    // var numbers = /^[0-9]+$/;
    let letter = /[A-Za-z]+/
    if ( phoneNumber== ''){
        document.getElementById('phone-error').innerHTML='Please input your phone number';
        document.getElementById('phone-error').style.visibility= 'visible';
        document.getElementById('phone').style.borderColor='red';

    }else if (phoneNumber.match(letter)){
        document.getElementById('phone-error').innerHTML='Please input a correct phone number';
        document.getElementById('phone-error').style.visibility= 'visible';
        document.getElementById('email').style.borderColor='red';
 
    }else if(phoneNumber.length < 11){
        document.getElementById('phone-error').innerHTML='Phone Number cannot be less than 11';
        document.getElementById('phone-error').style.visibility= 'visible';
        document.getElementById('email').style.borderColor='red';

    }
    else{
        document.getElementById('phone').style.borderColor='green';
        document.getElementById('phone-error').style.visibility= 'hidden';
    }
}


//list of display products
let products=[
    {
        name:'Samsung Tv',
        price: 50000,
        tag: 'Samsungtv',
        inCart: 0
    },
    {
        name:'Pixel 4a',
        price: 45000,
        tag: 'pixel',
        inCart: 0
    },
    {
        name:'Ps5',
        price: 65000,
        tag: 'Ps5',
        inCart: 0
    },
    {
        name:'Macbook Air',
        price: 95000,
        tag: 'Macbook',
        inCart: 0
    },
    {
        name:'Apple Watch',
        price: 40000,
        tag: 'Apple',
        inCart: 0
    },
    {
        name:'Airpods',
        price: 25000, 
        tag: 'Airpod',
        inCart: 0
    }
];




//tracking the click button 

let carts = document.querySelectorAll('.add-cart'); 
for (let i=0; i<carts.length; i++){                 
    carts[i].addEventListener('click',(e)=>{  
        e.preventDefault(); 
        let btnId = carts[i].attributes.id.value; 
        handleBtn(btnId, carts[i],products[i])
        cartNumber();
      
               
    });
} 



function cartNumber(){
    let items = JSON.parse(localStorage.getItem('productsInCart'));
    if (items != undefined){
        let names = Object.keys(items);
        let len = names.length
        // console.log(names.length);
        document.querySelector('.cart-button p').textContent = len;
        localStorage.setItem('cartNumbers', JSON.stringify(len));
    }
    
}

// adding clicked product to the memory and updating the incart  
function setItems(product){

    let cartItems= JSON.parse(localStorage.getItem('productsInCart'));  
 

    if (cartItems !== null){            
        if ((cartItems[product.name]) === undefined){    
            cartItems = {                       
                ...cartItems,
                [product.name]: product
            }

            
        }else{
            return;
        }
        cartItems[product.name].inCart += 1;     
    }else{
        product.inCart = 1;                 
    
        cartItems = {
            [product.name]: product 
        }
            
    
    }
   
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


// handle button Click
const handleBtn = (btn, cart, product) => {
    // Get the ID of the button being cliked
    let myBtn = document.getElementById(btn);

    if (myBtn.innerHTML.replace(/\s+/g, "") === "ADDTOCART") {
        setItems(product)
      myBtn.innerHTML = "REMOVE FROM CART";
      
      handleStorageUpdate({ btnId: btn, name: "REMOVE FROM CART" });
    } else {
        deleteFromOutside(cart);
        myBtn.innerHTML = "ADD TO CART";
        handleStorageUpdate({ btnId: btn, name: "ADD TO CART" });
    }
  };


//Handle delete from Outside the cart
function deleteFromOutside(product){
    let itemInCart = JSON.parse(localStorage.getItem('productsInCart'));
    let buttonProductName= product.parentElement.parentElement.children[1].innerHTML;
    buttonProductName = buttonProductName.replace(' ', '');
    let keys = Object.keys(itemInCart);
    for (i = 0; i < keys.length; i++){
       let localName = (itemInCart[keys[i]].name)
       localName = localName.toLowerCase();
       localName = localName.replace(' ','');
       buttonProductName = buttonProductName.toLowerCase();
      if (localName === buttonProductName){
        delete (itemInCart[keys[i]]);
        localStorage.setItem('productsInCart',JSON.stringify(itemInCart));

      }
       
    }
}



// Handle Butoon mutatio
const handleStorageUpdate = (newBtn) => {
    const arrayExist = JSON.parse(localStorage.getItem("btnArray"));

    if (arrayExist) {
      // this means we already have an array of button in the local storage
      const newBtnArray = [...arrayExist];
      const index = arrayExist.findIndex(
        (btn) => btn?.btnId === newBtn.btnId
      );

      if (index !== -1) {
        // that means the button already exist in the array....all you need to do is to replace it
        newBtnArray[index] = newBtn;
        localStorage.setItem("btnArray", JSON.stringify(newBtnArray));
      } else {
        // Just add the new button to the array
        newBtnArray.push(newBtn);
        localStorage.setItem("btnArray", JSON.stringify(newBtnArray));
      }
    } else {
      // this means there is no existing array of button in the localstorage....so create a new one
      const newBtnArray = [newBtn];
      localStorage.setItem("btnArray", JSON.stringify(newBtnArray));
    }
  };

//load the cart
let cartButton =document.querySelector('.cart-button');
let contents = document.querySelector('contents');
cartButton.addEventListener('click', displayCart);

//empty the cart
document.getElementById('continue').addEventListener('click',()=>{
    let contents = document.querySelectorAll('.contents');
    
    if (contents){
        for (let i = 0; i < contents.length;i++){
            contents[i].remove();
        }
    }
    else{
        return
    }
})


function displayCart(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let content = document.getElementById('table');
    
    if (cartItems){
        Object.values(cartItems).map((item, index)=>{
        content.innerHTML += `
        <tr class="contents" id="content">
        <td>${index += 1}</td>
        <td class="item-name">${item.name}</td>
        <td class="item-price">#${item.price}</td>
        <td>
        <button class="minus"> - </button>
        <input type="text"   class="item-quantity" value=${item.inCart}>
        <button class="plus"> + </button>
        </td>
        <td><button class="remove-cart" )'>Remove</button></td>
        </tr>
        `
        
       });

       

    }
    increaseCount();
    decreaseCount();
    delItem();
    updateTotal();
    checkOut();
    
    
    

}


// update the item total

function updateTotal(){
    
   let contents = document.querySelectorAll('.contents');
   let total = 0;
   
    for (let i = 0; i < contents.length; i++){
        let content = contents[i];
        let price = content.querySelector('.item-price').innerHTML;
        price = parseInt(price.slice(1,price.length));
        let quantity = content.querySelector('.item-quantity').value;
        total = total +(price * quantity);
    }
   
   
   let Total = document.querySelector('.total-cost');
   Total.innerHTML = total;
   localStorage.setItem('totalCost', JSON.stringify(total));
}






//deleting item from cart


function delItem(){
        let delButton = document.querySelectorAll('.remove-cart');
        // let addToCart = document.querySelectorAll('.add-cart');
            for (let i = 0; i < delButton.length; i++){
            let button = delButton[i];
            button.addEventListener('click', (event)=>{
                let counter = JSON.parse(localStorage.getItem('cartNumbers'));
                let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
                let input = event.target.parentElement.parentElement.children[1];//.remove()
                let inputValue = input.innerHTML;
                // console.log(inputValue);
                items = Object.keys(cartItems);
                for (let j = 0; j<items.length; j++){
                    if (inputValue === items[j]){
                        delete(cartItems[inputValue]);
                        let remItem = event.target.parentElement.parentElement;
                        remItem.remove();
                        counter = counter -1;
                        counter = JSON.stringify(counter);
                        localStorage.setItem('cartNumbers', counter)
                        cartItems = JSON.stringify(cartItems);
                        localStorage.setItem('productsInCart', cartItems);

            updateTotal();
            cartNumber();
            changeButton(event);
            
            
        }
    }
            });

        
        
    }
    
}



function changeButton(event){
    let homeButton = document.querySelectorAll('.item-name');
    let cartButton = event.target.parentElement.parentElement.children[1].innerHTML;
    for (i = 0; i < homeButton.length; i++){
        let newHomeButton = homeButton[i].innerHTML;
        newHomeButton = newHomeButton.toLowerCase();
        newHomeButton = newHomeButton.replace(' ','')
        cartButton = cartButton.toLowerCase();
        cartButton = cartButton.replace(' ', '');

        if (newHomeButton === cartButton){
            let buttonClicked = homeButton[i].parentElement.children[2].children[0];
            let buttonId = buttonClicked.attributes.id.value;
            buttonClicked.innerHTML = "ADD TO CART";
            handleStorageUpdate({ btnId: buttonId, name: "ADD TO CART" });
        }
    }
    
}

//increase count

function increaseCount(){   
    let incrementCount = document.querySelectorAll('.plus');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    for (let i = 0; i < incrementCount.length; i++){
        let button = incrementCount[i];
        button.addEventListener('click',(event)=>{
            let buttonClicked = event.target;
            let count = parseInt(buttonClicked.parentElement.children[1].value);
            let name = buttonClicked.parentElement.parentElement.children[1].innerHTML;
            count += 1;
            buttonClicked.parentElement.children[1].value = count;
            cartItems[name].inCart += 1;
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            updateTotal();
        })
    
    
    }  
    
    
}
    

//decrease count

function decreaseCount(){   
    let incrementCount = document.querySelectorAll('.minus');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    for (let i = 0; i < incrementCount.length; i++){
        let button = incrementCount[i];
        button.addEventListener('click',(event)=>{
            let buttonClicked = event.target;
            let count = parseInt(buttonClicked.parentElement.children[1].value);
            let name = buttonClicked.parentElement.parentElement.children[1].innerHTML;
            if (count == 1){
                alert('quantity cannot be less than 1, if you wish to remove click remove');
            }else{
            count -= 1;
            buttonClicked.parentElement.children[1].value = count;
            cartItems[name].inCart -= 1;
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            updateTotal();
            }
            
        })
    
    
    }  
    
    
}




function checkOut(){
    let checked = document.querySelector('.checkout-button');
    
    
    checked.addEventListener('click',(e)=>{
        e.preventDefault();
        checkProduct();
           
    });

        
    }
    


function checkProduct(){
    let name = (document.getElementById('name').value).trim();
    let email = (document.getElementById('email').value).trim();
    let phoneNumber = (document.getElementById('phone').value).trim();
    let items = document.getElementById('content');

    if (name == ''){
        document.getElementById('name-error').innerHTML='Please input your phone number';
        document.getElementById('name-error').style.visibility= 'visible';
        document.getElementById('name').style.borderColor='red';
    }else if(email == ''){
        document.getElementById('email-error').innerHTML='Please input your email ';
        document.getElementById('email-error').style.visibility= 'visible';
        document.getElementById('email').style.borderColor='red';
    }else if(phoneNumber == ''){
        document.getElementById('phone-error').innerHTML='Please input your phone number';
        document.getElementById('phone-error').style.visibility= 'visible';
        document.getElementById('phone').style.borderColor='red';
    }else if (items == null){
        alert('Cart items cannot be empty');
    }
    else{
        document.querySelector('.summary-section').style.display='flex';
        document.getElementById('summary').style.display='none';
        payWithPaystack();
    }
    
}
// product summary 

function productSummary(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let content = document.querySelector('#summary-details');
    document.querySelector('.summary-section').style.display='flex';
    document.querySelector('.bg-modal').style.display='none';
    let customerName = document.querySelector('#name').value;
    document.querySelector('.customer-name').innerHTML= customerName;

    if (cartItems){
        Object.values(cartItems).map((item, index)=>{
        content.innerHTML += `
        <tr class="contents" id="content">
        <td>${index += 1}</td>
        <td class="item-name">${item.name}</td>
        <td class ="quantity">${item.inCart}</td>
        <td>
        </tr>
        `
        });

    }
    document.querySelector('.ok-button').addEventListener('click', ()=>{
        document.querySelector('.summary-section').style.display='none';
        localStorage.clear();
        window.location.reload();
    });
    
}



//paystack page

function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: 'pk_test_0cf400c602268d06bbba26454b61c1a4f858f698', // Replace with your public key
      email: document.getElementById("email").value,
      amount: document.getElementById("total").innerHTML*100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        // let message = 'Payment complete! Reference: ' + response.reference;
        // alert(message);
        productSummary();
      }
    });
    handler.openIframe();
  }


cartNumber();
