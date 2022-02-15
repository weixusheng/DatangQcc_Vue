<template>
  <div >
    <page_child @nextStep="father_click"></page_child>
  </div>
</template>


<script setup lang="ts">
import page_child from '@/view/view_test/page_child.vue'
  const father_click = ($event: any) => {
    	console.log($event);
  	}
</script>