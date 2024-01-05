$(document).ready(function () {
  $("#form-login").submit(function (e) {
    e.preventDefault();
    const email = $("#email").val();
    const pass = $("#pass").val();
    $.ajax({
      url: "http://localhost:7070/v2/login",
      type: "POST",
      data: {
        email: email,
        password: pass,
      },
    })
      .done(function (response) {
        $.cookie("token", response.token, { expires: 1, path: "/" });
        // Kiểm tra xem có user trong mảng hay không
        if (response.user && response.user.length > 0) {
          // Truy cập phần tử đầu tiên của mảng
          const user = response.user[0];
          $.cookie("username", user.username, { expires: 1, path: "/" });
          window.location.href = "index.html";
        } else {
          console.log("Không có thông tin user trong response");
        }
      })
      .fail(function (xht) {
        // Xử lý khi yêu cầu thất bại
        if (xht.status == 401) {
          alert("Sai Mk hoac email");
        }
        console.log("loi:", xht.responseText);
      });
  });
});
