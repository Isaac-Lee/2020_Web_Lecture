var cartIcon = document.getElementById("cart-icon");
var submitButton = document.getElementById("submit-button");
var cancelButton = document.getElementById("cancel-button");
var regularProductList = document.getElementById("regular-product-list");
var expressProductList = document.getElementById("express-product-list");
var regularSelectAll = document.getElementById("regular-select-all");
var expressSelectAll = document.getElementById("express-select-all");
var moveToExpressBtn = document.getElementById("move-to-express");
var moveToRegularBtn = document.getElementById("move-to-regular");
var deleteSelectRegularBtn = document.getElementById("delete-selected-regular");
var deleteSelectExpressBtn = document.getElementById("delete-selected-express");
var searchBtn = document.getElementById("search-button");
var resetBtn = document.getElementById("reset-color-button");


cartIcon.addEventListener("click", showPopup);
cancelButton.addEventListener("click", closePopup);
submitButton.addEventListener("click", validate);
moveToExpressBtn.addEventListener("click", function() { moveTo('express'); });
moveToRegularBtn.addEventListener("click", function() { moveTo('regular'); });
regularSelectAll.addEventListener("click", function() { checkAll('regular'); });
expressSelectAll.addEventListener("click", function() { checkAll('express'); });
deleteSelectRegularBtn.addEventListener("click", function() { deleteSelectProduct("regular"); });
deleteSelectExpressBtn.addEventListener("click", function() { deleteSelectProduct("express"); });
searchBtn.addEventListener("click", findProduct);
resetBtn.addEventListener("click", resetHighlight);

// ******장바구니 부분을 위한 함수******
function checkAll(method) {
  var productList = document.getElementById(method+"-product-list");
  var thisBtn = document.getElementById(method+"-select-all");
  var productCount = productList.children.length;
  if (thisBtn.checked == true) {
    for (var i = 0; i < productCount; i++) {
      var checkBox = productList.children[i].children[0].firstChild;
      checkBox.checked = true;
    }
  } else {
    for (var i = 0; i < productCount; i++) {
      var checkBox = productList.children[i].children[0].firstChild;
      checkBox.checked = false;
    }
  }
  isAllCheckedIn(method);
}

function isAllCheckedIn(method) {
  var productList = document.getElementById(method+"-product-list");
  var checkedProduct = selectedProducts(productList);
  var productCount = productList.children.length;
  var checkedCount = checkedProduct.length;

  if (productCount == checkedCount && productCount != 0) {
    fillCheckbox(method);
  } else {
    unfillCheckbox(method);
  }
  calPriceSum(method, checkedProduct);
}

function selectedProducts(productList) {
  var productListCount = productList.children.length;
  var selectedIndex = new Array();
  for (var i=0; i < productListCount; i++) {
    var thisProduct = productList.children[i];
    var productCheckbox = thisProduct.firstChild.firstChild;
    if (productCheckbox.checked == true) {
      selectedIndex.push(i);
    }
  }
  return selectedIndex;
}

function calPriceSum(method, checkedProduct) {
  var productList = document.getElementById(method+"-product-list");
  var priceSum = document.getElementById(method+"-product-price");
  var checkedProductCount = checkedProduct.length;
  var total = 0;
  for (var i = 0; i < checkedProductCount; i++) {
    var index = checkedProduct.pop()
    var totalPrice = productList.children[index].children[5].firstChild.nodeValue;
    total += Number(totalPrice);
  }
  priceSum.innerText = total;
}

function fillCheckbox(method) {
  var checkbox = document.getElementById(method+'-select-all');
  checkbox.checked = true;
}

function unfillCheckbox(method) {
  var checkbox = document.getElementById(method+'-select-all');
  checkbox.checked = false;
}

function deleteSelectProduct(method) {
  var productList = document.getElementById(method+"-product-list");
  var selectedProduct = selectedProducts(productList);
  var selectedProductCount = selectedProduct.length;
  for (var i = 0; i < selectedProductCount; i++) {
    var index = selectedProduct.pop();
    var product = productList.children[index];
    productList.removeChild(product);
  }
  isAllCheckedIn('regular');
  isAllCheckedIn('express');
}

function moveTo(method) {
  if (method === 'regular') {
    var productList = expressProductList;
  } else {
    var productList = regularProductList;
  }
  var movedProduct = selectedProducts(productList);
  var movedProductCount = movedProduct.length;

  for (var i = 0; i < movedProductCount; i++) {
    var index = movedProduct.shift();
    var thisProduct = productList.children[index];
    var productImg = thisProduct.children[1].firstChild.getAttribute("src");
    var productName = thisProduct.children[2].firstChild.nodeValue;
    var productPrice = thisProduct.children[3].firstChild.nodeValue;
    var productNumber = thisProduct.children[4].firstChild.nodeValue;
    fillList(method, productImg, productName, productPrice, productNumber, true);
  }
  if (method == 'regular') {
    deleteSelectProduct('express');
  } else {
    deleteSelectProduct('regular');
  }
}

function fillList(method, productImg, productName, productPrice, productNumber, isMove) {
  var productList = document.getElementById(method+"-product-list");
  let fileName = /(.*?)\\(\w+)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;

  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");

  var checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  if (!isMove) {
    checkBox.checked = true;
  }
  checkBox.addEventListener("click", function() { isAllCheckedIn(method); })
  var productImgCell = document.createElement("img");
  productImgCell.setAttribute("src", productImg.replace(fileName, '../img/$2.$3'));
  productImgCell.setAttribute("width", "80px");
  productImgCell.setAttribute("height", "80px");
  var productNameCell = document.createTextNode(productName);
  var productPriceCell = document.createTextNode(productPrice);
  var productNumberCell = document.createTextNode(productNumber);
  var totalPrice = Number(productPrice) * Number(productNumber);
  var totalPriceCell = document.createTextNode(totalPrice);
  
  td1.appendChild(checkBox);
  td2.appendChild(productImgCell);
  td3.appendChild(productNameCell);
  td4.appendChild(productPriceCell);
  td5.appendChild(productNumberCell);
  td6.appendChild(totalPriceCell);
  
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  productList.appendChild(tr);
  isAllCheckedIn(method);
}

// ******상품 입력 폼을 위한 함수******
function clearList() {
  var frm = document.getElementById('product-info');
  var em = frm.elements;
  frm.reset();
  for (var i = 0; i < em.length; i++) {
      if (em[i].type == 'text') em[i].value = null;
      if (em[i].type == 'radio') em[i].checked = false;
      if (em[i].type == 'file') em[i].value = null;
  }
  return;
}

function validate() {
  let productImg = document.getElementById("product-img").value;
  let productName = document.getElementById("product-name").value;
  let productPrice = document.getElementById("product-price").value;
  let productNumber = document.getElementById("product-number").value;
  let productDelivery = document.getElementsByName("product-delivery");

  let extensionName = /(.*?)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;
  let patternNum = /[0-9]/;
  var checkCount = 0;
  let method;
  for (var i = 0; i<2; i++) {
    if (productDelivery[i].checked == true) {
      checkCount++;
      method = productDelivery[i].value;
    }
  }

  // 이미지 검증
  if (productImg === '') {
    alert("상품 이미지를 추가하시오.");
  } else if (!productImg.match(extensionName)) {
    alert("이미지 파일이 아닙니다. 'jpg', 'jpeg', 'png'을 확장자로 가진 파일을 추가하시오.");
  }

  // 상품 이름 검증
  else if (productName === '') {
    alert("상품 이름을 입력하시오.");
  } else if (productName.match(patternNum)) {
    alert("문자로된 상품 이름을 입력하시오.");
  }

  // 상품 가격 검증
  else if (productPrice === '') {
    alert("상품 가격을 입력하시오.");
  } else if (!productPrice.match(patternNum)) {
    alert("상품 가격에 숫자를 입력하시오.");
  } else if (Number(productPrice) < 1000) {
    alert("상품 가격을 1000원 이상으로 입력하시오.")
  }

  // 상품 개수 검증
  else if (productNumber === '') {
    alert("상품 개수를 입력하시오.");
  } else if (!productNumber.match(patternNum)) {
    alert("상품 개수에 숫자를 입력하시오.");
  } else if (Number(productNumber) > 50 || Number(productNumber) < 1) {
    alert("최대 50개 이하로 선택하시오.")
  }

  // 상품 배송 방법 검증
  else if (checkCount == 0) {
    alert("배송 방법을 선택하시오.");
  } else {
    fillList(method, productImg, productName, productPrice, productNumber, false);
    clearList();
    closePopup();
    isAllCheckedIn(method);
  }
}

function showPopup() {
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
}

// ******상품 검색을 위한 함수******
function findProduct() {
  var name = document.getElementById("serch-product-name").value;
  var minPrice = document.getElementById("min-price").value;
  var maxPrice = document.getElementById("max-price").value;
  var regular = new Set();
  var express = new Set();
  if (name != "") {
    var list = findByName(name);
    regular = new Set(list[0]);
    express = new Set(list[1]);
  }
  if (minPrice != "") {
    var list = findByMinPrice(minPrice);
    var set1 = new Set(list[0]);
    var set2 = new Set(list[1]);
    regular = new Set([...regular].filter(x => set1.has(x)));
    express = new Set([...express].filter(x => set2.has(x)));
  }
  if (maxPrice != "") {
    var list = findByMaxPrice(maxPrice);
    var set1 = new Set(list[0]);
    var set2 = new Set(list[1]);
    regular = new Set([...regular].filter(x => set1.has(x)));
    express = new Set([...express].filter(x => set2.has(x)));
  }
  highlightProducts(Array.from(regular), Array.from(express));
}

function findByName(searchName) {
  var regularCount = regularProductList.children.length;
  var expressCount = expressProductList.children.length;
  var regular = new Array();
  var express = new Array();
  for (var i = 0; i < regularCount; i++) {
    var name = regularProductList.children[i].children[2].firstChild.nodeValue;
    if (name.indexOf(searchName) >= 0) {
      regular.push(i);
    }
  }
  for (var i = 0; i < expressCount; i++) {
    var name = expressProductList.children[i].children[2].firstChild.nodeValue;
    if (name.indexOf(searchName) >= 0) {
      express.push(i);
    }
  }
  return [regular, express];
}

function findByMinPrice(minPrice) {
  var regularCount = regularProductList.children.length;
  var expressCount = expressProductList.children.length;
  var regular = new Array();
  var express = new Array();
  for (var i = 0; i < regularCount; i++) {
    var price = regularProductList.children[i].children[3].firstChild.nodeValue;
    if (Number(price) >= minPrice) {
      regular.push(i);
    }
  }
  for (var i = 0; i < expressCount; i++) {
    var price = expressProductList.children[i].children[3].firstChild.nodeValue;
    if (Number(price) >= minPrice) {
      express.push(i);
    }
  }
  return [regular, express];
}

function findByMaxPrice(maxPrice) {
  var regularCount = regularProductList.children.length;
  var expressCount = expressProductList.children.length;
  var regular = new Array();
  var express = new Array();
  for (var i = 0; i < regularCount; i++) {
    var price = regularProductList.children[i].children[3].firstChild.nodeValue;
    if (Number(price) <= maxPrice) {
      regular.push(i);
    }
  }
  for (var i = 0; i < expressCount; i++) {
    var price = expressProductList.children[i].children[3].firstChild.nodeValue;
    if (Number(price) <= maxPrice) {
      express.push(i);
    }
  }
  return [regular, express];
}

function highlightProducts(regular, express) {
  resetHighlight();
  var regularCount = regular.length;
  var expressCount = express.length;
  // 일반 배송 물품 색 바꾸기
  for (var i = 0; i < regularCount; i++) {
    var index = regular.pop();
    var product = regularProductList.children[index];
    highlight(product);
  }
  // 새벽 배송 색 바꾸기
  for (var i = 0; i < expressCount; i++) {
    var index = express.pop();
    var product = expressProductList.children[index];
    highlight(product);
  }
}

function resetHighlight() {
  var regularCount = regularProductList.children.length;
  var expressCount = expressProductList.children.length;
  // 일반 배송 reset
  for (var i = 0; i < regularCount; i++) {
    var product = regularProductList.children[i];
    if (product.children[2].style.color == 'red') {
      removeHighlight(product);
    }
  }
  // 새벽 배송 색 바꾸기
  for (var i = 0; i < expressCount; i++) {
    var product = expressProductList.children[i];
    if (product.children[2].style.color == 'red') {
      removeHighlight(product);
    }
  }
}

function highlight(node) {
  for (var j = 2; j < 6; j++) {
    node.children[j].style.color = "red";
    node.children[j].style.fontSize = "20px";
    node.children[j].style.fontWeight = "600px";
  }
}

function removeHighlight(node) {
  for (var j = 2; j < 6; j++) {
    node.children[j].style.removeProperty('color');
    node.children[j].style.removeProperty('font-size');
    node.children[j].style.removeProperty('font-weight');
  }
}