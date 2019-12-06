<template>
  <VContainer>
    <VTextField
      v-model="searchQuery"
      append-icon="mdi-magnify"
      aria-placeholder="search"
      label="Search"
    />
    <VRow v-if="$apollo.loading">
      <VCol
        v-for="item in placeholder"
        :key="item"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <VSkeletonLoader
          class="mx-auto"
          type="card"
        />
      </VCol>
    </VRow>
    <VRow v-else-if="filteredRestaurants">
      <VCol
        v-for="item in filteredRestaurants"
        :key="item.id"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <NuxtLink :to="`/restaurants/${item.id}`">
          <RestaurantCard v-bind="item" />
        </NuxtLink>
      </VCol>
    </VRow>
    <VRow v-else>
      <VBanner single-line>
        Sorry, nothing found 🙏

        <template #actions>
          <VBtn
            text
            color="accent-4"
          >
            Main Page
          </VBtn>
        </template>
      </VBanner>
    </VRow>
  </VContainer>
</template>

<script>
import addStrapiUrl from '@/utils/addStrapiUrl';
import restaurantsQuery from '@/apollo/queries/restaurants/restaurants.gql';
import RestaurantCard from '@/components/RestaurantCard';

export default {
  components: {
    RestaurantCard,
  },
  data: () => ({
    placeholder: new Array(12),
    restaurants: [],
    searchQuery: '',
  }),
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantsQuery,
      loadingKey: 'loading',
      update: ({ restaurants }) => restaurants.map((item) => ({
        ...item,
        image: addStrapiUrl(item?.image?.url),
      })),
    },
  },
  computed: {
    // Search system
    filteredRestaurants() {
      if (!this.restaurants && this.restaurants.length < 1) return null;
      return this.restaurants.filter((restaurant) => {
        const searchQuery = this.searchQuery.toLowerCase();
        const matchedRestaurants = restaurant.name.toLowerCase().includes(searchQuery);
        return matchedRestaurants;
      });
    },
  },
};
</script>
