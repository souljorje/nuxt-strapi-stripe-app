export default {
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.validCallback) {
          this.validCallback();
        }
        return true;
      }
      if (this.invalidCallback) {
        this.invalidCallback();
      }
      return false;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
