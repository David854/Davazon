let productIdCounter = 1;

function addProduct(title, category, price, rating, imageSrc) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.id = `product-${productIdCounter}`;

    productDiv.innerHTML = `
        <div class="product-info">
            <h3>${title}</h3>
            <div class="product-image-container">
                <img src="${imageSrc}" alt="${title}" class="product-image">
            </div>
            <p>Category: ${category}</p>
            <p>Price: ${price} EGP</p>
            <div class="rating">
                ${generateStars(rating, productIdCounter)}
                <span class="rating-text">${rating.toFixed(1)}/5</span>
            </div>
        </div>
        <div class="buy-section">
            <span class="times-bought">0 times bought</span>
            <button class="buy-button" onclick="buyProduct(${productIdCounter})">Buy</button>
        </div>
    `;

    const section = document.getElementById(category.toLowerCase());
    section.querySelector(".products").appendChild(productDiv);

    const productImage = productDiv.querySelector(".product-image");
    productImage.style.maxWidth = "100%";
    productImage.style.maxHeight = "100%";
    productImage.style.width = "auto";
    productImage.style.height = "auto";
    productImage.style.objectFit = "contain";

    productIdCounter++;
}

function generateStars(rating, productId) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let starsHTML = "";
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += `<img class="star-icon" src="star.png" alt="star" onclick="changeRating(${productId}, ${i + 1})">`;
        } else if (halfStar && i === fullStars) {
            starsHTML += `<img class="star-icon" src="half-star.png" alt="half star" onclick="changeRating(${productId}, ${fullStars + 0.5})">`;
        } else {
            starsHTML += `<img class="star-icon" src="empty-star.png" alt="empty star" onclick="changeRating(${productId}, ${i + 1})">`;
        }
    }
    
    return starsHTML;
}


function changeRating(productId, newRating) {
    const productDiv = document.getElementById(`product-${productId}`);
    const ratingDiv = productDiv.querySelector(".rating");
    const ratingText = productDiv.querySelector(".rating-text");
    ratingDiv.innerHTML = generateStars(newRating, productId);
    ratingText.textContent = `${newRating.toFixed(1)}/5`;
}

function buyProduct(productId) {
    const productDiv = document.getElementById(`product-${productId}`);
    const boughtCounter = productDiv.querySelector(".times-bought");
    let timesBought = parseInt(boughtCounter.textContent);
    timesBought++;
    boughtCounter.textContent = `${timesBought} times bought`;
}

// Adding products
addProduct("Smartphone", "Electronics", 5000, 4.5, "smartphone.jpg");
addProduct("Laptop", "Electronics", 12000, 4.0, "laptop.jpg");
addProduct("Headphones", "Electronics", 300, 3.5, "headphones.jpg");

addProduct("T-Shirt", "Clothing", 150, 4.2, "tshirt.jpg");
addProduct("Jeans", "Clothing", 300, 4.8, "jeans.jpg");
addProduct("Sneakers", "Clothing", 500, 4.0, "sneakers.jpg");

addProduct("Python Crash Course", "Books", 250, 4.7, "python_book.jpg");
addProduct("To Kill a Mockingbird", "Books", 150, 4.3, "mockingbird.jpg");
addProduct("The Great Gatsby", "Books", 200, 4.5, "gatsby.jpg");
