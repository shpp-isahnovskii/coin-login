<script setup>
import { gsap } from 'gsap/gsap-core';
import { onMounted, ref } from 'vue';

const card = ref(null);
const fog = ref(null);

const tl = gsap.timeline({ paused: true });

onMounted(() => {
  gsap.set(fog.value, { scale: 0, opacity: 0.3 });
  tl.to(card.value, {
    width: '20%',
    height: '20%',
    duration: 1,
    delay: 1.8,
  });
  tl.to(card.value, { borderRadius: '12px', duration: 1.5, delay: 0.5 });
  tl.to(card.value, { width: '52%', height: '32%', duration: 1 });
  tl.to(card.value, {
    rotate: '-6deg',
    boxShadow:
      '0 3px 7px 1px rgba(0, 0, 0, 0.2), 0 5px 18px 0 rgba(0, 0, 0, 0.2)',
    duration: 1,
  });
  tl.to(
    fog.value,
    {
      opacity: 1,
      scale: 1,
      duration: 1,
    },
    '<',
  );
  tl.play();
});
</script>

<template>
  <div
    ref="card"
    class="z-10 w-[0%] h-[0%] rounded-[100%] transition-[background-position] duration-[3s] bg-gradient-to-r bg-size-600 hover:bg-pos-hover from-yellow-300 via-fuchsia-400 to-cyan-300 test"
  ></div>
  <img ref="fog" class="-z-20 absolute" src="/fog.png" alt="fog" />
</template>
