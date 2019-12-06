<template>
  <VCard class="mx-auto">
    <VImg
      class="white--text align-end"
      height="200px"
      :src="image"
    />
    <VCardTitle>{{ name }}</VCardTitle>
    <VCardText class="text--primary">
      {{ description }}
    </VCardText>

    <VCardActions>
      <VBtn>
        Share
      </VBtn>

      <VBtn>
        Explore
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script>
export default {
  name: 'RestaurantCard',
  props: {
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
  },
};
</script>
