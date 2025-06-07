import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definir las interfaces necesarias
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  offer?: boolean;
  description: string;
  brand: string;
  weight: string;
  ingredients: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'super-corazon-jesus';

  searchTerm = '';
  selectedProduct: Product | null = null;
  showProductModal = false;
  showCartModal = false;
  cart: CartItem[] = [];

  products: Product[] = [
    {
      id: 1,
      name: 'Leche entera La Serenísima',
      category: 'Lácteos',
      price: 620,
      image:
        'https://acdn-us.mitiendanube.com/stores/093/780/products/serenisima-clasica-751-95fea92d1a27f8e9ab15710914346750-640-0.png',
      offer: true,
      description:
        'Leche entera pasteurizada de alta calidad, rica en calcio y proteínas. Ideal para toda la familia.',
      brand: 'La Serenísima',
      weight: '1 Litro',
      ingredients: ['Leche entera pasteurizada', 'Vitaminas A y D'],
    },
    {
      id: 2,
      name: 'Pan francés x 1kg',
      category: 'Panificados',
      price: 450,
      image:
        'https://enrilemoine.com/wp-content/uploads/2024/06/pan-frances-by-enrilemoine-13.webp',
      description:
        'Pan francés artesanal, crujiente por fuera y tierno por dentro. Horneado diariamente.',
      brand: 'Panadería Local',
      weight: '1 Kg',
      ingredients: ['Harina de trigo', 'Agua', 'Sal', 'Levadura'],
    },
    {
      id: 3,
      name: 'Gaseosa Coca-Cola 1.5L',
      category: 'Bebidas',
      price: 900,
      image:
        'https://acdn-us.mitiendanube.com/stores/001/144/141/products/whatsapp-image-2021-08-25-at-10-58-511-ce2f1154472dd2632c16298999809869-640-0.jpeg',
      offer: true,
      description:
        'La auténtica Coca-Cola con su sabor único e inconfundible. Perfecta para compartir.',
      brand: 'Coca-Cola',
      weight: '1.5 Litros',
      ingredients: [
        'Agua carbonatada',
        'Azúcar',
        'Concentrado de cola',
        'Ácido fosfórico',
        'Cafeína',
      ],
    },
    {
      id: 4,
      name: 'Café Molido La Virginia',
      category: 'Despensa',
      price: 12150,
      image:
        'https://jumboargentina.vtexassets.com/arquivos/ids/646156-1200-auto?v=637582880095270000&width=1200&height=auto&aspect=true',
      description:
        'Café molido de primera calidad, tostado suave con aroma intenso. Ideal para desayunos y meriendas.',
      brand: 'La Virginia',
      weight: '500g',
      ingredients: ['Café 100% puro molido'],
    },
    {
      id: 5,
      name: 'Fideos Spaghetti Matarazzo',
      category: 'Despensa',
      price: 380,
      image:
        'https://arjosimarprod.vtexassets.com/arquivos/ids/156663-1200-auto?v=637389710721870000&width=1200&height=auto&aspect=true',
      offer: true,
      description:
        'Fideos spaghetti de sémola de trigo duro. Cocción perfecta en 8-10 minutos.',
      brand: 'Matarazzo',
      weight: '500g',
      ingredients: ['Sémola de trigo duro', 'Agua'],
    },
    {
      id: 6,
      name: 'Puré de Tomate La Campagnola',
      category: 'Conservas',
      price: 290,
      image:
        'https://jumboargentina.vtexassets.com/arquivos/ids/584764-1200-auto?v=637249362175770000&width=1200&height=auto&aspect=true',
      description:
        'Puré de tomate natural, ideal para salsas, guisos y preparaciones caseras.',
      brand: 'La Campagnola',
      weight: '520g',
      ingredients: ['Tomate', 'Sal'],
    },
    {
      id: 7,
      name: 'Arroz Largo Fino Gallo Oro',
      category: 'Despensa',
      price: 520,
      image:
        'https://www.saica.com.ar/3725-large_default/gallo-arroz-largo-fino-seleccion-bolsa-1kg.jpg',
      description:
        'Arroz largo fino de primera calidad, granos sueltos y perfecta cocción.',
      brand: 'Gallo Oro',
      weight: '1kg',
      ingredients: ['Arroz largo fino'],
    },
    {
      id: 8,
      name: 'Aceite de Girasol Natura',
      category: 'Aceites',
      price: 680,
      image:
        'https://http2.mlstatic.com/D_NQ_NP_810197-MLA74176635823_012024-O.webp',
      offer: true,
      description:
        'Aceite de girasol puro, ideal para cocinar y aderezar. Rico en vitamina E.',
      brand: 'Natura',
      weight: '900ml',
      ingredients: ['Aceite de girasol refinado'],
    },
    {
      id: 9,
      name: 'Yogur Natural Danone',
      category: 'Lácteos',
      price: 420,
      image:
        'https://chedrauimx.vtexassets.com/arquivos/ids/49198560-1200-auto?v=638845940935630000&width=1200&height=auto&aspect=true',
      description:
        'Yogur natural cremoso, fuente de calcio y probióticos. Sin conservantes artificiales.',
      brand: 'Danone',
      weight: '500g',
      ingredients: ['Leche', 'Fermentos lácticos'],
    },
    {
      id: 10,
      name: 'Huevos Blancos x 6 unidades',
      category: 'Frescos',
      price: 1850,
      image:
        'https://consol.coop.ar/web/image/product.product/7973/image_1024/Huevos%20Blanco%20econ%C3%B3mico%20Estuche%20x%206%20un?unique=67164eb',
      description:
        'Huevos frescos de primera calidad, ricos en proteínas y vitaminas.',
      brand: 'Granja Local',
      weight: '12 unidades',
      ingredients: ['Huevos de gallina'],
    },
    {
      id: 11,
      name: 'Azúcar Ledesma',
      category: 'Despensa',
      price: 990,
      image:
        'https://www.casa-segal.com/wp-content/uploads/2019/03/azucar-kilo-ledesma-reposteria-mendoza-casa-segal-1-600x600.jpg',
      description:
        'Azúcar blanca refinada de primera calidad. Ideal para endulzar y repostería.',
      brand: 'Ledesma',
      weight: '1kg',
      ingredients: ['Azúcar de caña refinada'],
    },
    {
      id: 12,
      name: 'Agua Mineral Villa del Sur',
      category: 'Bebidas',
      price: 180,
      image:
        'https://jumboargentina.vtexassets.com/arquivos/ids/620318-1200-auto?v=637466226602700000&width=1200&height=auto&aspect=true',
      description:
        'Agua mineral natural sin gas, pura y cristalina de manantiales naturales.',
      brand: 'Villa del Sur',
      weight: '2.25L',
      ingredients: ['Agua mineral natural'],
    },
    {
      id: 13,
      name: 'Manteca La Paulina',
      category: 'Lácteos',
      price: 1900,
      image:
        'https://elahorroonline.com.ar/wp-content/uploads/2025/01/MANTECA-200-01-600x600.jpg',
      offer: true,
      description:
        'Manteca sin sal de primera calidad, cremosa y sabrosa. Perfecta para cocinar y untar.',
      brand: 'La Paulina',
      weight: '200g',
      ingredients: ['Crema de leche', 'Sal'],
    },
    {
      id: 14,
      name: 'Atún al Natural La Campagnola',
      category: 'Conservas',
      price: 3299,
      image:
        'https://arcorencasa.com/wp-content/uploads/2024/10/20241008-13136.webp',
      offer: true,
      description:
        'Atún al natural en trozos, rico en proteínas y omega 3. Ideal para ensaladas.',
      brand: 'La Campagnola',
      weight: '170g',
      ingredients: ['Atún', 'Agua', 'Sal'],
    },
    {
      id: 15,
      name: 'Queso Cremoso Sancor',
      category: 'Lácteos',
      price: 4713,
      image:
        'https://jumboargentina.vtexassets.com/arquivos/ids/187654-1200-auto?v=636383491016000000&width=1200&height=auto&aspect=true',
      description:
        'Queso cremoso de textura suave y sabor delicado. Perfecto para sándwiches y tostadas.',
      brand: 'Sancor',
      weight: '300g',
      ingredients: ['Leche', 'Sal', 'Cuajo', 'Fermentos lácticos'],
    },
  ];

  // Métodos para filtrar productos
  get filteredProducts() {
    if (!this.searchTerm || !this.searchTerm.trim()) {
      return this.products;
    }

    const term = this.searchTerm.toLowerCase().trim();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        (p.brand && p.brand.toLowerCase().includes(term))
    );
  }

  get offerProducts() {
    return this.products.filter((p) => p.offer);
  }

  // Métodos para búsqueda
  clearSearch() {
    this.searchTerm = '';
  }

  applySuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    // Enfocar el input después de aplicar la sugerencia
    setTimeout(() => {
      const searchInput = document.querySelector(
        '.search-input'
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }

  onSearchEnter() {
    // Método para manejar cuando el usuario presiona Enter
    // Aquí podrías agregar lógica adicional si es necesario
    if (this.searchTerm.trim() && this.filteredProducts.length === 1) {
      // Si hay solo un resultado, mostrar los detalles
      this.showProductDetails(this.filteredProducts[0]);
    }
  }

  ngOnInit() {
    // Método para depuración
    console.log('Componente inicializado');
  }

  onSearchInput() {
    console.log('Búsqueda:', this.searchTerm);
    this.searchTerm = this.searchTerm.trimStart();
  }

  get hasSearchResults(): boolean {
    return this.searchTerm.trim() !== '' && this.filteredProducts.length > 0;
  }

  get searchResultsMessage(): string {
    const count = this.filteredProducts.length;
    if (count === 0) {
      return `No se encontraron productos para "${this.searchTerm}"`;
    } else if (count === 1) {
      return `1 producto encontrado para "${this.searchTerm}"`;
    } else {
      return `${count} productos encontrados para "${this.searchTerm}"`;
    }
  }

  // Métodos para el carrito
  get cartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get cartTotal() {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    // Opcionalmente mostrar el carrito al agregar un producto
    // this.openCart();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
  }

  clearCart() {
    this.cart = [];
  }

  // Métodos para modales
  openCart() {
    this.showCartModal = true;
  }

  closeCart() {
    this.showCartModal = false;
  }

  showProductDetails(product: Product) {
    this.selectedProduct = product;
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  // WhatsApp
  sendWhatsAppMessage(product?: Product) {
    let message = '';

    const phoneNumber = '5493517181975';

    if (product) {
      // Mensaje para un producto específico
      message = `Hola! Me interesa el producto: ${product.name} (ARS $${product.price}). ¿Tienen disponible?`;
    } else if (this.cart.length > 0) {
      // Mensaje para el carrito completo
      message = 'Hola! Me gustaría hacer el siguiente pedido:\n';
      this.cart.forEach((item) => {
        message += `- ${item.quantity}x ${item.product.name} (ARS $${
          item.product.price * item.quantity
        })\n`;
      });
      message += `\nTotal: ARS $${this.cartTotal}`;
    } else {
      // Mensaje general
      message = 'Hola! Me gustaría hacer una consulta sobre sus productos.';
    }

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Abrir WhatsApp con el mensaje
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      '_blank'
    );
  }

  handleImageError(event: any) {
    // Usa una imagen placeholder confiable
    event.target.src = 'https://via.placeholder.com/150?text=Imagen+No+Disponible';
  }
}
