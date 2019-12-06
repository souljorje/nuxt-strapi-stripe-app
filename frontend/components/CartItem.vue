<template>
  <VListItem>
    <VListItemAvatar>
      <VImg :src="image" />
    </VListItemAvatar>

    <VListItemContent>
      <VListItemTitle>
        {{ name }}
      </VListItemTitle>
      <VListItemSubtitle> {{ price }}₾/unit </VListItemSubtitle>
    </VListItemContent>

    <VListItemIcon>
      <VBtn
        icon
        @click.stop="removeFromCart($props)"
      >
        <VIcon>
          mdi-minus
        </VIcon>
      </VBtn>
      <VBadge
        overlap
        class="align-self-center"
      >
        <template #badge>
          <span>{{ cartItemQuantity }}</span>
        </template>
        <VIcon>
          mdi-cart
        </VIcon>
      </VBadge>

      <VBtn
        icon
        @click.stop="addToCart($props)"
      >
        <VIcon>
          mdi-plus
        </VIcon>
      </VBtn>
    </VListItemIcon>
  </VListItem>
</template>

<script>
import cartItem from '@/mixins/cartItem';

export default {
  name: 'CartItem',
  mixins: [cartItem],
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
};
</script>
