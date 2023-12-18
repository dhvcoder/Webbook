var token = $.cookie("token");
function showAuthor() {
  $.ajax({
    url: `http://localhost:7070/v3/getAuthor`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (data) {
      let stt = 1;
      data.forEach((value) => {
        let html = `<tr>
                        <td>${stt++}</td>
                        <td>${value.tentacgia}</td>
                        <td>
                            <p class="mb-0">${value.motaAuthor}</p>
                        </td>
                        <td>
                            <div class="flex align-items-center list-user-action">
                                <button type="button" class="btn btn-sm btn-warning mx-1 px-1 py-1" data-toggle="modal" data-target="#update" onclick="GetByID(${
                                  value.id_tacgia
                                })">
                               <i class="ri-pencil-line"></i>
                            </button>
                                <button type="button" class="btn btn-sm btn-warning mx-1 px-1 py-1" onclick="openConfirmationModal(${
                                  value.id_tacgia
                                })" data-toggle="modal" data-target="#modalDelete">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                            </div>
                        </td>
                    </tr>`;
        $(".t-body-author").append(html);
      });
    })
    .fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có khi yêu cầu thất bại
      console.error("Error:", status, error);
    });
}
showAuthor();

$(document).ready(function () {
  // Initialize ClassicEditor
  ClassicEditor.create(document.querySelector("#editor"))
    .catch((error) => {
      console.error(error);
    })
    .then((editor) => {
      // ClassicEditor initialization completed
      $("#form-add-author").submit(function (e) {
        e.preventDefault();

        // Lấy giá trị của #tendanhmuc
        const tentacgia = $("#tentacgia").val();

        // Get the value from the editor
        const mota = editor.getData();
        $.ajax({
          url: "http://localhost:7070/v3/insertAuthor",
          type: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data:{
            tentacgia: tentacgia,
            mota: mota,
          },
          success: function (data) {
            location.reload();
          },
          error: function (error) {
             swal({
               icon: "error",
               text: "Error:" + error.responseText,
             });
            console.log(error.status);
          },
        });
      });
    });
});

var editorUp;
ClassicEditor.create(document.querySelector("#motaup"))
  .then((newEditor) => {
    editorUp = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });
function GetByID(id) {
  // clearModal();
  $.ajax({
    url: `http://localhost:7070/v3/getByID/${id}`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (data) {
      data.forEach((value) => {
        $("#id_tentacgiaup").val(value.id_tacgia);
        $("#tentacgiaup").val(value.tentacgia);
        editorUp.setData(value.motaAuthor);
      });
    })
    .fail(function (xhr, status, error) {
      // Handle errors if the request fails
      console.error("Error:", status, error);
    });
}

// delete category

function openConfirmationModal(id) {
  console.log(id);
  $(".button-delete").empty();
  let modalDelete = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                  <button type="button" class="btn btn-danger" onclick="deleteAuthor(${id})" id="confirmDelete">Xoá</button>`;
  $(".button-delete").append(modalDelete);
}

function deleteAuthor(id) {
  $.ajax({
    url: `http://localhost:7070/v3/deleteAuthor/${id}`,
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (data) {
      location.reload();
    },
    error: function (erro) {
      console.log(erro);
      swal({
        icon: "error",
        text: erro.responseText,
      });
      $("#modalDelete").modal("hide");
    },
  });
}


$("#Update").submit(function (e) {
  e.preventDefault();
  const id = $("#id_tentacgiaup").val();
  const tentacgia = $("#tentacgiaup").val();
  const mota = editorUp.getData();
  // console.log(tentacgia, mota , id);

  $.ajax({
    url: `http://localhost:7070/v3/updateAuthor/${id}`,
    type: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: id,
      tentacgia: tentacgia,
      mota: mota,
    }),
    success: function (data) {
      location.reload();
    },
    error: function (xhr) {
        if (xhr.status === 401) {
        swal({
          icon: "error",
          text: "Unauthorized: Không có quyền xóa tác giả.",
        })
      }
      else{
        swal({
          icon: "error",
          text: "Unexpected error: " + xhr.status,
        });
      }
    },
  });
});
