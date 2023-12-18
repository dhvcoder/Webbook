var token = $.cookie("token");

function GetOrder() {
  $.ajax({
    url: "http://localhost:7070/v5/getOrder",
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (response) {
      if (Array.isArray(response.data)) {
        response.data.forEach((order) => {
         let status =
           order.information.status === 1
             ? "Đang xử lí"
             : order.information.status === 2
             ? "Đơn hàng đã được xác nhận"
             : order.information.status === 3
             ? "Đơn hàng đã hủy"
             : "";
          const information = order.information;
          let html = ` <div class="iq-card">
                              <div class="iq-card-header d-flex justify-content-between iq-border-bottom mb-0">
                                 <div class="iq-header-title d-flex">
                                    <div class="madonhang">
                                        <div class="Lov07e">Mã đơn hàng</div>
                                        <div class="">
                                            <div style="display: inline-block;"><span class="id_order" style="color: #0dd6b8;">230114BKSVQJH8</span><svg width="12" height="13"
                                                        viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    </svg></div>
                                        </div>
                                    </div>
                                    <div class="address ml-5">
                                        <div class="Lov07e">Thông tin đơn hàng:
                                        </div>
                                        <div class="">
                                           <span class="mr-2 fullname" style="color: #0dd6b8;">${information.fullname}</span>
                                           <span class="mr-2 phone" style="color: #0dd6b8;">${information.phone}</span>
                                           <span class="mr-2 adres" style="color: #0dd6b8;">${information.address}</span>
                                        </div>
                                    </div>
                                 </div>
                                 <div class="float-right">
                                    <div>
                                         <span class=""><strong class="mr-2">Ngày đặt:</strong>${information.date_order}</span>  
                                    </div>
                                    <div>
                                         <span class=""><strong class="mr-2">Tình Trạng:</strong>${status}</span>  
                                    </div>
                                  
                                 </div>
                              </div>`;
          if (Array.isArray(order.product)) {
            order.product.forEach((pr) => {
              const product_detail = pr.ten;
              console.log(product_detail);
              html += `
                                <div class="iq-card-body">
                                    <ul class="list-inline p-0 m-0" id="cart-checkout">
                                        <li class="checkout-product">
                                            <div class="row mt-3">
                                                <div class="col-sm-2">
                                                    <span class="checkout-product-img">
                                                        <div><img class="img-fluid rounded" src="https://drive.google.com/uc?id=${pr.img}" alt=""></div>
                                                    </span>
                                                </div>
                                                <div class="col-sm-4 align-items-center">
                                                <div>
                                                    <div class="checkout-product-details d-inline-block align-item-center align-top overflow-hidden" style="max-width: 200px;"">
                                                         <h5 class="namesp">${pr.ten}</h5>
                                                        <div class="">
                                                            <p class="text-success tinhtrang">Còn hàng</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div class = "col-sm-6 d-flex justify-content-around">
                                                     <div class="quantity">
                                                        <h5>x<span>${pr.quantity}</span></h5>
                                                    </div>
                                                    <div class="amount_total">
                                                        <h5>${pr.gia}</h5>
                                                    </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>`;
            });
          }
          html += ` <div class="modal-footer">
                                <div class="" tabindex="0">
                                    <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <title>Shopee Guarantee</title>
                                    </svg>
                                    <span>Thành tiền : <strong class="total_amount" style="font-size: 1.5rem; color: #ff9b8a;">${information.amount_total}</strong><span style= "color: #11141b;" >$</span></span>
                                </div>
                                 <button type="button" class="btn btn-danger">Hủy đơn hàng</button>
                                </div>
                           </div>`;
          $(".order_detail").append(html);
        });
      }
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}

GetOrder();
