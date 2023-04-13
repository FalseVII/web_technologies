function adminPanel() {

}

function ordersPaneluser() {
    
}

let product;

$(document).ready(function () {
    $(".block").click(function(){
        $(this).toggleClass('active');
        $(".price").removeClass('active');
        $(".active .price").addClass('active');
    });


    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });

    function renderList() {
        const products = [
            // Add your product objects here
            // Example: { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150', price: '10.00' },
        ];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/v1/product/find/all", true);
        xhr.send();
        xhr.onloadend = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("XHR:" + xhr.responseText);
                    var json = JSON.parse(xhr.responseText);
                    for (var i = 0; i < json.length; i++) {
                        products.push({
                            id: json[i].id,
                            name: json[i].name,
                            image: json[i].image,
                            price: json[i].price
                        });
                    }
                    displayProducts();
                    createPagination();
                } else {
                    console.log("error");
                }
            }
        }



        const itemsPerPage = 8;
        let currentPage = 1;

        function displayProducts() {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            const displayProducts = products.slice(start, end);

            let productHtml = '';
            for (const product of displayProducts) {
                productHtml += `
      <div class="col-md-3">
        <div class="card mb-4">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
          </div>
        </div>
      </div>
    `;
            }

            document.getElementById('productContainer').innerHTML = productHtml;
        }

        function createPagination() {
            const pageCount = Math.ceil(products.length / itemsPerPage);

            let paginationHtml = '';
            for (let i = 1; i <= pageCount; i++) {
                paginationHtml += `
      <li class="page-item-order${i === currentPage ? ' active' : ''}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
            }

            document.querySelector('.pagination').innerHTML = paginationHtml;
        }

        function changePage(page) {
            currentPage = page;
            displayProducts();
            createPagination();
        }

    }

    var exampleModal = document.getElementById('exampleModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget
        // Extract info from data-bs-* attributes
        product = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title')
        var modalBodyInput = exampleModal.querySelector('#recipient-name')

        modalTitle.textContent = product
        modalBodyInput.textContent = product
    })
    $('#exampleModal').on('hide.bs.modal', function () {
        document.getElementById("alert").innerHTML = "";
    })
});



function createOrder() {
    if(product === "NZXT 500i"){
        var product_id = 1;
    }else if(product === "Fractal Design North"){
        var product_id = 2;
    }else if(product === "Fractal Design Meshify Bundle"){
        var product_id = 3;
    }else if(product === "Phanteks Eclipse"){
        var product_id = 4;
    }else if(product === "Lian Li Lancool"){
        var product_id = 5;
    }else if(product === "Lian Li PC-O1"){
        var product_id = 6;
    }else if(product === "NZXT H7 Flow"){
        var product_id = 7;
    }else if(product === "Cooler Master HAF"){
        var product_id = 8;
    }
    console.log(product_id);

    var data = {
        "username": document.getElementById("username").value,
        "status": "pending",
        "productId": product_id
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/v1/order/create/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("XHR:" + xhr.responseText);
                document.getElementById("alert").innerHTML = "<div class=\"alert alert-success\" role=\"alert\">\n" +
                    "Order Sucessfully completed.\n" +
                    "</div>";
            } else {
                document.getElementById("alert").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">\n" +
                    "Error creating order.\n" +
                    "</div>";
            }
        }
    };
}

