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
            <div class="rating" id="rating-${productIdCounter}">
                ${generateStars(rating, productIdCounter)}
            </div>
            <span class="rating-text" id="rating-text-${productIdCounter}" style="color: green;">${rating.toFixed(1)}/5 ${getRatingEmoji(rating)}</span>
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
    let starsHTML = "";
    
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHTML += `<img class="star-icon" src="star.png" alt="star" onclick="changeRating(${productId}, ${i + 1})">`;
        } else {
            starsHTML += `<img class="star-icon" src="empty-star.png" alt="empty star" onclick="changeRating(${productId}, ${i + 1})">`;
        }
    }
    return starsHTML;
}

function changeRating(productId, newRating) {
    const ratingDiv = document.getElementById(`rating-${productId}`);
    const ratingText = document.getElementById(`rating-text-${productId}`);
    
    ratingDiv.innerHTML = generateStars(newRating, productId);
    ratingText.textContent = `${newRating.toFixed(1)}/5 ${getRatingEmoji(newRating)}`;
    updateRatingAppearance(newRating, ratingText);
}

function getRatingEmoji(rating) {
    if (rating <= 2) {
        return "😢";
    } else if (rating === 3) {
        return "😐";
    } else if (rating >= 4) {
        return "😄";
    }
}

function updateRatingAppearance(rating, ratingText) {
    if (rating <= 2) {
        ratingText.style.color = "red";
    } else if (rating === 3) {
        ratingText.style.color = "orange";
    } else if (rating >= 4) {
        ratingText.style.color = "green";
    }
}

function buyProduct(productId) {
    const productDiv = document.getElementById(`product-${productId}`);
    const boughtCounter = productDiv.querySelector(".times-bought");
    let timesBought = parseInt(boughtCounter.textContent);
    timesBought++;
    boughtCounter.textContent = `${timesBought} times bought`;
}

// Adding products
addProduct("Smartphone", "Electronics", 5000, 5, "smartphone.jpg");
addProduct("Laptop", "Electronics", 12000, 5, "laptop.jpg");
addProduct("Headphones", "Electronics", 300, 5, "headphones.jpg");

addProduct("T-Shirt", "Clothing", 150, 5, "tshirt.jpg");
addProduct("Jeans", "Clothing", 300, 5, "jeans.jpg");
addProduct("Sneakers", "Clothing", 500, 5, "sneakers.jpg");

addProduct("Python Crash Course", "Books", 250, 5, "python_book.jpg");
addProduct("To Kill a Mockingbird", "Books", 150, 5, "mockingbird.jpg");
addProduct("The Great Gatsby", "Books", 200, 5, "gatsby.jpg");
