<template>
    <div>
        <h2>Produkte</h2>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - {{ product.price }} CHF
                <button @click="addToCart(product)">In den Warenkorb</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Produkt 1', price: 29.99 },
        { id: 2, name: 'Produkt 2', price: 39.99 },
        { id: 3, name: 'Produkt 3', price: 19.99 }
      ]
    };
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    }
  }
};
</script>
