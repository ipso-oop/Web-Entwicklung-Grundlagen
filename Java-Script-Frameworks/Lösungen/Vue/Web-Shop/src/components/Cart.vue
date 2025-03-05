<template>
    <div>
        <h2>Warenkorb</h2>
        <ul>
            <li v-for="item in cart" :key="item.id">
                {{ item.name }} - {{ item.price }} CHF
                <button @click="removeFromCart(item.id)">Entfernen</button>
            </li>
        </ul>
        <h3 v-if="cart.length > 0">Gesamtsumme: {{ totalPrice }} CHF</h3>
    </div>
</template>

<script>
export default {
        props: {
            cart: {
                type: Array,
                default: () => []  // Standardwert ist ein leeres Array
            }
        },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$emit('remove-from-cart', productId);
    }
  }
};
</script>
