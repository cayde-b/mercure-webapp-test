<template>
  <div>
    <div>
      {{ timeElapsed }}
    </div>

    <button @click="start">
      start
    </button>

    <button @click="stop">
      stop
    </button>

    <button @click="restart">
      pause
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const timeElapsed = ref(0);

const start = () => {
  const interval = setInterval(() => {
    timeElapsed.value++;
  }, 1000);
};

const stop = () => {
  console.log('stop');
};

const restart = () => {
  console.log('restart');
};
</script>
