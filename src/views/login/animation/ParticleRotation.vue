<script setup>
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';

const ROTATION_SPEED_BASE = 100;

const props = defineProps({
  scale: { type: Number, required: true },
  icons: {
    type: [{ size: ['regular', 'small'], link: String, alt: String }],
    required: true,
  },
});

const iconSize = (size) => {
  return size === 'small' ? 'w-10 h-10' : 'w-20 h-20';
};

const orbit = ref(null);
const images = ref(null);

const tl = gsap.timeline({ paused: true });

onMounted(() => {
  scenePreset();
  tl.to(orbit.value, { opacity: 1, duration: 0.6 });
  images.value.forEach((node) => {
    tl.to(node, { scale: 1.2, duration: 0.3 }, 'icon-appear-1');
    tl.to(node, { scale: 0.9, duration: 0.2 }, 'icon-appear-2');
    tl.to(node, { scale: 1, duration: 0.1 }, 'icon-appear-3');
  });
  tl.to(
    orbit.value,
    {
      rotation: '360deg',
      duration: ROTATION_SPEED_BASE * props.scale,
      repeat: -1,
      ease: 'none',
    },
    'rotation',
  );
  images.value.forEach((node) => {
    tl.to(
      node,
      {
        rotation: '-360deg',
        duration: ROTATION_SPEED_BASE * props.scale,
        repeat: -1,
        ease: 'none',
      },
      'rotation',
    );
  });
  tl.play();
});
const scenePreset = () => {
  gsap.set(orbit.value, {
    opacity: 0,
    width: `${props.scale * 100}%`,
    height: `${props.scale * 100}%`,
  });

  const radius = orbit.value.offsetWidth / 2;

  images.value.forEach((node, index) => {
    const sections = props.icons.length;
    const radians =
      (segmentMathRandom(360, sections, index) * Math.PI) / 180; // x° * π / 180°
    gsap.set(node, {
      scale: '0',
      x: radius + Math.cos(radians) * radius,
      y: radius + Math.sin(radians) * radius,
    });
  });
};

const segmentMathRandom = (maxDeg, sections, current) => {
  const sectionSize = Math.floor(maxDeg / sections);
  const max = sectionSize * (current + 1);
  const min = sectionSize * current;
  return getMathRandom(min, max); //return random x° value based on the value between min° and max° for the current section. 
};

const getMathRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
</script>

<template>
  <div ref="orbit" class="absolute flex border border-black/20 rounded-full">
    <div class="relative">
      <div
        v-for="icon in icons"
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :class="iconSize(icon.size)"
        :key="icon.alt"
        ref="images"
      >
        <img :src="icon.link" :alt="icon.alt" />
      </div>
    </div>
  </div>
</template>
