<template>
  <VApp dark>
    <AppSidebarMenu :items="items" />
    <AppHeader :title="title" />
    <VOverlay :value="pending || paymentPending">
      <VProgressCircular
        indeterminate
        size="64"
      />
    </VOverlay>
    <VContent>
      <VContainer>
        <Transition name="fade">
          <Nuxt />
        </Transition>
      </VContainer>
    </VContent>
    <VFooter
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </VFooter>
  </VApp>
</template>

<script>
import { mapGetters } from 'vuex';
import AppSidebarMenu from '@/components/layout/AppSidebarMenu';
import AppHeader from '@/components/layout/AppHeader';

export default {
  components: {
    AppSidebarMenu,
    AppHeader,
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Restaurants',
          to: '/restaurants',
        },
      ],
      title: 'Restaurants App',
    };
  },
  computed: {
    ...mapGetters({
      pending: 'auth/pending',
      paymentPending: 'cart/paymentPending',
    }),
  },
};
</script>
