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

