var token = $.cookie("token");

const id_product = new URLSearchParams(window.location.search).get("idProduct");
function GetByID(id) {
  $(document).ready(function () {
    $.ajax({
      url: `http://localhost:7070/getbyid/${id}`,
      type: "GET",
    })
      .done(function (data) {
        $(".mota").append(data[0].mo_ta);
        $(".nameproduct").text(data[0].ten);
        let img = `<li><img src="https://drive.google.com/uc?id=${data[0].img}" class="img-fluid w-100 rounded text-center" alt="" style="width: 200px;"></li>`;
        $(".img_product").append(img);
        $("#price").text(data[0].gia);
        $(".nameauthor").text(data[0].tentacgia);
      })
      .fail(function (error) {
        console.log("Error:", error);
      });
  });
}

GetByID(id_product);

function getvalueSoluong(callback) {
  var solluong = 0; // Set an initial value

  // Nút cộng
  $("#btn-plus").on("click", function () {
    solluong++;
    $("#quantity").val(solluong);
    callback(solluong);
  });

  // Nút trừ
  $("#btn-minus").on("click", function () {
    if (solluong > 0) {
      solluong--;
      $("#quantity").val(solluong);
      callback(solluong);
    }
  });
}

function insertCard(id_product, soluong) {
  $.ajax({
    url: "http://localhost:7070/v4/insertCard",
    type: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id_sanpham: id_product,
      soluong: soluong,
    },
  })
    .done(function (response) {
      alert(response);
      GetCard();
    })
    .fail(function (error) {
      swal({
        icon: "error",
        text: "Unauthorized:" + error.responseText,
      });
      console.error("Error:" + error);
    });
}

$(document).ready(function () {
  var soluong ;
  $(".addcard").on("click", function (e) {
    e.preventDefault();
    if (!token) {
      window.location.href = "sign-in.html";
    } else {
      insertCard(id_product, soluong);
    }
  });

  getvalueSoluong(function (value) {
    soluong = value;
    console.log(soluong);
  });
});


