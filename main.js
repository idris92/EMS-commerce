
// Display the modal
document.getElementById('cart').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display='flex';
    document.body.style.position='fixed';
});

// Continue shopping
document.querySelector('.continue-shopping').addEventListener('click', function(){
    document.querySelector('.bg-modal').style.display='none';
});