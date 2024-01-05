var token = $.cookie("token");
function GetOrder() {
  $(".order_detail").html("");
  $.ajax({
    url: "http://localhost:7070/v5/getAllOrder",
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (response) {
      console.log(response);
      if (Array.isArray(response.data)) {
        response.data.forEach((order) => {
          let status =
            order.status === 1
              ? "Chưa xác nhận"
              : order.status === 2
              ? "Đơn hàng đã được xác nhận"
              : order.status === 3
              ? "Đơn hàng đã hủy"
              : "";
          let html = ` <tr>
                            <td>${order.fullname}</td>
                            <td>${order.order_date}</td>
                            <td>${order.encodedId}</td>
                            <td>${order.amount_total}VND</td>`;
          if (order.status === 1) {
            html += `<td>
                                <div class="badge badge-pill badge-warning">${status}</div>
                            </td>        
                            <td>
                                  <a class="btn btn-primary" href="admin-order.html?id=${order.id_order}" role="button">Xem chi tiết</a>
                            </td>
                        </tr>`;
          } else if (order.status === 2) {
            html += `<td>
                                <div class="badge badge-pill badge-success">${status}</div>
                            </td>        
                            <td>
                                  <a class="btn btn-primary" href="admin-order.html?id=${order.id_order}" role="button">Xem chi tiết</a>
                            </td>
                        </tr>`;
          } else if (order.status === 3) {
            html += `<td>
                                <div class="badge badge-pill badge-danger">${status}</div>
                            </td>        
                            <td>
                                  <a class="btn btn-primary" href="admin-order.html?id=${order.id_order}" role="button">Xem chi tiết</a>
                            </td>
                        </tr>`;
          }
          $(".tbody-order").append(html);
        });
      }
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}

GetOrder();


function GetAllCount() {
  $.ajax({
    url: "http://localhost:7070/v5/getAllCount",
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .done(function (response) {
      const totalCount = response.total_count;
      console.log(totalCount.total_users);
      $("#total-user").text(totalCount.total_users);
      console.log($("#total-user").text());
      $("#total-book").text(totalCount.total_book);
      console.log($("#total-book").text());
      $("#total-order").text(totalCount.total_order);
      $("#total-choduyet").text(totalCount.total_order_ws1);
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}

GetAllCount();






