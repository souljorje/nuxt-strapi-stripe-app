import { mapActions } from 'vuex';

export default {
  computed: {
    cartItem() {
      return this.$store.getters['cart/item'](this.id);
    },
    cartItemQuantity() {
      return this?.cartItem?.quantity;
    },
  },
  methods: {
    ...mapActions({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
    }),
  },
};
