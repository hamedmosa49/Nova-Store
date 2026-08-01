// =========================
// Search Products
// =========================

const searchBox = document.getElementById("search-box");

if (searchBox) {

    searchBox.addEventListener("keyup", () => {

        let value = searchBox.value.toLowerCase();

        let products = document.querySelectorAll(".product-card");

        products.forEach((product) => {

            let name = product.dataset.name;

            if (name.includes(value)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}
// =========================
// Filter Products
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        let filter = button.dataset.filter;

        document.querySelectorAll(".product-card").forEach((product) => {

            if (filter === "all" || product.dataset.category === filter) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});

// =========================
// Add Products To Cart
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCounter = document.getElementById("cart-count");

const addButtons = document.querySelectorAll(".add-cart");


// تحديث العداد
if (cartCounter) {

    cartCounter.innerHTML = cart.length;

}


addButtons.forEach((button) => {

    button.addEventListener("click", () => {


        let product = button.parentElement;


        let item = {

            name: product.dataset.name,

            price: product.dataset.price,

            image: product.dataset.image,

            quantity: 1

        };


        cart.push(item);


        localStorage.setItem("cart", JSON.stringify(cart));


        // زيادة العداد

        if (cartCounter) {

            cartCounter.innerHTML = cart.length;

        }





    });


});
// =========================
// Display Cart Products
// =========================

const cartContainer = document.getElementById("cart-container");

const totalPrice = document.getElementById("total-price");


if (cartContainer) {


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let total = 0;


    cartContainer.innerHTML = "";


    cart.forEach((item, index) => {


        total += Number(item.price)*
        item.quantity;


        cartContainer.innerHTML += `

<div class="cart-item">


    <img src="${item.image}" alt="${item.name}">


    <div>

        <h3>${item.name}</h3>

        <p>$${item.price * item.quantity}</p>


        <div class="quantity">

            <button class="minus" data-index="${index}">
                -
            </button>


            <span>
                ${item.quantity}
            </span>


            <button class="plus" data-index="${index}">
                +
            </button>

        </div>


        <button class="remove-btn" data-index="${index}">
            Remove
        </button>


    </div>


</div>

`;


    });



    if (totalPrice) {

        totalPrice.innerHTML = total;

    }


}
// =========================
// Remove From Cart
// =========================

const removeButtons = document.querySelectorAll(".remove-btn");


removeButtons.forEach((button) => {


    button.addEventListener("click", () => {


        let index = button.dataset.index;


        let cart = JSON.parse(localStorage.getItem("cart")) || [];


        cart.splice(index, 1);


        localStorage.setItem("cart", JSON.stringify(cart));


        location.reload();


    });


});
// =========================
// Quantity Buttons
// =========================

const plusButtons = document.querySelectorAll(".plus");

const minusButtons = document.querySelectorAll(".minus");


// Increase

plusButtons.forEach((button) => {

    button.addEventListener("click", () => {


        let cart = JSON.parse(localStorage.getItem("cart")) || [];


        let index = button.dataset.index;


        cart[index].quantity++;


        localStorage.setItem("cart", JSON.stringify(cart));


        location.reload();


    });

});


// Decrease

minusButtons.forEach((button) => {

    button.addEventListener("click", () => {


        let cart = JSON.parse(localStorage.getItem("cart")) || [];


        let index = button.dataset.index;


        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        }


        localStorage.setItem("cart", JSON.stringify(cart));


        location.reload();


    });

});
// =========================
// Checkout Form
// =========================

const checkoutForm = document.getElementById("checkout-form");


if (checkoutForm) {


    checkoutForm.addEventListener("submit", (e) => {


        e.preventDefault();


        let name = document.getElementById("name").value;

        let phone = document.getElementById("phone").value;

        let address = document.getElementById("address").value;

        let agree = document.getElementById("agree").checked;



        if (name === "" || phone === "" || address === "") {


            document.getElementById("error-message").style.display = "flex";

            return;

        }



        if (!agree) {

            document.getElementById("error-message").style.display = "flex";

            return;

        }



        document.getElementById("success-message").style.display = "flex";


        localStorage.removeItem("cart");


        checkoutForm.reset();



    });


}
const closeSuccess = document.getElementById("close-success");


if (closeSuccess) {

    closeSuccess.addEventListener("click", () => {

        document.getElementById("success-message").style.display = "none";

    });

}
const closeError = document.getElementById("close-error");


if (closeError) {

    closeError.addEventListener("click", () => {

        document.getElementById("error-message").style.display = "none";

    });

}