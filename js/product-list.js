class ProductListHerbal {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container-herbal');
    this.productService = new ProductsService();
    this.sortDirection = 'ascending';
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());    
  }
  async renderProducts() {
    let ProductListHerbalDomString = '';
    const products = await this.productService.getProducts();
    [...products]
      .sort( (a, b) => this.sortDirection === 'ascending' 
                         ? a.price - b.price
                         : b.price - a.price)
      .forEach(product => {
        ProductListHerbalDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text flex-fill">${product.description}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-info" data-bs-toggle="modal"
                          data-bs-target="#productInfoModal" data-id="${product.id}">Деталі
                        </button>
                        <button class="btn btn-primary buy" data-id="${product.id}">
                          $${product.price} Купити
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = ProductListHerbalDomString;
  }
  async addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
    // document.querySelector('.sort-asc').addEventListener('click', async () => {
    //     this.sortDirection = 'ascending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
    // document.querySelector('.sort-desc').addEventListener('click', async () => {
    //     this.sortDirection = 'descending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/products/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} - Buy`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Продукт додано до кошика:)');
  }
}

class ProductListSupplements {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container-supplements');
    this.productService = new ProductsService();
    this.sortDirection = 'ascending';
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let ProductListSupplementsDomString = '';
    const products = await this.productService.getProducts();
    [...products]
      .sort( (a, b) => this.sortDirection === 'ascending' 
                         ? a.price - b.price
                         : b.price - a.price)
      .forEach(product => {
        ProductListSupplementsDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text flex-fill">${product.description}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-info" data-bs-toggle="modal"
                          data-bs-target="#productInfoModal" data-id="${product.id}">Info
                        </button>
                        <button class="btn btn-primary buy" data-id="${product.id}">
                          $${product.price} - Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = ProductListSupplementsDomString;
  }
  async addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
    // document.querySelector('.sort-asc').addEventListener('click', async () => {
    //     this.sortDirection = 'ascending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
    // document.querySelector('.sort-desc').addEventListener('click', async () => {
    //     this.sortDirection = 'descending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/products/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} - Buy`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Продукт додано до кошика:)');
  }
}

class ProductListSports {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container-sports');
    this.productService = new ProductsService();
    this.sortDirection = 'ascending';
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let ProductListSportsDomString = '';
    const products = await this.productService.getProducts();
    [...products]
      .sort( (a, b) => this.sortDirection === 'ascending' 
                         ? a.price - b.price
                         : b.price - a.price)
      .forEach(product => {
        ProductListSportsDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text flex-fill">${product.description}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-info" data-bs-toggle="modal"
                          data-bs-target="#productInfoModal" data-id="${product.id}">Info
                        </button>
                        <button class="btn btn-primary buy" data-id="${product.id}">
                          $${product.price} - Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = ProductListSportsDomString;
  }
  async addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
    // document.querySelector('.sort-asc').addEventListener('click', async () => {
    //     this.sortDirection = 'ascending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
    // document.querySelector('.sort-desc').addEventListener('click', async () => {
    //     this.sortDirection = 'descending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/products/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} - Buy`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Продукт додано до кошика:)');
  }
}

class ProductListProbiotics {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container-probiotics');
    this.productService = new ProductsService();
    this.sortDirection = 'ascending';
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let ProductListProbioticsDomString = '';
    const products = await this.productService.getProducts();
    [...products]
      .sort( (a, b) => this.sortDirection === 'ascending' 
                         ? a.price - b.price
                         : b.price - a.price)
      .forEach(product => {
        ProductListProbioticsDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text flex-fill">${product.description}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-info" data-bs-toggle="modal"
                          data-bs-target="#productInfoModal" data-id="${product.id}">Info
                        </button>
                        <button class="btn btn-primary buy" data-id="${product.id}">
                          $${product.price} - Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = ProductListProbioticsDomString;
  }
  async addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
    // document.querySelector('.sort-asc').addEventListener('click', async () => {
    //     this.sortDirection = 'ascending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
    // document.querySelector('.sort-desc').addEventListener('click', async () => {
    //     this.sortDirection = 'descending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/products/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} - Buy`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Продукт додано до кошика:)');
  }
}


class ProductListVitamins {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container-probiotics');
    this.productService = new ProductsService();
    this.sortDirection = 'ascending';
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());
  }
  async renderProducts() {
    let ProductListVitaminsDomString = '';
    const products = await this.productService.getProducts();
    [...products]
      .sort( (a, b) => this.sortDirection === 'ascending' 
                         ? a.price - b.price
                         : b.price - a.price)
      .forEach(product => {
        ProductListVitaminsDomString += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div class="card product">
                    <img class="card-img-top" src="img/products/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text flex-fill">${product.description}</p>
                      <div class="d-flex justify-content-around">
                        <button class="btn btn-info" data-bs-toggle="modal"
                          data-bs-target="#productInfoModal" data-id="${product.id}">Info
                        </button>
                        <button class="btn btn-primary buy" data-id="${product.id}">
                          $${product.price} - Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = ProductListVitaminsDomString;
  }
  async addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
    // document.querySelector('.sort-asc').addEventListener('click', async () => {
    //     this.sortDirection = 'ascending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
    // document.querySelector('.sort-desc').addEventListener('click', async () => {
    //     this.sortDirection = 'descending';
    //     await this.renderProducts();
    //     this.addEventListeners();
    // });
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/products/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} - Buy`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Продукт додано до кошика:)');
  }
}


