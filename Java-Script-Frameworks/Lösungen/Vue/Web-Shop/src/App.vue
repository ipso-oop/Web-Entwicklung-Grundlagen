<template>
    <h1>Web Shop</h1>
    <div id="app">
        <ProductList @add-to-cart="addToCart" />
        <Cart :cart="cart" @remove-from-cart="removeFromCart" />
    </div>
</template>

<script>
    import ProductList from './components/ProductList.vue';
    import Cart from './components/Cart.vue';

    export default {
        data() {
            return {
                cart: []  // Der Warenkorb wird hier als Array initialisiert
            };
        },
        methods: {
           addToCart(product) {
           if (product.stock > 0) {
            this.cart.push(product);
            product.stock--; // Verringert den Lagerbestand nach dem Hinzufügen in den Warenkorb
           } else {
            alert("Produkt nicht mehr verfügbar!");
           }
    },
        removeFromCart(productId) {
        const productIndex = this.cart.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            const product = this.cart[productIndex];
            product.stock++; // Erhöht den Lagerbestand, wenn das Produkt entfernt wird
            this.cart.splice(productIndex, 1);
        }
    }
  },
        components: {
            ProductList,
            Cart
        }
    };
</script>
