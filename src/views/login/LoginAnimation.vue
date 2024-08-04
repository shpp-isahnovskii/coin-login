<script setup>
import ParticleRotation from './animation/ParticleRotation.vue';
import CreditCard from './animation/CreditCard.vue';
import { ref, onMounted } from 'vue';

const INTERVAL_FREQUENCY = 300;

const data = [
  {
    scale: 1,
    icons: [
      { size: 'small', link: '/coins/ftx.png', alt: 'FTX' },
      { size: 'small', link: '/coins/dash.png', alt: 'dash' },
    ],
  },
  {
    scale: 0.75,
    icons: [{ size: 'regular', link: '/coins/solana.png', alt: 'Solana' }],
  },
  {
    scale: 0.5,
    icons: [{ size: 'regular', link: '/coins/polygon.png', alt: 'Polygon' }],
  },
];

let interval;
const timer = ref(3);

onMounted(() => {
  interval = setInterval(() => {
    if (timer.value === 0) {
      clearInterval(interval);
    }
    timer.value--;
  }, INTERVAL_FREQUENCY);
});
</script>

<template>
  <div class="flex items-center justify-center overflow-visible sm:py-6">
    <div
      class="w-64 h-64 sm:scale-[1.2] lg:scale-[1.8] relative flex items-center justify-center"
    >
      <CreditCard />
      <template v-for="(icons, index) in data" :key="index">
        <ParticleRotation
          v-if="timer <= index"
          :scale="icons.scale"
          :icons="icons.icons"
        />
      </template>
    </div>
  </div>
</template>
