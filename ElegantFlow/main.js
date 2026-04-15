const PRODUCTS = {
    cadenas: [
        { id: 1, name: 'Cadena Clara 18k', price: 24900, img: 'assets/image1.jpg' },
        { id: 2, name: 'Eslabón Real', price: 39900, img: 'assets/image2.jpg' },
        { id: 3, name: 'Cadena Vintage Gold', price: 31900, img: 'assets/image3.jpg' },
        { id: 10, name: 'Cordón Italiano', price: 45000, img: 'assets/image1.jpg' }
    ],
    pulseras: [
        { id: 4, name: 'Pulsera Trenzada', price: 19900, img: 'assets/image4.jpg' },
        { id: 5, name: 'Esclava Minimal', price: 14900, img: 'assets/image5.jpg' }
    ],
    colgantes: [
        { id: 6, name: 'Medallón Sol', price: 12900, img: 'assets/image6.jpg' }
    ],
    anillos: [
        { id: 7, name: 'Anillo Fino Sutil', price: 9900, img: 'assets/image5.jpg' }
    ],
    aros: [
        { id: 8, name: 'Argollas Classic', price: 17900, img: 'assets/image6.jpg' }
    ],
    conjuntos: [
        { id: 9, name: 'Set Gala Completo', price: 59900, img: 'assets/image4.jpg' }
    ]
};

let cart = [];
const formatCLP = v => v.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

function renderCategory(category) {
    const list = PRODUCTS[category] || [];
    const wrapper = document.getElementById('productCarouselWrapper');
    document.getElementById('categoryTitle').textContent = category;

    if (list.length === 0) {
        wrapper.innerHTML = '<p class="text-center py-5">Próximamente más productos...</p>';
        return;
    }

    // Configuración para que el carrusel sea responsivo
    const itemsPerSlide = window.innerWidth < 768 ? 1 : (window.innerWidth < 992 ? 2 : 3);
    let carouselHTML = `
        <div id="carouselStore" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">`;

    for (let i = 0; i < list.length; i += itemsPerSlide) {
        carouselHTML += `<div class="carousel-item ${i === 0 ? 'active' : ''}"><div class="row justify-content-center">`;
        
        for (let j = i; j < i + itemsPerSlide && j < list.length; j++) {
            const p = list[j];
            carouselHTML += `
                <div class="col-11 col-md-5 col-lg-4">
                    <div class="card product-card shadow-sm p-2">
                        <img src="${p.img}" class="product-img" alt="${p.name}">
                        <div class="card-body text-center">
                            <h5 class="fw-bold">${p.name}</h5>
                            <p class="text-muted">${formatCLP(p.price)}</p>
                            <button class="btn btn-dark w-100 rounded-pill add-to-cart" data-id="${p.id}">
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>`;
        }
        carouselHTML += `</div></div>`;
    }

    carouselHTML += `
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselStore" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselStore" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>`;

    wrapper.innerHTML = carouselHTML;

    // Listeners para botones añadir
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.onclick = () => addToCart(Number(btn.dataset.id));
    });
}

function addToCart(id) {
    let product = null;
    for (let cat in PRODUCTS) {
        let found = PRODUCTS[cat].find(p => p.id === id);
        if (found) product = found;
    }

    const inCart = cart.find(item => item.id === id);
    if (inCart) {
        inCart.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-muted">Tu bolsa está vacía</p>';
        cartTotal.textContent = '$0';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
            <div>
                <h6 class="mb-0 small fw-bold">${item.name}</h6>
                <small class="text-muted">${item.qty} x ${formatCLP(item.price)}</small>
            </div>
            <div class="text-end">
                <div class="fw-bold">${formatCLP(item.price * item.qty)}</div>
                <button class="btn btn-sm text-danger p-0" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotal.textContent = formatCLP(total);
}

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

document.getElementById('clearCartBtn').onclick = () => {
    cart = [];
    updateCartUI();
};

document.getElementById('categoryList').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('#categoryList button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderCategory(e.target.dataset.category);
    }
});

// Checkout simple
document.getElementById('checkoutBtn').onclick = () => {
    if(cart.length === 0) return alert("El carrito está vacío");
    alert("¡Pedido recibido! Nos contactaremos por WhatsApp para coordinar el pago.");
    cart = [];
    updateCartUI();
    bootstrap.Offcanvas.getInstance(document.getElementById('cartCanvas')).hide();
};

// Inicializar
renderCategory('cadenas');
updateCartUI();