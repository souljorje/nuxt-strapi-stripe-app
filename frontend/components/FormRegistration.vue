<template>
  <VForm
    ref="form"
    lazy-validation
    @submit.stop.prevent="handleSubmit"
  >
    <div class="headline mb-6">
      Register
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
      v-model="username"
      label="Username"
      outlined
      type="text"
      required
      :rules="[rules.required]"
    />
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
      Register
    </VBtn>
    <div>
      Already have an account?
      <NuxtLink :to="{ name: 'users-login' }">
        Login
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
    username: '',
    showPassword: false,
    showError: false,
    rules,
    hideErrorTimeout: null,
  }),
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),
    async handleSubmit() {
      if (!this.validate()) {
        return;
      }
      try {
        const { username, email, password } = this;
        await this.register({ username, email, password });
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
