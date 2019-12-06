<template>
  <VAppBar app>
    <VAppBarNavIcon @click.stop="toggleSidebarMenu()" />
    <NuxtLink to="/">
      <VToolbarTitle class="black--text">
        {{ title }}
      </VToolbarTitle>
    </NuxtLink>
    <VSpacer />
    <NuxtLink to="/cart">
      <VBtn icon>
        <VBadge
          right
          class="align-self-center"
        >
          <template #badge>
            <span>{{ cartItemsAmount }}</span>
          </template>
          <VIcon>
            mdi-cart
          </VIcon>
        </VBadge>
      </VBtn>
    </NuxtLink>
    <div v-if="Boolean(username)">
      <VMenu offset-y>
        <template v-slot:activator="{ on }">
          <VBtn
            text
            v-on="on"
          >
            {{ username }}
          </VBtn>
        </template>
        <VList>
          <VListItem
            v-for="(item, index) in userItems"
            :key="index"
            @click="item.action"
          >
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </div>
    <template v-else>
      <NuxtLink to="/users/login">
        <VBtn text>
          Login
        </VBtn>
      </NuxtLink>
      <NuxtLink to="/users/register">
        <VBtn text>
          Register
        </VBtn>
      </NuxtLink>
    </template>
  </VAppBar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      userItems: [
        {
          title: 'Logout',
          action: this.logout,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      sidebarMenu: 'globals/sidebarMenu',
      username: 'auth/username',
      cartItemsAmount: 'cart/numberOfItems',
    }),
  },
  methods: {
    ...mapActions({
      toggleSidebarMenu: 'globals/toggleSidebarMenu',
      logout: 'auth/logout',
    }),
  },
};
</script>
