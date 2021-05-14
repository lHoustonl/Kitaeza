// drag header up and show side logo on scroll down effect
try{
    var prevScrollpos = window.pageYOffset;
    function movment(){  window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos && currentScrollPos < 20) {
          document.querySelector('.header').classList.remove('hide-header');
          document.querySelector('.img-logo3').style.opacity = '0%';
        } else if (prevScrollpos < currentScrollPos && currentScrollPos > 20){
          document.querySelector('.header').classList.add('hide-header');
          document.querySelector('.img-logo3').style.opacity = '100%';
        }
        prevScrollpos = currentScrollPos;
      }}
  } catch(err) {console.log(err);}
  
  movment();
  
  // move all down once toggler open
  btn = document.querySelector('.navbar-toggler');
  section3 = document.querySelector('.container2');
  contents1 = document.querySelector('.contents1');
  btn.addEventListener('click', ()=>{
    if (btn.ariaExpanded == "false"){
      section3.classList.add('shift');
      contents1.classList.add('shift');
      window.onscroll = function(){ window.scrollTo(0, 0); }  
    } else {
      section3.classList.remove('shift');
      contents1.classList.remove('shift');
      movment(); 
   }
  })
  
  try {
    // add items from img folder for trending section
  trendingList = document.querySelector('.trending-items-list');
  sourceToImgsFile = 'static/items/';
  ITEMS_NAMES = ['деталь 1', 'деталь 2', 'деталь 3', 'деталь 4', 'деталь 5', 'деталь 6', 'деталь 7', 'деталь 8', 'деталь 9', 'деталь 10'];
  PRICES = [55, 40, 70, 90, 10, 45, 60, 30, 70 ,100];
  
  for (i=0; i<10; i++){
    // availability basket div
    // availabilityBasket = document.createElement('div');
    // availabilityBasket.className = 'item-availability-basket';
    // itemAvailability = document.createElement('p');
    // itemAvailability.innerHTML = '• в наличии';
    // itemAvailability.className = 'item-availability';
    // itemBasketLink = document.createElement('a');
    // itemBasketLink.href = '/addToBasket';
    // itemBasket = document.createElement('p');
    // itemBasket.innerHTML = 'Добавить в корзину';
    // itemBasket.className = 'item-basket';
    // itemBasketLink.appendChild(itemBasket);
    // availabilityBasket.appendChild(itemAvailability);
    // availabilityBasket.appendChild(itemBasketLink)
    // img div
      img = document.createElement('img');
      img.src = sourceToImgsFile + 'item' + i + ".jpg";
      img.className = 'items-img';
    // price name div
      namePrice = document.createElement('div');
      namePrice.className = 'item-name-price';
      itemName = document.createElement('p');
      itemName.innerHTML = ITEMS_NAMES[i];
      itemName.className = 'name';
      itemPrice = document.createElement('p');
      itemPrice.innerHTML = PRICES[i] + 'руб.';
      itemPrice.className = 'price';
      namePrice.appendChild(itemName);
      namePrice.appendChild(itemPrice);
      // adding all to main div
      item = document.createElement('div');
      item.className = 'trending-item';
      // item.appendChild(availabilityBasket);
      item.appendChild(img);
      item.appendChild(namePrice);
      trendingList.appendChild(item);
  }
  // grab gear section items
  gearList = document.querySelector('.gear-items-list');
  sourceToImgsFile = 'static/items/';
  ITEMS_NAMES = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10'];
  PRICES = [55, 40, 70, 90, 10, 45, 60, 30, 70 ,100];
  
  for (i=10; i<20; i++){
      // availability basket div
      // availabilityBasket = document.createElement('div');
      // availabilityBasket.className = 'item-availability-basket';
      // itemAvailability = document.createElement('p');
      // itemAvailability.innerHTML = '• в наличии';
      // itemAvailability.className = 'item-availability';
      // itemBasketLink = document.createElement('a');
      // itemBasketLink.href = '/addToBasket';
      // itemBasket = document.createElement('p');
      // itemBasket.innerHTML = 'Добавить в корзину';
      // itemBasket.className = 'item-basket';
      // itemBasketLink.appendChild(itemBasket);
      // availabilityBasket.appendChild(itemAvailability);
      // availabilityBasket.appendChild(itemBasketLink)
    // img div
      img = document.createElement('img');
      img.src = sourceToImgsFile + 'item' + i + ".jpg";
      img.className = 'items-img';
    // price name div
      namePrice = document.createElement('div');
      namePrice.className = 'item-name-price';
      itemName = document.createElement('p');
      itemName.innerHTML = ITEMS_NAMES[i-10];
      itemName.className = 'name';
      itemPrice = document.createElement('p');
      itemPrice.innerHTML = PRICES[i-10] + '$';
      itemPrice.className = 'price';
      namePrice.appendChild(itemName);
      namePrice.appendChild(itemPrice);
      // adding all to main div
      item = document.createElement('div');
      item.className = 'gear-items';
      // item.appendChild(availabilityBasket);
      item.appendChild(img);
      item.appendChild(namePrice);
      gearList.appendChild(item);
  }
  } catch (err) {console.log(err);}

  similarList = document.querySelector('.similar-items-list');
  sourceToImgsFile = 'static/items/';
  ITEMS_NAMES = ['масло 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9', 'item 10'];
  PRICES = [55, 40, 70, 90, 10, 45, 60, 30, 70 ,100];
  
  for (i=10; i<20; i++){
      // availability basket div
      // availabilityBasket = document.createElement('div');
      // availabilityBasket.className = 'item-availability-basket';
      // itemAvailability = document.createElement('p');
      // itemAvailability.innerHTML = '• в наличии';
      // itemAvailability.className = 'item-availability';
      // itemBasketLink = document.createElement('a');
      // itemBasketLink.href = '/addToBasket';
      // itemBasket = document.createElement('p');
      // itemBasket.innerHTML = 'Добавить в корзину';
      // itemBasket.className = 'item-basket';
      // itemBasketLink.appendChild(itemBasket);
      // availabilityBasket.appendChild(itemAvailability);
      // availabilityBasket.appendChild(itemBasketLink)
    // img div
      img = document.createElement('img');
      img.src = sourceToImgsFile + 'item' + i + ".jpg";
      img.className = 'items-img';
    // price name div
      namePrice = document.createElement('div');
      namePrice.className = 'item-name-price';
      itemName = document.createElement('p');
      itemName.innerHTML = ITEMS_NAMES[i-10];
      itemName.className = 'name';
      itemPrice = document.createElement('p');
      itemPrice.innerHTML = PRICES[i-10] + '$';
      itemPrice.className = 'price';
      namePrice.appendChild(itemName);
      namePrice.appendChild(itemPrice);
      // adding all to main div
      item = document.createElement('div');
      item.className = 'similar-item';
      // item.appendChild(availabilityBasket);
      item.appendChild(img);
      item.appendChild(namePrice);
      similarList.appendChild(item);
  }
  
  function addBlur(){
    $('.container2').children().addClass('blurr');
    $('.contents1').children().addClass('blurr');
  }
  function removeBlur(){
    $('.container2').children().removeClass('blurr');
    $('.contents1').children().removeClass('blurr');
  }
  // menu drop down effect
  if (window.innerWidth > 1010){
    $('#newReleases').on('mouseenter', function(){
      $('[class*=drop-list]').css('display', 'none');
      $('.drop-list-new-releases').css('display', 'flex');
      addBlur();
    });
  
    $('.section2').on('mouseleave', function(){
      $('.drop-list-new-releases').css('display', 'none');
      removeBlur();
    });
  
    $('#men').on('mouseenter', function(){
      $('[class*=drop-list]').css('display', 'none');
      $('.drop-list-men').css('display', 'flex');
      addBlur();
    });
  
    $('.section2').on('mouseleave', function(){
      $('.drop-list-men').css('display', 'none');
      removeBlur();
    });
   
  }

  try{
    var summ = 0;
    $('.summ').each(function(){
      summ += parseInt($(this).text())
    })
    $('.totalSumm').html(summ + " ₽")
  }
  catch (err) {console.log(err);}

  // btn = document.querySelector('.toggler');
  // priceRange = document.querySelector('.price-range');
  // filterPrice = document.querySelector('.filter-price');
  // btn.addEventListener('click', ()=>{
  //   if (btn.ariaExpanded == "false"){
  //     priceRange.classList.remove('collapsed');
  //     filterPrice.classList.remove('height-of-div');
  //     btn.ariaExpanded = "true";
  //   } else {
  //     priceRange.classList.add('collapsed');
  //     filterPrice.classList.add('height-of-div');
  //     btn.ariaExpanded = "false";
  //  }
  // })

  // btn = document.querySelector('.toggler');
  // priceRange = document.querySelector('.price-range');
  // filterPrice = document.querySelector('.filter-price');
  // btn.addEventListener('click', ()=>{
  //   if (btn.ariaExpanded == "false"){
  //     priceRange.classList.remove('collapsed');
  //     filterPrice.classList.remove('height-of-div');
  //     btn.ariaExpanded = "true";
  //   } else {
  //     priceRange.classList.add('collapsed');
  //     filterPrice.classList.add('height-of-div');
  //     btn.ariaExpanded = "false";
  //  }
  // })