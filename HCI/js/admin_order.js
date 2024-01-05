var token = $.cookie("token");
const id_order = new URLSearchParams(window.location.search).get("id");
function GetByID(id_order) {
  $(".order_detail").html("");
  $.ajax({
    url: `http://localhost:7070/v5/getByIdOrder/${id_order}`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (response) {
      if (Array.isArray(response.data)) {
        response.data.forEach((item) => {
          let status =
            item.information.status === 1
              ? "Đang xử lí"
              : item.information.status === 2
              ? "Đơn hàng đã được xác nhận"
              : item.information.status === 3
              ? "Đơn hàng đã hủy"
              : "";
          let payment_status =
            item.information.payment === 1
              ? " Đã thanh toán"
              : item.information.payment === 2
              ? "Chưa thanh toán"
              : "";
          let html = ` <div class="iq-card">
                                 <div class="iq-card-header d-flex justify-content-between iq-border-bottom mb-0">
                                    <div class="iq-header-title d-flex">
                                       <div class="madonhang">
                                          <div class="Lov07e">Mã đơn hàng</div>
                                          <div class="">
                                             <div style="display: inline-block;"><span class="id_order" style="color: #0dd6b8;">MjA=</span><svg
                                                   width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                </svg></div>
                                          </div>
                                       </div>
                                       <div class="address ml-5">
                                          <div class="Lov07e">Thông tin đơn hàng:
                                          </div>
                                          <div class="">
                                             <span class="mr-2 fullname" style="color: #0dd6b8;">${item.information.fullname}</span>
                                             <span class="mr-2 phone" style="color: #0dd6b8;">${item.information.address}</span>
                                             <span class="mr-2 adres" style="color: #0dd6b8;">${item.information.phone_number}</span>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="float-right">
                                       <div>
                                          <span class=""><strong class="mr-2">Ngày đặt:</strong>${item.information.order_date}</span>
                                       </div>
                                       <div>
                                          <span class=""><strong class="mr-2">Tình Trạng:</strong>${status}</span>
                                       </div>
                                      <div>
                                         <span class=""><strong class="mr-2">Tình Trạng:</strong>${payment_status}</span>
                                      </div>
                                    </div>
                                 </div>`;
                                if (Array.isArray(item.product)) {
                                  item.product.forEach((pr) => {
                                    console.log(pr.ten);
                                    html += ` <div class="iq-card-body">
                                          <input type="text" class="id_product d-none" value="${pr.id_product}">
                                          <ul class="list-inline p-0 m-0" id="cart-checkout">
                                            <li class="checkout-product">
                                                <div class="row mt-3">
                                                  <div class="col-sm-2">
                                                      <span class="checkout-product-img">
                                                        <div><img class="img-fluid rounded"
                                                              src="https://drive.google.com/uc?id=${pr.img}" alt=""></div>
                                                      </span>
                                                  </div>
                                                  <div class="col-sm-4 align-items-center">
                                                      <div>
                                                        <div class="checkout-product-details d-inline-block align-item-center align-top overflow-hidden"
                                                            style="max-width: 200px;" "="">
                                                            <h5 class=" namesp">${pr.ten}</h5>
                                                            <div class="">
                                                              <p class="text-success tinhtrang">Còn hàng</p>
                                                            </div>
                                                        </div>
                                                      </div>
                                                  </div>
                                                  <div class="col-sm-6 d-flex justify-content-around">
                                                      <div class="">
                                                        <h5>x<span id = "${pr.id_product}">${pr.quantity}</span></h5>
                                                      </div>
                                                      <div class="amount_total">
                                                        <h5>${pr.gia}</h5>
                                                      </div>
                                                  </div>
                                                </div>
                                            </li>
                                          </ul>
                                      </div>`;
                                  })
                                }
                        if(item.information.status==1){
                          html += ` <div class = "modal-footer">
                                      <div>
                                       <button type="button" class="btn btn-success btn-xacnhan text-white" onclick="XacNhanOrder(${id_order})">Xác nhận Đơn Hàng</button>
                                       <button type="button" class="btn btn-danger" onclick="HuyOrder(${id_order})">Hủy Đơn Hàng</button>
                                      </div>
                                    <div class="" tabindex="0">
                                       <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <title>Shopee Guarantee</title>
                                       </svg>
                                       <span>Thành tiền : <strong class="total_amount" style="font-size: 1.5rem; color: #ff9b8a;">${item.information.amount_total}</strong><span
                                             style="color: #11141b;">$</span></span>
                                    </div>
                                    
                                 </div>`;
                        }else if (item.information.status==2){
                          html += ` <div class="modal-footer">
                                    <div class="" tabindex="0">
                                       <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <title>Shopee Guarantee</title>
                                       </svg>
                                       <span>Thành tiền : <strong class="total_amount" style="font-size: 1.5rem; color: #ff9b8a;">${item.information.amount_total}</strong><span
                                             style="color: #11141b;">$</span></span>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success btn-xacnhan disabled">Đơn hàng đã được xác nhận</button>
                                    </div>
                                 </div>`;
                        }else if (item.information.status==3){
                           html += ` <div class="modal-footer">
                                    <div class="" tabindex="0">
                                       <svg width="16" height="17" viewBox="0 0 253 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <title>Shopee Guarantee</title>
                                       </svg>
                                       <span>Thành tiền : <strong class="total_amount" style="font-size: 1.5rem; color: #ff9b8a;">${item.information.amount_total}</strong><span
                                             style="color: #11141b;">$</span></span>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-danger btn-xacnhan disabled">Đơn hàng đã hủy</button>
                                    </div>
                                 </div>`;
                        }

                     $(".order_detail").append(html);
                                
        });
      }
       
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}
GetByID(id_order)


function HuyOrder(id_order) {
   const soluong = $(".id_product")
     .map(function () {
       return $(this).val();
     })
     .get();
     console.log(soluong);
  $.ajax({
    url: `http://localhost:7070/v5/updateOrder/${id_order}`,
    type: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { quantity: soluong },
  })
    .done(function (response) {
      alert(response);
      GetByID(id_order);
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}
function XacNhanOrder(id_order) {
  $.ajax({
    url: `http://localhost:7070/v5/xacnhandonhang/${id_order}`,
    type: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .done(function (response) {
      alert(response);
      GetByID(id_order);
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}




