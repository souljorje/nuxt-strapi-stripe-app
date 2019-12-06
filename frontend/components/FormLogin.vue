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
      v-model="email"
      label="Email"
      outlined
      type="email"
      required
      :rules="[rules.required, rules.email]"
    />
    <VTextField
      v-model="password"
      label="Password"
      outlined
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      required
      :type="showPassword ? 'text' : 'password'"
      name="password"
      :rules="[rules.required]"
      @click:append="showPassword = !showPassword"
    />
    <VBtn
      type="submit"
      class="mb-6"
    >
      Login
    </VBtn>
    <div>
      No account yet?
      <NuxtLink :to="{ name: 'users-login' }">
        Register
      </NuxtLink>
    </div>
  </VForm>
</template>

<script>
import { mapActions } from 'vuex';
import formValidation from '@/mixins/formValidation';
import * as rules from '@/utils/validationRules';

export default {
  name: 'FormRegistration',
  mixins: [formValidation],
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    showError: false,
    rules,
    hideErrorTimeout: null,
  }),
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async handleSubmit() {
      if (!this.validate()) {
        return;
      }
      try {
        const { email, password } = this;
        await this.login({ email, password });
      } catch (err) {
        this.reset();
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
