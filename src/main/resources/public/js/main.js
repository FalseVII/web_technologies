

function renderList() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/product/find/all", true);
    xhr.send();
    xhr.onloadend = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("XHR:" + xhr.responseText);
                var json = JSON.parse(xhr.responseText);
              console.log(json);
                // Initialize a counter for the cards
                let cardCounter = 0;
                let htmlOutput = '';

                json.forEach(function (item) {
                    // Create a new row if the cardCounter is 0
                    if (cardCounter === 0) {
                        htmlOutput += '<div class="row w-100 justify-content-center">';
                    }

                    // Generate the card HTML with col-md-3 class and custom card-margin class
                    var htmlString = `<div class="col col-2 card-margin">
                    <div class="card fixed-size-card">
                        <img src="images/${item.image}" class="card-img-top" alt="..." >
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>X
                            <p class="card-text"><strong>${item.price}</strong> -- ${item.description}</p>
                            <button type="button" onclick="openModal(${item.id})" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                             Select
                            </button>
                        </div>
                    </div>
                  </div>`;
                    htmlOutput += htmlString;

                    // Increment the cardCounter
                    cardCounter++;

                    // Close the row and reset the cardCounter if 4 cards have been added
                    if (cardCounter === 4) {
                        htmlOutput += '</div>';
                        cardCounter = 0;
                    }
                });

// Close the row if there are less than 4 cards in the last row
                if (cardCounter > 0) {
                    htmlOutput += '</div>';
                }

// Assign the generated HTML string to the innerHTML
                document.getElementById("container").innerHTML = htmlOutput;
                }
            }
        }
    }

function openModal(id) {
    // Call the API endpoint with the provided product ID
    fetch(`/api/v1/product/find/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch product data');
            }
        })
        .then(data => {
            // Insert the data into the modal
            document.getElementById('productModalLabel').textContent = data.name;
            document.getElementById('productDescription').textContent = data.description;
            document.querySelector('#productModal .modal-body img').src = `images/${data.image}`;

            // Show the modal
            var productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
            productModal.show();
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
    showModal()
}

function showModal() {
    var productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
    productModal.show();
}

function registerForm() {
    document.getElementsByClassName("form-login")[0].innerHTML='<form style="width: 23rem;">\n' +
        '                            <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register</h3>\n' +
        '                            <div class="form-outline mb-4">\n' +
        '<div class="alert"></div>' +
        '                                <input type="text" id="register_username" class="form-control form-control-lg" />\n' +
        '                                <label class="form-label" for="form2Example18">Username</label>\n' +
        '                            </div>\n' +
        '                            <div class="form-outline mb-4">\n' +
        '                                <input type="password" id="register_password" class="form-control form-control-lg" />\n' +
        '                                <label class="form-label" for="form2Example28">Password</label>\n' +
        '                            </div>\n' +
        '                            <div class="form-outline mb-4">\n' +
        '                                <input type="password" id="register_password_2" class="form-control form-control-lg" />\n' +
        '                                <label class="form-label" for="form2Example28">Repeat Password</label>\n' +
        '                            </div>\n' +
        '                            <div class="pt-1 mb-4">\n' +
        '                                <button onclick="registerUser()" class="btn btn-info btn-lg btn-block" type="button">Register</button>\n' +
        '                            </div>\n' +
        '                            <p>Back to login? <a href="#!" onclick="loginForm();" class="link-info">Login here</a></p>\n' +
        '                        </form>';
}
function loginForm() {
    document.getElementsByClassName("form-login")[0].innerHTML='<form style="width: 23rem;">\n' +
        '                            <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>\n' +
        '                            <div class="form-outline mb-4">\n' +
        '<div class="alert"></div>' +
        '                                <input type="email" id="login_username" class="form-control form-control-lg" />\n' +
        '                                <label class="form-label" for="form2Example18">Username</label>\n' +
        '                            </div>\n' +
        '                            <div class="form-outline mb-4">\n' +
        '                                <input type="password" id="login_password" class="form-control form-control-lg" />\n' +
        '                                <label class="form-label" for="form2Example28">Password</label>\n' +
        '                            </div>\n' +
        '                            <div class="pt-1 mb-4">\n' +
        '                                <button onclick="loginUser()" class="btn btn-info btn-lg btn-block" type="button">Login</button>\n' +
        '                            </div>\n' +
        '                            <p>Don\'t have an account? <a href="#!" onclick="registerForm();" class="link-info">Register here</a></p>\n' +
        '                        </form>';
}
function registerUser() {
    //grab values from form, and compare passwords
    var username = document.getElementById("register_username").value;
    var password = document.getElementById("register_password").value;
    var password_2 = document.getElementById("register_password_2").value;
    if (password === password_2) {
        xhr = new XMLHttpRequest();
        xhr.open("POST", "/register", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            username: username,
            password: password,
            "type":"customer"
        })
        );
        xhr.onloadend = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("XHR:" + xhr.responseText);
                    var json = JSON.parse(xhr.responseText);
                    if (json.username == username) {
                        document.getElementsByClassName("alert")[0].innerHTML='<div class="alert alert-success" role="alert">\n' +
                            '  User registered successfully!\n' +
                            '</div>';
                    } else {
                        document.getElementsByClassName("alert")[0].innerHTML='<div class="alert alert-danger" role="alert">\n' +
                            '  User already exists!\n' +
                            '</div>';
                    }
                } else {
                    console.log("error");
                }
            }
        }
        }else {
        document.getElementsByClassName("alert")[0].innerHTML='<div class="alert alert-danger" role="alert">\n' +
            '  Passwords do not match!\n' +
            '</div>';
    }
}
let username;
function loginUser() {
    username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    var data = {
        username: username,
        password: password
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/authenticate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(data));
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("XHR:" + xhr.responseText);
                var json = JSON.parse(xhr.responseText);
                if (json.token != null) {
                    document.getElementsByClassName("alert")[0].innerHTML='<div class="alert alert-success" role="alert">\n' +
                        '  User logged in successfully!\n' +
                        '</div>';
                    xhr = new XMLHttpRequest();
                    xhr.open("GET", "/users/type/" + username, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send();
                    xhr.onreadystatechange = function () {
                       if (xhr.readyState == 4){
                           if (xhr.status == 200){
                                 if (xhr.responseText == "customer"){
                                     loadUserMainContent()
                                 }else if (xhr.responseText == "admin"){
                                     loadAdminMainContent()
                                 }
                           }
                       }
                    }
                }
            }else {
                document.getElementsByClassName("alert")[0].innerHTML='<div class="alert alert-danger" role="alert">\n' +
                    '  User does not exist!\n' +
                    '</div>';
            }
        }
    }
}

function loadAdminMainContent() {
    document.getElementsByClassName("main-body")[0].innerHTML='' +
        '<nav class="navbar navbar-expand-lg navbar-light bg-light">\n' +
        '  <div class="container-fluid">\n' +
        '    <button\n' +
        '      class="navbar-toggler"\n' +
        '      type="button"\n' +
        '      data-mdb-toggle="collapse"\n' +
        '      data-mdb-target="#navbarTogglerDemo03"\n' +
        '      aria-controls="navbarTogglerDemo03"\n' +
        '      aria-expanded="false"\n' +
        '      aria-label="Toggle navigation"\n' +
        '    >\n' +
        '      <i class="fas fa-bars"></i>\n' +
        '    </button>\n' +
        '    <img src="https://cdn-icons-png.flaticon.com/512/5088/5088770.png" width="50" height="50">\n' +
        '    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">\n' +
        '      <ul class="navbar-nav me-auto mb-2 mb-lg-0">\n' +
        '        <li class="nav-item">\n' +
        '          <a class="nav-link active" aria-current="page" href="#">Home</a>\n' +
        '        </li>\n' +
        '        <li class="nav-item">\n' +
        '          <a class="nav-link" href="#">Admin Panel</a>\n' +
        '        </li>\n' +
        '        <li class="nav-item">\n' +
        '          <a class="nav-link" onclick="loadProductsPage()" href="#">Products</a>\n' +
        '        </li>\n' +
        '        <li class="nav-item">\n' +
        '          <a class="nav-link" href="#" onclick="loadUploadContent()">Uploads</a>\n' +
        '        </li>\n' +
        '      </ul>\n' +
        '      <form class="d-flex input-group w-auto">\n' +
        '        <input\n' +
        '          type="search"\n' +
        '          class="form-control"\n' +
        '          placeholder="Search an item!"\n' +
        '          aria-label="Search"\n' +
        '        />\n' +
        '        <button\n' +
        '          class="btn btn-outline-primary"\n' +
        '          type="button"\n' +
        '          data-mdb-ripple-color="dark"\n' +
        '        >\n' +
        '          Search\n' +
        '        </button>\n' +
        '      </form>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</nav>'+
        '    <!-- Page Content -->\n' +
        '    <div id="page-content-wrapper">\n' +
        '<h1>Our selection at current time:</h1>' +
        '<div id="container">' +
        '               ' +
        '</div>' +
        '                    </div>\n' +
        '<!-- Modal -->\n' +
        '<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title" id="productModalLabel">Product Title</h5>\n' +
        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <img src="" alt="Product Image" class="img-fluid" />\n' +
        '        <p class="mt-3" id="productDescription">Product description goes here...</p>\n' +
        '    <div id="alert"></div>\n' +
        '                                    <form>\n' +
        '                                        <div class="mb-3">\n' +
        '                                            <select id="gpu" class="form-select" aria-label="Default select example">\n' +
        '                                                <option selected>Graphics Card</option>\n' +
        '                                                <option value="1">RTX 4080</option>\n' +
        '                                                <option value="2">RTX 3070</option>\n' +
        '                                                <option value="3">RTX 2060</option>\n' +
        '                                            </select>\n' +
        '                                        </div>\n' +
        '                                        <div class="mb-3">\n' +
        '                                            <select id="cpu" class="form-select" aria-label="Default select example">\n' +
        '                                                <option selected>Processor</option>\n' +
        '                                                <option value="1">Ryzen 9</option>\n' +
        '                                                <option value="2">I7 13th Gen</option>\n' +
        '                                                <option value="3">Ryzen 7</option>\n' +
        '                                            </select>\n' +
        '                                        </div>\n' +
        '                                        <div class="mb-3">\n' +
        '                                            <select id="cooling" class="form-select" aria-label="Default select example">\n' +
        '                                                <option selected>Cooling</option>\n' +
        '                                                <option value="1">Air Cooled</option>\n' +
        '                                                <option value="2">Water Cooled</option>\n' +
        '                                                <option value="3">Custom Water loop</option>\n' +
        '                                            </select>\n' +
        '                                        </div>\n' +
        '                                    </form>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n' +
        '        <button type="button" class="btn btn-primary" onclick="gatherOrderData()">Confirm Order</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>'
    renderList()
}

function loadUserMainContent() {
    document.getElementsByClassName("main-body")[0].innerHTML='' +
        '<nav class="navbar navbar-expand-lg navbar-light bg-light">\n' +
        '  <div class="container-fluid">\n' +
        '    <button\n' +
        '      class="navbar-toggler"\n' +
        '      type="button"\n' +
        '      data-mdb-toggle="collapse"\n' +
        '      data-mdb-target="#navbarTogglerDemo03"\n' +
        '      aria-controls="navbarTogglerDemo03"\n' +
        '      aria-expanded="false"\n' +
        '      aria-label="Toggle navigation"\n' +
        '    >\n' +
        '      <i class="fas fa-bars"></i>\n' +
        '    </button>\n' +
        '    <img src="https://cdn-icons-png.flaticon.com/512/5088/5088770.png" width="50" height="50">\n' +
        '    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">\n' +
        '      <ul class="navbar-nav me-auto mb-2 mb-lg-0">\n' +
        '        <li class="nav-item">\n' +
        '          <a class="nav-link active" aria-current="page" onclick="loadUserMainContent()" href="#">Home</a>\n' +
        '        </li>\n' +
        '        <li class="nav-item">\n' +
        '          <a class="nav-link" onclick="userOrdersPage()" href="#">Orders</a>\n' +
        '        </li>\n' +
        '      </ul>\n' +
        '      <form class="d-flex input-group w-auto">\n' +
        '        <input\n' +
        '          type="search"\n' +
        '          class="form-control"\n' +
        '          placeholder="Search an item!"\n' +
        '          aria-label="Search"\n' +
        '        />\n' +
        '        <button\n' +
        '          class="btn btn-outline-primary"\n' +
        '          type="button"\n' +
        '          data-mdb-ripple-color="dark"\n' +
        '        >\n' +
        '          Search\n' +
        '        </button>\n' +
        '      </form>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</nav>'+
        '    <!-- Page Content -->\n' +
        '    <div id="page-content-wrapper" >\n' +
        '<h3>Please select a product:</h3>' +
        '<div id="container">' +
        '               ' +
        '</div>' +
        '                    </div>\n' +
        '<!-- Modal -->\n' +
        '<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title" id="productModalLabel">Product Title</h5>\n' +
        '        <button type="button" class="btn-close" onclick="closeModal()" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <img src="" alt="Product Image" class="img-fluid" />\n' +
        '        <p class="mt-3" id="productDescription">Product description goes here...</p>\n' +
        '    <div id="alert"></div>\n' +
         '                                    <form>\n' +
    '                                        <div class="mb-3">\n' +
    '                                            <select id="gpu" class="form-select" aria-label="Default select example">\n' +
    '                                                <option selected>Graphics Card</option>\n' +
    '                                                <option value="RTX 4080">RTX 4080</option>\n' +
    '                                                <option value="RTX 3070">RTX 3070</option>\n' +
    '                                                <option value="RTX 2060">RTX 2060</option>\n' +
    '                                            </select>\n' +
    '                                        </div>\n' +
    '                                        <div class="mb-3">\n' +
    '                                            <select id="cpu" class="form-select" aria-label="Default select example">\n' +
    '                                                <option selected>Processor</option>\n' +
    '                                                <option value="Ryzen 9">Ryzen 9</option>\n' +
    '                                                <option value="I7 13th Gen">I7 13th Gen</option>\n' +
    '                                                <option value="Ryzen 7">Ryzen 7</option>\n' +
    '                                            </select>\n' +
    '                                        </div>\n' +
    '                                        <div class="mb-3">\n' +
    '                                            <select id="cooling" class="form-select" aria-label="Default select example">\n' +
    '                                                <option selected>Cooling</option>\n' +
    '                                                <option value="Air Cooled">Air Cooled</option>\n' +
    '                                                <option value="Water Cooled">Water Cooled</option>\n' +
    '                                                <option value="Custom Water loop">Custom Water loop</option>\n' +
    '                                            </select>\n' +
    '                                        </div>\n' +
    '                                    </form>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" onclick="closeModal()" data-bs-dismiss="modal">Close</button>\n' +
        '        <button type="button" class="btn btn-primary" onclick="gatherOrderData()">Confirm Order</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>'
    renderList()
}

function closeModal() {
    $('.productModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}

function loadUploadContent() {
    document.getElementById("page-content-wrapper").innerHTML = '<header class="w3-row w3-center">\n' +
        '            <h1>File Upload with Spring</h1>\n' +
        '            <h3>Online Reference <a href="https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/file-upload-Spring-Boot-Ajax-example#:~:text=Spring%20Boot%20file%20uploader&text=Create%20a%20Spring%20%40Controller%20class,Spring%20file%20upload%20was%20successful." target="_blank">[Click Here]</a></h3>\n' +
        '        </header>\n' +
        '        <!-- HTML5 Input Form Elements -->\n' +
        '        <div class="w3-container w3-center">\n' +
        '            <input id="fileupload" type="file" name="fileupload" class="w3-input"  />\n' +
        '            <button class="w3-button w3-orange" id="btnUpload" onclick="uploadFile()"> Upload </button>\n' +
        '        </div>\n' +
        '        <div class="w3-row w3-margin w3-center w3-green" id="theResponse"><h2>Responce will appear here</h2></div>'
}

function gatherOrderData() {
    const gpu = document.getElementById('gpu').value;
    const cpu = document.getElementById('cpu').value;
    const cooling = document.getElementById('cooling').value;
    const caseName = document.getElementById('productModalLabel').innerText;
    const alertDiv = document.getElementById('alert');

    if (gpu === 'Graphics Card' || cpu === 'Processor' || cooling === 'Cooling') {
        alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">Please select all options before confirming the order.</div>';
        return;
    }

    const orderData = {
        case_name: caseName,
        gpu_name: gpu,
        cpu_name: cpu,
        cooling_name: cooling,
        username:username,
        status:"pending"
    };

    // Clear the alert div
    alertDiv.innerHTML = '';

    console.log(orderData);

    xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/order/create/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(orderData));
    xhr.onload = function () {
        if (xhr.status === 200) {
            alertDiv.innerHTML = '<div class="alert alert-success" role="alert">Order placed successfully.</div>';
        } else {
            alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again.</div>';
        }
    }
}

function loadProductsPage() {
    document.getElementById("page-content-wrapper").innerHTML = '<div class="container-fluid">\n' +
        '        <div class="row">\n' +
        '            <div class="col-lg-6">\n' +
        '                <h3>Add Product</h3>\n' +
        '                <form>\n' +
        '                    <div class="mb-3">\n' +
        '<div id="alert"></div>' +
        '                        <label for="id" class="form-label">ID</label>\n' +
        '                        <input type="number" class="form-control" id="id" placeholder="Enter product ID">\n' +
        '                    </div>\n' +
        '                    <div class="mb-3">\n' +
        '                        <label for="name" class="form-label">Name</label>\n' +
        '                        <input type="text" class="form-control" id="name" placeholder="Enter product name">\n' +
        '                    </div>\n' +
        '                    <div class="mb-3">\n' +
        '                        <label for="description" class="form-label">Description</label>\n' +
        '                        <textarea class="form-control" id="description" rows="3" placeholder="Enter product description"></textarea>\n' +
        '                    </div>\n' +
        '                    <div class="mb-3">\n' +
        '                        <label for="image" class="form-label">Image</label>\n' +
        '                        <textarea class="form-control" id="image" rows="3" placeholder="Enter product image"></textarea>\n' +
        '                    </div>\n' +
        '                    <div class="mb-3">\n' +
        '                        <label for="price" class="form-label">Price</label>\n' +
        '                        <input type="number" step="0.01" class="form-control" id="price" placeholder="Enter product price">\n' +
        '                    </div>\n' +
        '                    <button type="submit" onclick="createProduct()" class="btn btn-primary">Add Product</button>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="col-lg-6">\n' +
        '                <h3>Current Products</h3>\n' +
        '                <!-- Display the current products in the database here -->\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>'

    fetch('/api/v1/product/find/all')
        .then(response => response.json())
        .then(products => {
            const productListContainer = document.querySelector('.col-lg-6:nth-child(2)');
            productList = new ProductList(products, productListContainer);
            productList.render();
        });

}
let  productList;

async function createProduct() {

    const idInput = document.getElementById("id");
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const priceInput = document.getElementById("price");
    const productImage = document.getElementById("image");

    const newProduct = {
        image: productImage.value,
        id: parseInt(idInput.value),
        name: nameInput.value,
        description: descriptionInput.value,
        price: parseFloat(priceInput.value),
    };

    try {
        const response = await fetch("/api/v1/product/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            console.log("Product created successfully");
            // Clear input fields
            idInput.value = "";
            nameInput.value = "";
            descriptionInput.value = "";
            priceInput.value = "";
            document.getElementById("alert").innerHTML = '<div class="alert alert-success" role="alert">Product created successfully.</div>';

// Refresh the product list
            fetch('/api/v1/product/find/all')
                .then(response => response.json())
                .then(products => {
                    productList.products = products;
                    productList.render();
                }
            );

        } else {
          document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again.</div>';
        }
    } catch (error) {
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again.</div>';
    }
}
class ProductList {
    constructor(products, container) {
        this.products = products;
        this.container = container;
    }

    render() {
        this.container.innerHTML = '';

        this.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'mb-3 border p-3';

            const productName = document.createElement('h4');
            productName.textContent = product.name;
            productDiv.appendChild(productName);

            const productId = document.createElement('p');
            productId.textContent = "Product ID: " + product.id;
            productDiv.appendChild(productId);


            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productDiv.appendChild(productDescription);

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price.toFixed(2)}`;
            productDiv.appendChild(productPrice);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteProduct(product.id);
            });
            productDiv.appendChild(deleteButton);

            this.container.appendChild(productDiv);
        });
    }
}

function deleteProduct(productId) {
    fetch(`/api/v1/product/delete/${productId}`, {
        method: 'DELETE'
    }).then(response => {
        document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">Product deleted successfully.</div>';
        fetch('/api/v1/product/find/all')
            .then(response => response.json())
            .then(products => {
                    productList.products = products;
                    productList.render();
                }
            );
    }
    );
}




    function userOrdersPage(){
    document.getElementById("page-content-wrapper").innerHTML = ' <div class="container mt-4">\n' +
        '    <h1 class="mb-4">User Orders</h1>\n' +
        '    <ul class="nav nav-tabs mb-4">\n' +
        '      <li class="nav-item">\n' +
        '        <a class="nav-link active" id="pending-tab" data-bs-toggle="tab" href="#pending">Pending</a>\n' +
        '      </li>\n' +
        '      <li class="nav-item">\n' +
        '        <a class="nav-link" id="paid-tab" data-bs-toggle="tab" href="#paid">Paid</a>\n' +
        '      </li>\n' +
        '      <li class="nav-item">\n' +
        '        <a class="nav-link" id="processing-tab" data-bs-toggle="tab" href="#processing">Processing</a>\n' +
        '      </li>\n' +
        '      <li class="nav-item">\n' +
        '        <a class="nav-link" id="ready-for-collection-tab" data-bs-toggle="tab" href="#ready-for-collection">Ready for Collection</a>\n' +
        '      </li>\n' +
        '    </ul>\n' +
        '    <div class="tab-content">\n' +
        '      <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">\n' +
        '        <!-- Add pending orders content here -->\n' +
        '      </div>\n' +
        '      <div class="tab-pane fade" id="Paid" role="tabpanel" aria-labelledby="paid-tab">\n' +
        '        <!-- Add paid orders content here -->\n' +
        '      </div>\n' +
        '      <div class="tab-pane fade" id="processing" role="tabpanel" aria-labelledby="processing-tab">\n' +
        '        <!-- Add processing orders content here -->\n' +
        '      </div>\n' +
        '      <div class="tab-pane fade" id="ready-for-collection" role="tabpanel" aria-labelledby="ready-for-collection-tab">\n' +
        '        <!-- Add ready for collection orders content here -->\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>' +
        '<div class="modal fade" id="updateOrderModal" tabindex="-1" aria-labelledby="updateOrderModalLabel" aria-hidden="true">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5  id="order-id" class="modal-title" id="updateOrderModalLabel"> </h5>\n' +
        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        <div id="alert"></div>\n' +
        '        <form>\n' +
        '          <div class="mb-3">\n' +
        '<h4 id="gpu_name">Currently: </h4>' +
        '            <select id="gpu" class="form-select" aria-label="Default select example" data-original-value="">\n' +
        '              <option value="" selected>Graphics Card</option>\n' +
        '              <option value="RTX 4080">RTX 4080</option>\n' +
        '              <option value="RTX 3070">RTX 3070</option>\n' +
        '              <option value="RTX 2060">RTX 2060</option>\n' +
        '            </select>\n' +
        '          </div>\n' +
        '          <div class="mb-3">\n' +
        '<h4 id="cpu_name"></h4>' +
        '            <select id="cpu" class="form-select" aria-label="Default select example" data-original-value="">\n' +
        '              <option value="" selected>Processor</option>\n' +
        '              <option value="Ryzen 9">Ryzen 9</option>\n' +
        '              <option value="I7 13th Gen">I7 13th Gen</option>\n' +
        '              <option value="Ryzen 7">Ryzen 7</option>\n' +
        '            </select>\n' +
        '          </div>\n' +
        '          <div class="mb-3">\n' +
        '<h4 id="cooling_name"></h4>' +
        '            <select id="cooling" class="form-select" aria-label="Default select example" data-original-value="">\n' +
        '              <option value="" selected>Cooling</option>\n' +
        '              <option value="Air Cooled">Air Cooled</option>\n' +
        '              <option value="Water Cooled">Water Cooled</option>\n' +
        '              <option value="Custom Water loop">Custom Water loop</option>\n' +
        '            </select>\n' +
        '          </div>\n' +
        '        </form>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n' +
        '        <button id="order_button" type="button" class="btn btn-primary" onclick="">Save changes</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>'
    loadOrders();
}

function loadOrders() {
    xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/v1/order/find/username/' + username, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            var orders = JSON.parse(xhr.responseText);
            try{
                removeAllOrders();
            }catch (e) {
                console.log(e);
            }
            displayOrders(orders);
        } else {
            console.log('Something went wrong, please try again.');
        }
    }
}
function removeAllOrders() {
    document.getElementById("pending").innerHTML = "";
    document.getElementById("paid").innerHTML = "";
    document.getElementById("processing").innerHTML = "";
    document.getElementById("ready-for-collection").innerHTML = "";
}

async function openUpdateModal(id) {
    document.getElementById("alert").innerHTML = "";
    const updateOrderModalElement = document.getElementById("updateOrderModal");
    const response = await fetch(`/api/v1/order/find/${id}`);
    const order = await response.json();

    document.getElementById("order-id").innerText = "Update Order ID:" + order.id;
    document.getElementById("gpu_name").innerText = "Currently: " + order.gpu_name;
    document.getElementById("cpu_name").innerText = "Currently: " +order.cpu_name;
    document.getElementById("cooling_name").innerText ="Currently: " + order.cooling_name;
    document.getElementById("order_button").setAttribute("onclick", "saveOrderUpdates(" + order.id + ")");

    var updateOrderModal = new bootstrap.Modal(updateOrderModalElement);
    updateOrderModal.show();
}

function displayOrders(orders) {
    orders.forEach(function(order) {
        var orderStatus = order.status;
        var payButton = orderStatus === 'pending' ? `<button type="button" class="btn btn-primary me-2" onclick="payForOrder(${order.id})">Pay</button>` : '';
        var updateButton = orderStatus === 'pending' ? `<button type="button" class="btn btn-warning" onclick="openUpdateModal(${order.id})" data-bs-toggle="modal" data-bs-target="#updateOrderModal">Update</button>` : '';

        var orderContent = `<div class="card mb-3">
                          <div class="card-body">
                            <h5 class="card-title">Order ID: ${order.id} - ${order.case_name}</h5>
                            <p class="card-text">Username: ${order.username}</p>
                            <p class="card-text">Graphics Card: ${order.gpu_name}</p>
                            <p class="card-text">Processor: ${order.cpu_name}</p>
                            <p class="card-text">Cooling: ${order.cooling_name}</p>
                            ${payButton}
                            ${updateButton}
                          </div>
                        </div>`;
        document.getElementById(orderStatus).innerHTML += orderContent;
    });
}
async function saveOrderUpdates(orderId) {
    cpu = document.getElementById('cpu').value;
    gpu = document.getElementById('gpu').value;
    cooling = document.getElementById('cooling').value;

    if(cpu === "" || gpu === "" || cooling === ""){
        document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Please select all options!</div>';
        return;
    }

    const response = await fetch(`/api/v1/order/find/${orderId}`);
    const order = await response.json();
    console.log(order);

    const json = JSON.stringify({
        "username": username,
        "case_name": order.case_name,
        "status": order.status,
        "cpu_name": cpu,
        "gpu_name": gpu,
        "cooling_name": cooling
    })

    console.log('Updating order with ID:', orderId);
    xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/v1/order/update/' + orderId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(json)
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById('alert').innerHTML = '<div class="alert alert-success" role="alert">Order updated successfully!</div>';
            loadOrders();
        } else {
            document.getElementById('alert').innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again.</div>';
        }
    }
}
function payForOrder(orderId) {
    console.log('Paying for order with ID:', orderId);
    xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/v1/order/update/status/' + orderId + "/" + "Paid", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            var order = JSON.parse(xhr.responseText);
            loadOrders();
        } else {
            console.log('Something went wrong, please try again.');
        }
    }

}
