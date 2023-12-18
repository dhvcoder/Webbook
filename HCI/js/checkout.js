var token = $.cookie("token");
function GetCardCheckout() {
  $(document).ready(function () {
    if (!token) {
      return;
    } else {
      $.ajax({
        url: `http://localhost:7070/v4/getCardItem`,
        type: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .done(function (response) {
          $("#cart-checkout").html("");
          response.data.forEach((value) => {
            let html = `<li class="checkout-product">
                                       <div class="row align-items-center">
                                          <div class="col-sm-2">
                                              <input type="checkbox" class="checkbox-item" value="${
                                                value.product_id
                                              }" />
                                             <span class="checkout-product-img">
                                             <a href=""><img class="img-fluid rounded" src="https://drive.google.com/uc?id=${
                                               value.img
                                             }" alt=""></a>
                                             </span>
                                          </div>
                                          <div class="col-sm-4">
                                             <div class="checkout-product-details">
                                                <h5>${value.ten}</h5>
                                                <p class="text-success">Còn hàng</p>
                                                <div class="">
                                                   <h5 class ="price">${
                                                     value.gia
                                                   } $</h5>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="col-sm-6">
                                             <div class="row">
                                                <div class="col-sm-10">
                                                   <div class="row align-items-center mt-2">
                                                      <div class="col-sm-7 col-md-6">
                                                            <button type="button" class="fa fa-minus qty-btn btn-minus " id="btn-minus"></button>
                                                            <input type="text" class="${
                                                              value.product_id
                                                            }" id="quantity" value="${
              value.soluong
            }" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                                                            <button type="button" class="fa fa-plus qty-btn btn-plus" id="btn-plus"></button>
                                                        </div>
                                                      <div class="col-sm-5 col-md-6">
                                                         <span class="product-price" id="${
                                                           value.product_id
                                                         }-price" value="${
              value.gia * value.soluong
            }">
                                                         ${
                                                           value.gia *
                                                           value.soluong
                                                         } </span><span>$</span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div class="col-sm-2">
                                                  <a href="#" class="text-dark font-size-20 button-deletecart" onclick="Delete(event, ${
                                                    value.product_id
                                                  })">
                                                    <i class="ri-delete-bin-7-fill"></i>
                                                  </a>                                               
                                                 </div>
                                             </div>
                                          </div>
                                       </div>
                                    </li>`;
            $("#cart-checkout").append(html);
          });
        })
        .fail(function (error) {
          swal({
            icon: "error",
            text: error.responseText,
          });
          console.error("Error:" + error);
        });
    }
  });
}
GetCardCheckout();
function getvalueSoluong(callback) {
  // Nút cộng và nút trừ
  $(document).on("click", ".btn-plus, .btn-minus", function () {
    var inputElement = $(this).siblings("input");
    var solluong;

    if ($(this).hasClass("btn-plus")) {
      solluong = parseInt(inputElement.val()) + 1;
    } else if ($(this).hasClass("btn-minus")) {
      solluong = parseInt(inputElement.val()) - 1;
      if (solluong < 1) return; // Đảm bảo không âm
    }

    var price = parseFloat(
      $(this)
        .closest(".checkout-product")
        .find(".price")
        .text()
        .replace("$", "")
        .trim()
    );
    var totalprice = price * solluong;

    // Tìm phần tử .product-price trong phạm vi của sản phẩm cụ thể
    var productPriceElement = $(this)
      .closest(".checkout-product")
      .find(".product-price");
    productPriceElement.text(totalprice);
    inputElement.val(solluong);
    callback(solluong);
  });
}
var quality;
getvalueSoluong(function (val) {
  quality = val;
});

function Delete(e, id) {
  e.preventDefault();
  $.ajax({
    url: `http://localhost:7070/v4/deletecart/${id}`,
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .done(function (response) {
      GetCardCheckout();
      GetCard();
    })
    .fail(function (error) {
      swal({
        icon: "error",
        text: error.responseText,
      });
      console.error("Error:" + error);
    });
}

let selectedValues = [];
let totalAmount = 0;

$(document).on("change", ".checkbox-item", function () {
  // Get the value of the clicked checkbox
  const clickedValue = $(this).val();
  console.log(clickedValue);
  let quantity = document.getElementsByClassName(clickedValue);
  let productPrice = Number(
    document.getElementById(`${clickedValue}-price`).innerText
  );

  // Check if the checkbox is checked or unchecked
  if (this.checked) {
    selectedValues.push({
      id_product: clickedValue,
      soluong: quantity[0].value,
    });
    totalAmount = Number(totalAmount + productPrice);
  } else {
    // If unchecked, remove the value from the array
    const index = selectedValues.findIndex(
      (item) => item.id_product === clickedValue
    );
    if (index !== -1) {
      selectedValues.splice(index, 1);
    }
    totalAmount = Number(totalAmount - productPrice);
  }
  console.log("Selected Values:", selectedValues);
  $("#amount_total").text(String(totalAmount));
  $("#soluong_sp").text("Giá" + " " + selectedValues.length + " " + "sản phẩm");
  $(".total").text(String(totalAmount));
  $(".amount_total").text(String(totalAmount));
});

function handlOrder() {
  $(".button-order").on("click", function () {
    const fullname = $("#fullname").val();
    const address = $("#adres").val();
    const phone = $("#phone").val();
    const amount = $(".amount_total").text();
    const Data = {
      fullname,
      address,
      phone,
      amount,
      selectedValues,
    };
    if (amount <= 0) {
      swal({
        icon: "error",
        text: "Vui long chon san pham",
      });
    } else {
      $.ajax({
        url: `http://localhost:7070/v5/insertOrder`,
        type: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { Data },
      })
        .done(function (response) {
          swal({
            icon: "succees",
            text: response,
          });
          console.error("Error:" + error);
        })
        .fail(function (error) {
          swal({
            icon: "error",
            text: error.responseText,
          });
          console.error("Error:" + error);
        });
    }
  });
}

handlOrder();
