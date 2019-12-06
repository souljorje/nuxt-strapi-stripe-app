<template>
  <VCard>
    <VImg
      :src="image"
      height="200px"
    />
    <VCardActions>
      <VCardTitle>
        {{ name }}
      </VCardTitle>
      <div class="my-4 subtitle-1 black--text">
        {{ price }}₾
      </div>
      <VSpacer />
      <VCardActions>
        <VBtn
          v-if="!cartItemQuantity"
          icon
          @click="addToCart($props)"
        >
          <VIcon>
            mdi-cart
          </VIcon>
        </VBtn>
        <template v-else>
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
        </template>
      </VCardActions>
    </VCardActions>
  </VCard>
</template>

<script>
import cartItem from '@/mixins/cartItem';

export default {
  name: 'DishCard',
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
    description: {
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
