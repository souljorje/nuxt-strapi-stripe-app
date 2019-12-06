import { createToken } from 'vue-stripe-elements-plus';
import strapi from '@/utils/strapi';

export const state = () => ({
  items: [],
  paymentPending: false,
});

export const getters = {
  paymentPending: ({ paymentPending }) => paymentPending,
  items: (state) => state.items || [],
  price: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  numberOfItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
  item: (state) => (id) => state.items.find((item) => item.id === id),
};

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  add(state, item) {
    const matchingItem = state.items.find(({ id }) => id === item.id);
    if (!matchingItem) {
      state.items.push({
        quantity: 1,
        ...item,
      });
    } else if (!item.quantity) {
      matchingItem.quantity += 1;
    } else {
      matchingItem.quantity = item.quantity;
    }
    this.$cookies.set('cart', state.items);
  },
  remove(state, item) {
    const matchingItem = state.items.find(({ id }) => id === item.id);

    if (matchingItem.quantity === 1 || item.quantity === 0) {
      const index = state.items.findIndex((i) => i.id === item.id);
      state.items.splice(index, 1);
    } else if (item.quantity) {
      matchingItem.quantity = item.quantity;
    } else {
      matchingItem.quantity -= 1;
    }
    this.$cookies.set('cart', state.items);
  },
  emptyCart(state) {
    state.items = [];
    this.$cookies.set('cart', state.items);
  },
  setPaymentPending(state, value) {
    state.paymentPending = value;
  },
};

export const actions = {
  setItems({ commit }, items) {
    commit('setItems', items);
  },
  add({ commit }, item) {
    commit('add', item);
  },
  remove({ commit }, item) {
    commit('remove', item);
  },
  emptyCart({ commit }) {
    commit('emptyCart');
  },
  async processPayment({ commit, dispatch, getters }, payload) {
    const { paymentPending } = state;
    if (!paymentPending) {
      commit('setPaymentPending', true);
    }
    try {
      const response = await createToken();
      const token = response.token.id;
      const { price: amount, items: dishes } = getters;
      const { address, postalCode, city } = payload;
      await strapi.createEntry('orders', {
        amount,
        dishes,
        address,
        postalCode,
        city,
        token,
      });
      dispatch('emptyCart');
    } finally {
      commit('setPaymentPending', false);
    }
  },
};
