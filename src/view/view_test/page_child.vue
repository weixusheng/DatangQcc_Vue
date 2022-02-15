<template>
  <div>
    <p><button @click="nextDown">子按钮</button></p>
  </div>
</template>

<script lang="ts" setup>
    const emit= defineEmits(['nextStep'])
    const nextDown = () => {
    	emit('nextStep',10)
  	}
</script>