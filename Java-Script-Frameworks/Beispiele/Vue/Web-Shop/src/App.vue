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
                this.cart.push(product);
            },
            removeFromCart(productId) {
                this.cart = this.cart.filter(item => item.id !== productId);
            }
        },
        components: {
            ProductList,
            Cart
        }
    };
</script>
