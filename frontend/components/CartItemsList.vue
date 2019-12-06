<template>
  <VList>
    <template v-for="(item, index) in items">
      <CartItem
        :key="item.id"
        v-bind="item"
      />
      <VDivider
        v-if="items.length - 1 > index"
        :key="index"
      />
    </template>
  </VList>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem';

export default {
  name: 'CartItemsList',
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      items: 'cart/items',
    }),
  },
};
</script>
