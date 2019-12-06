<template>
  <VContainer>
    <ClientOnly placeholder="Chargement...">
      <VRow>
        <VCol
          sm="12"
          md="6"
        >
          <VAlert
            v-if="showError"
            type="error"
          >
            An error occured
          </VAlert>
          <FormCheckout
            ref="form"
            @submit="handleSubmit"
          />
        </VCol>
        <VCol
          sm="12"
          md="6"
        >
          <CartItemsList />
        </VCol>
      </VRow>
    </ClientOnly>
  </VContainer>
</template>

<script>
import { mapActions } from 'vuex';
import FormCheckout from '@/components/FormCheckout';
import CartItemsList from '@/components/CartItemsList';

export default {
  components: {
    FormCheckout,
    CartItemsList,
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      showError: false,
      hideErrorTimeout: null,
    };
  },
  methods: {
    ...mapActions({
      processPayment: 'cart/processPayment',
    }),
    async handleSubmit(payload) {
      try {
        await this.processPayment(payload);
        this.refs.form.reset();
      } catch (error) {
        if (this.hideErrorTimeout) {
          clearTimeout(this.hideErrorTimeout);
        }
        this.showError = true;
        this.hideErrorTimeout = setTimeout(() => {
          this.showError = false;
        }, 1000 * 5);
      }
    },
  },
};
</script>
