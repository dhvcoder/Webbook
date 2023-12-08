// Load initial data
const id_category = new URLSearchParams(window.location.search).get("categoryId");

let currentPage = 1;
function loadData(id_categogy, page) {
  $.ajax({
    url: `http://localhost:7070/getlist/${id_categogy}/${page}`,
    type: "GET",
  })
    .done(function (response) {
      console.log(response);
      if (Array.isArray(response.data)) {
        response.data.forEach((value) => {
          let html = `<div class="col-sm-6 col-md-4 col-lg-3">
                                 <div class="iq-card iq-card-block iq-card-stretch iq-card-height search-bookcontent">
                                    <div class="iq-card-body p-0">
                                       <div class="d-flex align-items-center">
                                          <div class="col-6 p-0 position-relative image-overlap-shadow">
                                             <a href="javascript:void();"><img class="img-fluid rounded w-100" src="https://drive.google.com/uc?id=${value.img}" alt=""></a>
                                             <div class="view-book">
                                                <a href="book-page.html?idProduct=${value.id_sanpham}" class="btn btn-sm btn-white">View Book</a>
                                             </div>
                                          </div>
                                          <div class="col-6">
                                             <div class="mb-2">
                                                <h6 class="mb-1">${value.ten}</h6>
                                                <p class="font-size-13 line-height mb-1">${value.tentacgia}</p>
                                                <div class="d-block">
                                                   <span class="font-size-13 text-warning">
                                                      <i class="fa fa-star"></i>
                                                      <i class="fa fa-star"></i>
                                                      <i class="fa fa-star"></i>
                                                      <i class="fa fa-star"></i>
                                                      <i class="fa fa-star"></i>
                                                   </span>
                                                </div>
                                             </div>
                                             <div class="price d-flex align-items-center">
                                                <span class="pr-1 old-price">$99</span>
                                                <h6><b>$${value.gia}</b></h6>
                                             </div>
                                             <div class="iq-product-action">
                                                <a href="javascript:void();"><i class="ri-shopping-cart-2-fill text-primary"></i></a>
                                                <a href="javascript:void();" class="ml-2"><i class="ri-heart-fill text-danger"></i></a>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>`;
          $(".product").append(html);
        });
      }

      // Update current page
    })
    .fail(function (error) {
      console.log("Error:", error);
    });
}
loadData(id_category, 1);