var token = $.cookie("token");
$.ajax({
  url: "http://localhost:7070/v2/getAlluser",
  type: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
  .done(function (data) {
    let stt = 1;
    // Xử lý dữ liệu đã nhận được từ API khi yêu cầu thành công
    data.forEach((value) => {
      let html = `  <tr>
                        <td>${value.id}</td>
                        <td>${value.username}</td>
                        <td>${value.email}</td>
                        <td>${value.role_name}</td>
                        <td>
                            <div class="flex align-items-center list-user-action">
                              <button type="button" class="btn btn-sm btn-warning mx-1 px-1 py-1" data-toggle="modal" data-target="#update-user" onclick="getBYID(${value.id})">
                               <i class="ri-pencil-line"></i>
                            </button>
                             <button type="button" class="btn btn-sm btn-warning mx-1 px-1 py-1" data-toggle="modal" data-target="#modalDelete" onclick="openConfirmationModal(${value.id})">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                            </div>
                        </td>
                    </tr>`;
      $(".t-body").append(html);
    });
  })
  .fail(function (xhr, status, error) {
    // Xử lý lỗi nếu có khi yêu cầu thất bại
    console.error("Error:", status, error);
  });

function showRole() {
  $.ajax({
    url: `http://localhost:7070/v2//getAllRole`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .done(function (data) {
      let selectOption = "";
      data.forEach((value) => {
        selectOption += `<option value="${value.id_role}">${value.role_name}</option>`;
      });
      $("#select-role").append(selectOption);
    })
    .fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có khi yêu cầu thất bại
      console.error("Error:", status, error);
    });
}
showRole();

$(document).ready(function () {
  $("#form-signUp").submit(function (e) {
    e.preventDefault();
    const fullname = $("#username").val();
    const email = $("#email").val();
    const pass = $("#pass").val();
    const role = $("#select-role").val();
    $.ajax({
      url: "http://localhost:7070/v2/signup",
      type: "POST",
      data: {
        username: fullname,
        email: email,
        password: pass,
        role: role,
      },
    })
      .done(function (response) {
        location.reload();
      })
      .fail(function (error) {
        alert("Lỗi: " + error.responseText);
      });
  });
});

function getBYID(id) {
  $.ajax({
    url: `http://localhost:7070/v2//getByIdUser/${id}`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (response) {
      // Kiểm tra xem dữ liệu có tồn tại không
      if (data && response.length > 0) {
        // Sử dụng forEach để lặp qua dữ liệu
        response.forEach(function (value) {
          $("#id_username-up").val(value.id);
          $("#username-up").val(value.username);
          $("#email-up").val(value.email);
          let selectedUser = `<option value = "${value.role_id}" selected>${value.role_name}</option>`;
          $("#select-role").append(selectedUser);
        });
      }
    })
    .fail(function (error) {
      alert("Lỗi: " + error.responseText);
      console.error(error);
    });
}

function UpdateUser() {
  $("#UpdateUser").submit(function (e) {
    e.preventDefault();
    const id = $("#id_username-up").val();
    const role = $("#select-role").val();
    console.log(id, role);
    $.ajax({
      url: `http://localhost:7070/v2/edit/${id}`,
      type: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        role: role,
      },
    })
      .done(function (response) {
        alert(response);
        location.reload();
      })
      .fail(function (error) {
        alert("Lỗi: " + error.responseText);
        console.error(error);
      });
  });
}



function openConfirmationModal(id) {
  $(".button-delete").empty();
  let modalDelete = `<button type="button" class="btn btn-secondary" data-dismiss="modalDelete">Hủy</button>
                  <button type="button" class="btn btn-danger" onclick="deleteUser(${id})" id="confirmDelete">Xoá</button>`;
  $(".button-delete").append(modalDelete);
}

function deleteUser(id) {
  $.ajax({
    url: `http://localhost:7070/v2/deleteUser/${id}`,
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .done(function (response) {
      alert(response);
      location.reload();
    })
    .fail(function (error) {
      alert("Lỗi: " + error.responseText);
      console.error(error);
    });
}
