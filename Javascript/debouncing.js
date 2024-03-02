let searchProducts = document.getElementById("searchProducts");
let debounceProd = document.getElementById("debounceProd");
searchProducts.onfocus = (e) => {
  let debounceProd = document.getElementById("debounceProd");
  debounceProd.classList.toggle("d-none");
  return getProducts();
};

searchProducts.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    return getProducts();
  } else if (searchProducts.value == "") {
    return getProducts();
  }
});
searchProducts.onkeypress = getProducts;
let timer;
function getProducts() {
  clearInterval(timer);
  timer = setTimeout(getProd, 1000);
  debounceProd.innerHTML = "";
}
function getProd() {
  fetch("../Javascript/data.json")
    .then((response) => response.json())
    .then((data) => {
      let debounceProd = document.getElementById("debounceProd");
      data.map((ele, index) => {
        if (
          searchProducts.value ==
          ele.category.slice(0, searchProducts.value.length)
        ) {
          debounceProd.innerHTML += `<li id='listItem${index}' onclick='addItem(${index})' class="justify-content-between align-items-center border p-2 rounded m-2" style='display:flex;cursor:pointer;'><img src=${ele.thumbnail} alt="products" width="50px" height='50px' style="border-radius: 50%;"> <span class="ps-3">${ele.title}</span><strong>$${ele.price}</strong></li> `;
        }
      });
    })
    .catch((err) => {
      alert(err);
    });
  debounceProd.classList.toggle("p-3");
}
function addItem(i) {
  let debounceAddItem = document.getElementById("debounceAddItem");
  debounceAddItem.style.display = "flex";
  fetch("../Javascript/data.json")
    .then((response) => response.json())
    .then((data) => {
      let debounceAddItem = document.getElementById("debounceAddItem");
      debounceAddItem.innerHTML += `<p class='deitem' id='item${i}' style="width: 160px; height: 20px; border: 1px solid; display: flex; justify-content: space-between; align-items: center; padding-right: 10px; border-radius: 25px;">
        <img src=${
          data[i].thumbnail
        } alt="product" width="10%" height="20px" style="object-fit: contain; border-radius: 50%; margin-left: 5px;">
        <span style="overflow:ellipsis;">${data[i].title.slice(0, 6)}</span>
        <span>$${data[i].price}</span>
        <i class="bi bi-x-circle-fill" onclick='handleItem(${i})'></i>
    </p>`;
      // let prodDesc = document.getElementById('prodDesc')
      let listItem = document.getElementById(`listItem${i}`);
      listItem.style.display = "none";
    })
    .catch((err) => {
      alert(err);
    });
}

// function handleModalParent(id){
//     let data = JSON.parse(dataRequest.response)
//     let prodDesc = document.createElement('div')
//     prodDesc.setAttribute('id','prodDesc')
//     prodDesc.addEventListener('click',handleProdDesc)
//     prodDesc.innerHTML=`<div id="prodDescInner" style="display: flex; justify-content: space-between; align-items: center; width: 70%; margin: auto; margin-top: 80px;background-color: rgb(43, 226, 223); padding: 20px;">
//     <div id="imgDesc" style="width:50%; object-fit: contain;">
//         <img src=${data[id].thumbnail} alt="" width="500px" height="500px" >
//     </div>
//     <div id="prodDescDeatils" style="width: 40%;">
//     <p>${data[id].title}</p>
//     <p>${data[id].description}</p>
//     <p>${data[id].price}</p>
//     </div>
//     <i class="bi bi-x" onclick="handleModal()" style="position: absolute; font-size: xx-large; top: 12%; left: 82%;"></i>
// </div>`
//     document.body.appendChild(prodDesc)

// }

function handleItem(i) {
  let deitem = document.getElementsByClassName("deitem");
  let item = document.getElementById(`item${i}`);
  item.remove();
  let listItem = document.getElementById(`listItem${i}`);
  // console.log(listItem);
  listItem.style.display = "flex";
  // console.log(listItem);
  // console.log(deitem);
  if (deitem.length == 0) {
    let debounceAddItem = document.getElementById("debounceAddItem");
    debounceAddItem.style.display = "none";
  }
}
