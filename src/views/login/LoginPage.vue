<script setup lang="ts">
import LoginAnimation from './LoginAnimation.vue';
import LoginForm from './LoginForm.vue';
</script>

<template>
  <section class="flex w-full h-screen">
    <LoginForm class="basis-5/12" />
    <LoginAnimation class="basis-7/12" />
  </section>
</template>
