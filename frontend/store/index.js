export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req?.headers?.cookie) {
      const user = this.$cookies.get('user');
      const cart = this.$cookies.get('cart') || [];
      commit('auth/setUser', user);
      commit('cart/setItems', cart);
    }
  },
};
