import strapi from '@/utils/strapi';

// Defining an empty state
export const state = () => ({
  user: null,
  pending: false,
});

export const getters = {
  username: (state) => state.user && state.user.username,
  pending: ({ pending }) => pending,
};

// Create a mutation that set a user to your state and in a 'user' cookie
export const mutations = {
  setPending(state, value) {
    state.pending = value;
  },
  setUser(state, user) {
    state.user = user;
    this.$cookies.set('user', user);
  },
  logout(state) {
    state.user = null;
    this.$cookies.set('user', null);
  },
};

export const actions = {
  async login({ state, commit, dispatch }, { email, password }) {
    const { pending } = state;
    if (!pending) {
      commit('setPending', true);
    }
    try {
      const response = await strapi.login(email, password);
      dispatch('setUser', response.user);
      this.$router.push('/');
      return Promise.resolve(response.user);
    } finally {
      commit('setPending', false);
    }
  },
  async register({ state, commit, dispatch }, { username, email, password }) {
    const { pending } = state;
    if (!pending) {
      commit('setPending', true);
    }
    try {
      const response = await strapi.register(username, email, password);
      dispatch('setUser', response.user);
      this.$router.push('/');
      return Promise.resolve(response.user);
    } finally {
      commit('setPending', false);
    }
  },
  setUser({ commit }, user) {
    commit('setUser', user);
  },
  logout({ commit }) {
    commit('logout');
  },
};
