
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

//Check name input
function nameValidate(){
    let name = document.getElementById('name')
    if ( name.value== ''){
        document.getElementById('name-error').innerHTML='Please input your name';
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
    let name = document.getElementById('email')
    if ( name.value== ''){
        document.getElementById('email-error').innerHTML='Please input your email';
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
    let name = document.getElementById('phone')
    if ( name.value== ''){
        document.getElementById('phone-error').innerHTML='Please input your phone number';
        document.getElementById('phone-error').style.visibility= 'visible';
        document.getElementById('phone').style.borderColor='red';
    }
    else{
        document.getElementById('phone').style.borderColor='green';
        document.getElementById('phone-error').style.visibility= 'hidden';
    
    }
}


//list of display products
let products=[
    {
        name:'Samsung',
        price: 500000,
        tag: 'Samsungtv',
        inCart: 0
    },
    {
        name:'Pixel',
        price: 450000,
        tag: 'pixel',
        inCart: 0
    },
    {
        name:'Ps5',
        price: 650000,
        tag: 'Ps5',
        inCart: 0
    },
    {
        name:'Macbook',
        price: 950000,
        tag: 'Macbook',
        inCart: 0
    },
    {
        name:'Apple watch',
        price: 400000,
        tag: 'Apple',
        inCart: 0
    },
    {
        name:'Airpod',
        price: 250000, 
        tag: 'Airpod',
        inCart: 0
    }
];




//
let carts = document.querySelectorAll('.add-cart'); 
for (let i=0; i<carts.length; i++){                 
    carts[i].addEventListener('click',(e)=>{   
        e.preventDefault();
        cartNumbers(products[i])  
       
                   
    });
} 

//onloadcartNumber this update the cart number after refresh

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart-button p').textContent=productNumbers;
    }
}

//checking the number of item in storage and updating it
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers'); 
    productNumbers = parseInt(productNumbers); 
    
    if (productNumbers){                        
        localStorage.setItem('cartNumbers',productNumbers+1); 
        document.querySelector('.cart-button p').textContent=productNumbers+1; 
    }
    else{                                      
        localStorage.setItem('cartNumbers',1);  
        document.querySelector('.cart-button p').textContent=1; 
    }
    setItems(product);         
    
    
}


// adding clicked product to the memory and updating the incart  
function setItems(product){

    let cartItems= JSON.parse(localStorage.getItem('productsInCart'));  
    let carts = document.querySelectorAll('.add-cart'); 
 

    if (cartItems != null){            
        if ((cartItems[product.name]) == undefined){    
            cartItems = {                       
                ...cartItems,
                [product.name]: product 
            }
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


//caalculating total cost
// function totalCost(product){
//     let cartCost = localStorage.getItem('totalCost');


//     if (cartCost != null){
//         cartCost = parseInt(cartCost);
//         localStorage.setItem('totalCost',cartCost + product.price);

//     }else{

//         localStorage.setItem('totalCost', product.price);
    
//     }

    
// }
function displayCart(){
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        let content = document.getElementById('table');
        // let totalCost = localStorage.getItem('totalCost');   
        
        
        if (cartItems){
           Object.values(cartItems).map((item, index)=>{
            content.innerHTML += `
            <tr class="contents" id="content">
            <td>${index += 1}</td>
            <td class="item-name">${item.name}</td>
            <td class="item-price">#${item.price}</td>
            <td>
            <button class="minus"> - </button>
            <input type="text" id="quantity"  class="item-quantity" value=${item.inCart}>
            <button class="plus"> + </button>
            </td>
            <td><button class="remove-cart">Remove</button></td>
            </tr>
            `
            // delete task
            
           });

        // //    total cost of product
        //    let totalCost = document.querySelector('.total-cost');
        //    totalCost.innerHTML= `#${totalCost1}`;

        

    


        }

        
        // load delete item when modal display

         delItem();  

         //update total
         updateTotal();
        
        
        

}
    

function delItem(){
    let delButton = document.querySelectorAll('.remove-cart');
    let counter = JSON.parse(localStorage.getItem('cartNumbers'));
    
           for (let i = 0; i < delButton.length; i++){
            let button = delButton[i];
            button.addEventListener('click',(event)=>{
                event.preventDefault();
                let input=event.target.parentElement.parentElement.children[1];//.remove()
                
                let inputValue = input.innerHTML;
                let cartItems = localStorage.getItem('productsInCart');
                cartItems = JSON.parse(cartItems);
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
                   
                    
                        
                    }
                }
                
            })
            };

        updateTotal();
}


function updateTotal(){
    // let cost = JSON.parse(localStorage.getItem('totalCost'));
    // let cost1 = event.target.parentElement.parentElement.children[2].innerHTML
    // cost1 = cost1.slice(1,cost1.length)
    // cost = cost - cost1;
    // cost = JSON.stringify(cost)
    // localStorage.setItem('totalCost', cost);
    // let Total = document.querySelector('.total-cost');
    // Total.innerHTML = cost;
    
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

function increaseCount(){   
        let incrementCount = document.querySelectorAll('.plus');
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
        for (let i = 0; i < incrementCount.length; i++){
            let button = incrementCount[i];
            button.addEventListener('click',(event)=>{
                let buttonClicked = event.target;
                let name = buttonClicked.parentElement.parentElement.children[1].innerHTML;
                cartItems[name].inCart += 1;
                cartItems =JSON.stringify(cartItems);
                localStorage.setItem('productsInCart', cartItems);
                // window.location.reload();
            })
        
       
        }  
        
        
}


function decreaseCount(){   
    let incrementCount = document.querySelectorAll('.minus');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    for (let i = 0; i < incrementCount.length; i++){
        let button = incrementCount[i];
        button.addEventListener('click',(event)=>{
            let buttonClicked = event.target;
            let name = buttonClicked.parentElement.parentElement.children[1].innerHTML;
            let input = parseInt(buttonClicked.parentElement.children[1].value);
            if (input == 1){
                alert('quantity cannot be less than 1, if you wish to remove click remove');
            }else{
                cartItems[name].inCart -= 1;
                cartItems =JSON.stringify(cartItems);
                localStorage.setItem('productsInCart', cartItems);
                
            }
            // window.location.reload();
          
        });

}

}

// function updatingTotal(){
//     let price = document.querySelectorAll('.item-price');
//     let total = 0;
//     for (let i = 0; i < price.length; i++ ){
//         let pricing = price[i].innerHTML;
//         pricing = parseInt(pricing.slice(1, pricing.length))
//         total += pricing
        
//     }
//     localStorage.setItem('totalCost',JSON.stringify(total));
    
// }



displayCart() 
updateTotal();
// onLoadCartNumbers();
// displayCart();
// increaseCount();
// decreaseCount();
// updateTotal();
// cartNumbers();
// updatingTotal();