function validate() {
  let productImg = document.getElementById("product-img").value;
  let productName = document.getElementById("product-name").value;
  let productPrice = document.getElementById("product-price").value;
  let productNumber = document.getElementById("product-number").value;
  let productDelivery = document.getElementsByName("product-delivery");


  let extensionName = /(.*?)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;
  let fileName = /(.*?)\[a-zA-Z]\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;
  let patternNum = /[0-9]/;
  var checkCount = 0;
  let checkedValue;
  for (var i = 0; i<2; i++) {
    if (productDelivery[i].checked == true) {
      checkCount++;
      checkedValue = productDelivery[i].value;
    }
  }

  // 이미지 검증
  console.log(productImg)
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
    if (checkedValue === 'regular') {
      var productList = document.all("regular-product-list")
    } else {
      var productList = document.all("express-product-list")
    }
    var listRowLength = productList.rows.length;
    var listRow = productList.insertRow(listRowLength - 1);
    var checkBox = listRow.insertCell(0);
    checkBox.innerHTML = "<input type='checkbox' checked>";
    var productImgCell = listRow.insertCell(1);
    productImgCell.innerHTML = "<img src=" + productImg + " width=80px height = 80px>";
    var productNameCell = listRow.insertCell(2);
    productNameCell.innerHTML = productName;
    var productPriceCell = listRow.insertCell(3);
    productPriceCell.innerHTML = productPrice;
    var productNumberCell = listRow.insertCell(4);
    productNumberCell.innerHTML = productNumber;
    var totalPriceCell = listRow.insertCell(5);
    totalPriceCell.innerHTML = Number(productPrice) * Number(productNumber);
    self.close();
  }
}

function closeWindow() {
  self.close();
}

window.onload = function() {
  let submitButton = document.getElementById("submit-button");
  let cancelButton = document.getElementById("cancel-button");
  submitButton.addEventListener("click", validate);
  cancelButton.addEventListener("click", closeWindow);
}