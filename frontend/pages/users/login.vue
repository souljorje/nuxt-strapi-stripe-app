<template>
  <VContainer>
    <VRow>
      <VCol
        sm="5"
        class="hidden-xs-only"
      >
        <div>
          <VImg
            src="https://pngimage.net/wp-content/uploads/2018/06/hi-tumblr-png-1.png"
            max-width="500"
            alt="hi!"
          />
        </div>
      </VCol>
      <VCol xs="12">
        <FormLogin />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import FormLogin from '@/components/FormLogin';

export default {
  components: {
    FormLogin,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
