<template>
  <div>
    <VContainer>
      <RestaurantInfo
        v-bind="restaurant"
        class="mb-8"
      />
      <div class="headline">
        Dishes
      </div>
      <VDivider class="mb-4" />
      <VRow>
        <VCol
          v-for="item in dishes"
          :key="item.id"
          lg="3"
          md="4"
          sm="6"
          xs="12"
        >
          <DishCard v-bind="item" />
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script>
// import addStrapiUrl from '@/utils/addStrapiUrl';
import normalizeImage from '@/utils/normalizeImage';
import restaurantQuery from '@/apollo/queries/restaurants/restaurant.gql';
import RestaurantInfo from '@/components/RestaurantInfo';
import DishCard from '@/components/DishCard';

export default {
  validate({ params }) {
    return !Number.isNaN(params.id);
  },
  components: {
    RestaurantInfo,
    DishCard,
  },
  computed: {
    dishes() {
      return this?.restaurant?.dishes || [];
    },
  },
  apollo: {
    restaurant: {
      query: restaurantQuery,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update: ({ restaurant }) => normalizeImage(restaurant),
    },
  },
};
</script>
