const produk = [
    {
        gambar: "images/products/athletic-cotton-socks-6-pairs.jpg",
        nama: "Kaus Kaki Katun Atletik Hitam dan Abu-Abu - 6 Pasang",
        rating: {
            bintang: 4.5,
            jumlah: 87,
        },
        harga: 15000,
    },
    {
        gambar: "images/products/intermediate-composite-basketball.jpg",
        nama: "Bola Basket Ukuran Menengah",
        rating: {
            bintang: 4,
            jumlah: 127,
        },
        harga: 30000,
    },
    {
        gambar: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        nama: "Kaos Katun Polos Dewasa - 2 Paket",
        rating: {
            bintang: 4.5,
            jumlah: 56,
        },
        harga: 20000,
    },
];

let productsHTML = "";

produk.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img
                    class="product-image"
                    src="${product.gambar}"
                />
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.nama}
            </div>

            <div class="product-rating-container">
                <img
                    class="product-rating-stars"
                    src="images/ratings/rating-${
                        product.rating.bintang * 10
                    }.png"
                />
                <div class="product-rating-count link-primary">${
                    product.rating.jumlah
                }</div>
            </div>

            <div class="product-price">Rp. ${product.harga.toLocaleString(
                "id"
            )}</div>

            <div class="product-quantity-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button class="add-to-cart-button button-primary">
                Add to Cart
            </button>
        </div>
    `;
});

// console.log(productHTML);

document.getElementById("product-grid").innerHTML = productsHTML;
