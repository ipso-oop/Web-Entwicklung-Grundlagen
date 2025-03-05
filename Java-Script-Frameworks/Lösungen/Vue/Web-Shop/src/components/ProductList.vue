<template>
    <div>
        <h2>Produkte</h2>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - {{ product.price }} CHF (Lagerbestand: {{ product.stock }})
                <button @click="$emit('add-to-cart', product)" :disabled="product.stock === 0">
                    {{ product.stock > 0 ? 'In den Warenkorb' : 'Nicht verfuegbar' }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
            { id: 1, name: 'Produkt 1', price: 29.99, stock: 5 },
            { id: 2, name: 'Produkt 2', price: 39.99, stock: 2 },
            { id: 3, name: 'Produkt 3', price: 19.99, stock: 0 } // Ausverkauft
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
