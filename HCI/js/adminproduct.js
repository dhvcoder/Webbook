var token = $.cookie("token");
let currentPage = 1;
const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
function loadData(id_categogy, page) {
  $.ajax({
    url: `http://localhost:7070/getlist/${id_categogy}/${page}`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .done(function (response) {
      $(".t-body").empty(); // Clear previous data
      let isFirstOptionAdded = false; // Biến để kiểm tra xem đã thêm option hay chưa
      if (Array.isArray(response.data) && response.data.length>0 ) {
        let sttStart = (page - 1) * itemsPerPage + 1;

        response.data.forEach((value, idx) => {
          let stt = sttStart + idx;
          let html = `<tr>
            <td>${stt}</td>
            <td><img class="img-fluid rounded" src="https://drive.google.com/uc?id=${value.img}" alt=""></td>
            <td>${value.ten}</td>
            <td>${value.tendanhmuc}</td>
            <td>${value.tentacgia}</td>
            <td>${value.gia}$</td>                                      
            <td>
                <div class="flex align-items-center list-user-action">
                    <button type="button" class="btn btn-sm btn-warning mx-1 px-1 py-1" data-toggle="modal" data-target="#modal-update" onclick="GetByID(${value.id_sanpham})">
                               <i class="ri-pencil-line"></i>
                            </button>
                    <button type="button" class="btn btn-sm btn-warning mx-1 px-1 py-1" onclick="openConfirmationModal(${value.id_sanpham})" data-toggle="modal" data-target="#modalDelete">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                </div>
            </td>
          </tr>`;
          $(".t-body").append(html);
        });
      }else{
        window.location.href = "404.html";
      }

      // Update current page
      currentPage = page;

      // Update pagination
      updatePagination(response.total_page);
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}

// Load initial data
const id_category = new URLSearchParams(window.location.search).get("id");
loadData(id_category, currentPage);

function updatePagination(totalPages) {
  $(".pagination").empty();

  // Add "Previous" button
  $(".pagination").append(
    `<li class="page-item ${
      currentPage === 1 ? "disabled" : ""
    }"><a class="page-link" href="#" data-page="${
      currentPage - 1
    }" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
  );

  // Add individual page links
  for (let i = 1; i <= totalPages; i++) {
    let isActive = i === currentPage ? "active" : "";
    let html = `<li class="page-item ${isActive}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    $(".pagination").append(html);
  }

  // Add "Next" button
  $(".pagination").append(
    `<li class="page-item ${
      currentPage === totalPages ? "disabled" : ""
    }"><a class="page-link" href="#" data-page="${
      currentPage + 1
    }" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
  );

  // Add click event listener to each page link
  $(".pagination")
    .find("a.page-link")
    .click(function (event) {
      event.preventDefault();
      let clickedPage = parseInt($(this).data("page"));
      loadData(id_category , clickedPage);
    });
}

var editor;
ClassicEditor.create(document.querySelector("#editormota"))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

// add-product

var formadd = document.getElementById("form-add-product");

$(formadd).submit(function (e) {
  e.preventDefault();

  const formData = new FormData(formadd);
  $.ajax({
    url: "http://localhost:7070/insertProduct",
    type: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      // Xử lý dữ liệu trả về từ server nếu cần
      console.log("Success:", data);
      // loadData(data, currentPage);
      location.reload();
    },
    error: function (error) {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
       swal({
         icon: "error",
         text: "Unauthorized:" + error.responseText,
       });
    },
  });
});

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
      let selectOption = "";
      data.forEach((value) => {
        selectOption += `<option value="${value.id_tacgia}">${value.tentacgia}</option>`;
      });
      $(".select-author").append(selectOption);
    })
    .fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có khi yêu cầu thất bại
      console.error("Error:", status, error);
    });
}
showAuthor();

function openConfirmationModal(id) {
  console.log(id);
  $(".button-delete").empty();
  let modalDelete = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                  <button type="button" class="btn btn-danger" onclick="deleteProduct(${id})" id="confirmDelete">Xoá</button>`;
  $(".button-delete").append(modalDelete);
}

function deleteProduct(id) {
  $.ajax({
    url: `http://localhost:7070/delete/${id}`,
    type: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (data) {
      location.reload();
    },
    error: function (xhr) {
      console.log(xhr.status + ": " + xhr.statusText);
       swal({
         icon: "error",
         text: "Unauthorized:" + xhr.responseText,
       });
      $("#modalDelete").modal("hide");
    },
  });
}

function ShowCategory() {
  $.ajax({
    url: "http://localhost:7070/v1/getcategory",
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .done(function (data) {
      let selectOption = "";
      data.forEach((value) => {
        selectOption += `<option value="${value.id}">${value.tendanhmuc}</option>`;
      });
      $(".select-category").append(selectOption);
    })
    .fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có khi yêu cầu thất bại
      console.error("Error:", status, error);
    });
}
ShowCategory();

var editorUp;
ClassicEditor.create(document.querySelector("#motaup"))
  .then((newEditor) => {
    editorUp = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

function GetByID(id) {
  $.ajax({
    url: `http://localhost:7070/getbyid/${id}`,
    type: "GET",
  })
    .done(function (data) {
      let selectedOption = "";
      if (data && data.length > 0) {
        // Sử dụng forEach để lặp qua dữ liệu
        data.forEach(function (value) {
          $("#id_sanphamup").val(value.id_sanpham);
          $("#tensanphamup").val(value.ten);
          let selectedcategory = `<option value = "${value.id_danhmuc}" selected>${value.tendanhmuc}</option>`;
          let selectedauthor = `<option value = "${value.tacgia_id}" selected>${value.tentacgia}</option>`;
          $("#giaup").val(value.gia);
          $("#soluongup").val(value.so_luong);
          editorUp.setData(value.mo_ta);
          $("#selectUp-category").append(selectedcategory);
          $("#selectUp-author").append(selectedauthor);
        });
      }
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}

$("#Update").submit(function (e) {
  e.preventDefault();
  const id = $("#id_sanphamup").val();
  const tensanphamup = $("#tensanphamup").val();
  const mota = $("#motaup").val(); // Assuming you want to get the value from a textarea with id "motaup"
  const gia = $("#giaup").val(); // Add this line if you want to get the value for "giaup"
  const soluong = $("#soluongup").val(); // Add this line if you want to get the value for "soluongup"
  const fileInput = $("#fileInput")[0];
  const file = fileInput.files[0];
  const id_danhmuc = $("#selectUp-category").val(); // Add this line if you want to get the selected value for "id_danhmuc"
  const id_tacgia = $("#selectUp-author").val(); // Add this line if you want to get the selected value for "id_tacgia"
  const formData = new FormData();
  formData.append("id", id);
  formData.append("tensanpham", tensanphamup);
  formData.append("mota", mota);
  formData.append("gia", gia);
  formData.append("soluong", soluong);
  formData.append("id_danhmuc", id_danhmuc);
  formData.append("id_tacgia", id_tacgia);
  formData.append("Files", file);

  $.ajax({
    url: `http://localhost:7070/update/${id}`, // Change the URL to match your endpoint
    type: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json", // No need to set Content-Type when using FormData
    },
    processData: false, // Ensure this is false when using FormData
    contentType: false, // Ensure this is false when using FormData
    data: formData,
    success: function (data) {
      location.reload();
    },
    error: function (error) {
      swal({
        icon: "error",
        text: "Unauthorized:" + error.responseText,
      });
    },
  });
});
