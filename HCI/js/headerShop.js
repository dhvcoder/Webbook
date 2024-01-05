var token = $.cookie("token");
var user = $.cookie("username");

$(document).ready(function () {
  if (token) {
    $("#account").removeClass("hidden");
    $(".buttonSign-in").addClass("hidden");
    $(".name-user").text("Xin chao " + user);
  }
});

$("#sign-out").on("click", function (e) {
  e.preventDefault();
  $.ajax({
    url: `http://localhost:7070/v2/logout`,
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (response) {
      $.removeCookie("token", { path: "/" });
      $.removeCookie("username", { path: "/" });
      alert(response);
      location.href = "sign-in.html";
    },
    error: function (error) {
      // Show an alert and log the error if the token is not valid
      alert("Bạn không có quyền truy cập");
      console.error(error);
    },
  }); // Remove the trailing comma here
});

function checkToken() {
  $.ajax({
    url: "http://localhost:7070/v2/checkToken",
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (response) {
      if(response.role = 1 || response.role ==2 || response.role == 3){
         $("#db").removeClass("hidden");
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
}
checkToken()

$("#admin").on("click", function (e) {
  e.preventDefault();
  if(checkToken){
    window.location.href = "admin-dashboard.html";
  }
});

$.ajax({
  url: "http://localhost:7070/v1/getcategory",
  type: "GET",
})
  .done(function (data) {
    data.forEach((value) => {
      let html = `<li><a href="category.html?categoryId=${value.id}"><i class="ri-play-circle-line"></i>${value.tendanhmuc}</a></li>`;
      $(".category").append(html);
    });
  })
  .fail(function (xhr, status, error) {
    console.error("Error:", status, error);
  });

function GetCard() {
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
        $("#card_item").html("");
        response.data.forEach((value) => {
          let html = `<div class="iq-sub-card" data-bs-spy="scroll" data-bs-smooth-scroll="true">
    <div class="media align-items-center">
        <div class="">
            <img class="rounded" src="https://drive.google.com/uc?id=${value.img}" alt="">
        </div>
        <div class="media-body ml-3">
            <h6 class="mb-0 mt-2">${value.ten}</h6>
            <p class="mb-0 mt-2">${value.gia} $</p>
            <div class="d-flex mt-2">Số lượng :
                <p class="ml-2">${value.soluong}</p>
            </div>
        </div>
    </div>
</div>`;
          $("#card_item").append(html);
        });
        $(".totalCard").text(response.totalCard);
      })
      .fail(function (error) {
        swal({
          icon: "error",
          text: "Unauthorized:" + error.responseText,
        });
        console.error("Error:" + error);
      });
  }
}
GetCard();
