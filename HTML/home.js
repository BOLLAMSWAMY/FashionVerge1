let dataRequest = new XMLHttpRequest();
dataRequest.open("GET", "data.json");
dataRequest.onloadstart = ()=>{
  let items = document.getElementById("items");
  items.style.width = '100vw';
  items.style.height = '100vh';
  items.innerHTML = '<h1>Data is Loading.........</h1>';
}

dataRequest.onloadend = () => {
  let data = JSON.parse(dataRequest.response);
  let items = document.getElementById("items");
  items.style.width = '93%'
  items.style.height = '100%'
  items.classList.add('justify-content-between')
  items.classList.remove('align-items-center')
items.innerHTML = ''
  for (let i = 0; i < data.length; i++) {
    let imgUrl = data[i].thumbnail;
    let imgTitle = data[i].title;
    let prodPrice = data[i].price;
    let prodRating = data[i].rating;
    let prodCount = data[i].stock;
    let items = document.getElementById("items");
    
    items.innerHTML += `<div id='itemFetch' onclick=handleModalParent(${i}) class="item border p-4 pb-0 m-2 shadow d-flex flex-column justify-content-around rounded" style="width: 22%;">
        <div class="item-img" style="height:150px;">
            <img src=${imgUrl} class="" alt="" style="object-fit: contain; width:100%;height:100%">
        </div>
        <hr/>
        <div class="item-desc">
            <h5>${imgTitle}</h5>
            <span style="margin-top:20px">$${prodPrice}</span>
            <p class="d-flex justify-content-between" style="margin-top:20px"><span class="bg-success p-1 border rounded-2 text-light">${prodRating} <i class="bi bi-star-fill"></i>
            </span><span class="p-1 bg-info-subtle border rounded-1">Available Stock : ${prodCount}</span></p>
            <button class="text-center bg-primary text-light border border-0 p-2 ps-5 pe-5 w-100 rounded-3" id="addCart${i}" onclick="addCartFun(${i})">Add to Cart</button>
            <input type="number" id="numCart${i}" value="1" style="visibility: hidden; width: 1px;">
        </div>
    </div>`;
  }
};
dataRequest.send();

function handleModalParent(id) {
  let data = JSON.parse(dataRequest.response);
  let prodDesc = document.createElement("div");
  prodDesc.setAttribute("id", "prodDesc");
  prodDesc.addEventListener("click", handleProdDesc);
  prodDesc.innerHTML = `<div id="prodDescInner" style="display: flex; justify-content: space-between; align-items: center; width: 70%; margin: auto; margin-top: 80px;background-color:  #e6e6ff; padding: 20px; border:1px solid grey; box-shadow:0px 0px 10px black">
    <div id="imgDesc" style="width:50%; height:100%; object-fit: contain;">
        <img src=${data[id].thumbnail} alt="" id='imgCar' width="500px" height="500px" style="object-fit: contain; drop-shadow:0px 0px 10px grey;" >
    </div>
    <div id="prodDescDeatils" style="width: 40%;">
    <p style="font-size:2rem; font-weight:bold;">${data[id].title}</p>
    <p style="font-size:1.1rem;">${data[id].description}</p>
    <p style="font-size:1.3rem; font-weight:bold;">$${data[id].price}</p>
    </div>
    <i class="bi bi-x" onclick="handleModal()" style="position: absolute; font-size: xx-large; top: 12%; left: 82%;"></i>
</div>`;
  document.body.appendChild(prodDesc);
  function carousel(id) {
    let imgCar = document.getElementById("imgCar");
    let curInd = 0;
    imgCar.setAttribute("src", `${data[id].images[curInd]}`);
    setInterval(() => {
      curInd++;
      if (curInd === data[id].images.length) {
        curInd = 0;
      }
      imgCar.setAttribute("src", `${data[id].images[curInd]}`);
    }, 1000);
  }
  carousel(id);
}

function handleProdDesc() {
  let prodDesc = document.getElementById("prodDesc");
  prodDesc.remove();
}
let cartCountArr = [];
let addCart = document.getElementById("addCart");
let cartCount = document.getElementById("cartCount");
let addCartFun = (id) => {
  event.stopImmediatePropagation();
  let data = JSON.parse(dataRequest.response);
  let addCart = document.getElementById(`addCart${id}`);
  let cartList = document.getElementById("cartList");
  cartList.innerHTML += `<li id="innerCart${id}" class="text-light justify-content-between align-items-center" style="display:flex;">
    <img src=${data[id].thumbnail} width="100px" alt="">
    <p class="w-25 text-dark">${data[id].title}</p>
    <p class="w-25 text-dark">$${data[id].price}</p>
    <p class="w-25 d-flex justify-content-around" ><button class='btn btn-primary ' id="decrement${id}" onclick="decrement(${id})">-</button><input type="number" class='form-control' style="width: 55px;" id="itemCount${id}" value='1' /> <button class='btn btn-primary ' id="increment${id}" onclick="increment(${id})">+</button> <button class='btn btn-danger ' onclick="removeProduct(${id})"><i class="bi bi-archive-fill"></i></button> <p id="totalPrice${id}" class="totalPri text-dark">${data[id].price}</p> </p>
    </li>`;
  let cartCount = document.getElementById("cartCount");
  let itemCount = document.getElementById(`itemCount${id}`);
  itemCount.value = 1;

  let numCart = document.getElementById(`numCart${id}`);

  if (numCart.value <= 1) {
    cartCountArr.length++;
    cartCount.innerText = cartCountArr.length;
    numCart.value++;
  } else {
    console.log("completed");
  }

  cartCount.innerText = cartCountArr.length;
  checkOutLast();

  addCart.removeAttribute("onclick");
  totalCheck(id);
};

function checkOutLast() {
  let totalPri = document.getElementsByClassName("totalPri");
  let totPri = [];
  for (let i = 0; i < totalPri.length; i++) {
    totPri[i] = Number(totalPri[i].innerText);
  }
  let checkout = document.getElementById("checkout");
  if (totPri.length > 0) {
    checkout.style.display = "flex";
  } else {
    checkout.style.display = "flex";
  }
  let checkoutPrice = document.getElementById("checkoutPrice");
  let fullCheckout = 0;
  for (let i of totPri) {
    fullCheckout += Number(i);
    checkoutPrice.innerText = `$${fullCheckout}`;
  }
}

function increment(id) {
  let data = JSON.parse(dataRequest.response);
  let itemCount = document.getElementById(`itemCount${id}`);
  let totalPrice = document.getElementById(`totalPrice${id}`);
  if (itemCount.value <= data[id].stock) {
    itemCount.value++;
    totalPrice.innerText = `${itemCount.value * data[id].price}`;
  } else {
    alert("No Stock");
  }
  checkOutLast();
}
function decrement(id) {
  let data = JSON.parse(dataRequest.response);
  let itemCount = document.getElementById(`itemCount${id}`);
  let totalPrice = document.getElementById(`totalPrice${id}`);

  if (itemCount.value > 1) {
    itemCount.value--;
    totalPrice.innerText = itemCount.value * data[id].price;
  } else {
    let innerCart = document.getElementById(`innerCart${id}`);
    innerCart.remove();
    let cartCount = document.getElementById("cartCount");
    cartCountArr.length--;
    cartCount.innerText = cartCountArr.length;
  }
  checkOutLast();
}
function removeProduct(id) {
  let innerCart = document.getElementById(`innerCart${id}`);
  innerCart.remove();
  let cartCount = document.getElementById("cartCount");
  cartCountArr.length--;
  cartCount.innerText = cartCountArr.length;
  checkOutLast();
}
let checkoutPrice = document.getElementById("checkoutPrice");
function checkout() {
  checkoutPrice.innerHTML += 2;
}
checkout();
function totalCheck() {
  let totalPri = document.getElementsByClassName("totalPri");
}
