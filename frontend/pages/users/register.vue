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
            alt="register"
          />
        </div>
      </VCol>
      <VCol xs="12">
        <FormRegistration />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import FormRegistration from '@/components/FormRegistration';

export default {
  components: {
    FormRegistration,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
