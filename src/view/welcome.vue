<template>
  <com_carousel></com_carousel>
  <com_description></com_description>
</template>

<script lang="ts">
import com_carousel from '@/components/index/com_carousel.vue'
import com_description from '@/components/index/com_description.vue'
export default {
  name: "welcome",
  components:{
    com_carousel,
    com_description
  }
}
</script>

<style scoped>

</style>