<template>
  <div :class="$style.wrapper">
    <!-- <VImg
      :src="image"
      :alt="name"
      aspect-ratio="1"
      class="grey lighten-2"
    /> -->
    <VAvatar
      size="164"
      tile
      class="mr-3"
    >
      <img
        :src="image"
        :alt="name"
      >
    </VAvatar>
    <div>
      <div class="display-1 mb-2">
        {{ name }}
      </div>
      <div class="d-flex align-center mb-2">
        <VIcon>
          mdi-map-marker
        </VIcon>
        <div>
          {{ location }}
        </div>
      </div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'No name',
    },
    description: {
      type: String,
      default: 'No description',
    },
    image: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: 'Unknown',
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
}
</style>
