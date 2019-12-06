<template>
  <VForm
    ref="form"
    lazy-validation
    @submit.stop.prevent="handleSubmit"
  >
    <div class="headline mb-6">
      Login
    </div>
    <Transition name="fade">
      <VAlert
        v-if="showError"
        type="error"
      >
        An error occured
      </VAlert>
    </Transition>
    <VTextField
      v-model="city"
      label="City"
      name="city"
      outlined
      required
      :rules="[rules.required]"
    />
    <VTextField
      v-model="address"
      label="Address"
      outlined
      required
      name="address"
      :rules="[rules.required]"
    />
    <VTextField
      v-model="postalCode"
      label="Postal code"
      outlined
      required
      name="postalCode"
      :rules="[rules.required]"
    />
    <Card
      ref="card-stripe"
      :stripe="stripeKey"
      @change="complete = $event.complete"
    />
    <VBtn
      type="submit"
      class="mt-6"
      color="primary"
    >
      Pay
    </VBtn>
  </VForm>
</template>

<script>
import { Card } from 'vue-stripe-elements-plus';
import { mapActions } from 'vuex';
import formValidation from '@/mixins/formValidation';
import * as rules from '@/utils/validationRules';

export default {
  name: 'FormCheckout',
  components: {
    Card,
  },
  mixins: [formValidation],
  data: () => ({
    city: '',
    address: '',
    postalCode: '',
    showPassword: false,
    showError: false,
    rules,
    hideErrorTimeout: null,
    stripeKey: process.env.STRIPE_API_KEY,
  }),
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async handleSubmit() {
      if (!this.validate()) {
        return;
      }
      const { city, address, postalCode } = this;
      this.$emit('submit', {
        city,
        address,
        postalCode,
      });
    },
  },
};
</script>
