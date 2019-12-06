<template>
  <VContainer>
    <CartItemsList class="mb-4" />
    <VDivider class="mb-4" />
    <div class="d-flex justify-space-between">
      <div class="headline">
        <span class="font-weight-bold">Price: </span>{{ price }}₾
      </div>
      <VBtn
        color="primary"
        @click="goToCheckout"
      >
        Go to chekout
      </VBtn>
    </div>
  </VContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItemsList from '@/components/CartItemsList';

export default {
  components: {
    CartItemsList,
  },
  computed: {
    ...mapGetters({
      price: 'cart/price',
      username: 'auth/username',
    }),
  },
  methods: {
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.username;
      if (!isConnected) {
        this.$router.push('/login');
        return;
      }
      this.$router.push('/checkout');
    },
  },
};
</script>
