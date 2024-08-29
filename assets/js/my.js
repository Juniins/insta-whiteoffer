
$(document).ready(() => {
  
  //$('#pop-up').hide();
    
  let nomes = ['Carlos', 'Joel', 'Ricardo', 'Pedro', 'José', 'Cleber', 'Diego', 'Bruno', 'Victoria', 'Camylle', 'Sabrina','Martin', 'Michele', 'Felipe', 'Ernesto'];
  
  //let products = ['Water Bottle', 'T-Shirt', 'Beanie', 'Sweater', 'Baseball Cap', 'Poster'];
  
  setInterval(() => {
    
    let pessoas = nomes[Math.floor(Math.random() * nomes.length)];
    //let purchase = products[Math.floor(Math.random() * products.length)];
    
    $('#pessoas').text(pessoas);
    //$('#product').text(purchase);
    
    $('#pop-up').fadeIn().delay(4000).fadeOut();
  }, 8000);


});
