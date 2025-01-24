<template>
  <div>
    <h1>{{ user.username }}</h1>

    <ul>
      <li
        v-for="timer in user.timers"
        :key="timer.id"
      >
        <template v-if="timer.endDate">
          time elapsed : {{ formatWithEndDate(timer) }}
        </template>

        <template v-else>
          time elapsed : {{ formatTime(timer.startDate) }}
          <button @click="stopTimer(timer.id)">
            Stop Timer
          </button>
        </template>
      </li>
    </ul>

    <button @click="addTimer">
      Add Timer
    </button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { onMounted, onUnmounted, ref } from 'vue';

import { useDayjs } from '../composables';

onMounted(() => {
  fetchToken().then(() => {
    subscribeToUpdates();
  });

  intervalId = setInterval(updateCurrentTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// mercure
const updates = ref([]);
const token = ref(null);

// timer
const dayjs = useDayjs();

const user = ref({
  id: 1,
  username: 'Todd',
  timers: [
    {
      'id': 1,
      'startDate': '2025-01-24T09:23:27+02:00',
      'endDate': null,
    },
    {
      'id': 2,
      'startDate': '2025-01-24T03:35:13+02:00',
      'endDate': null,
    },
    {
      'id': 3,
      'startDate': '2025-01-24T07:46:46+02:00',
      'endDate': '2025-01-24T14:35:27+02:00',
    },
    {
      'id': 4,
      'startDate': '2025-01-24T07:46:46+02:00',
      'endDate': null,
    },
  ],
});

const currentTime = ref(dayjs());

const updateCurrentTime = () => {
  currentTime.value = dayjs();
};

let intervalId;

const formatTime = (startDate) => {
  const start = dayjs(startDate);
  const now = currentTime.value;
  const duration = dayjs.duration(now.diff(start));

  const hours = String(duration.hours()).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const formatWithEndDate = timer => {
  const start = dayjs(timer.startDate);
  const end = dayjs(timer.endDate);
  const duration = dayjs.duration(end.diff(start));

  const hours = String(duration.hours()).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const stopTimer = timerId => {
  user.value.timers[timerId - 1].endDate = currentTime.value;
};

const addTimer = () => {
  user.value.timers.push({
    id: user.value.timers.length + 1,
    startDate: currentTime.value,
    endDate: null,
  });
};

const fetchToken = async () => {
  try {
    const response = await axios.get('http://localhost/api/token', { withCredentials: true });
    token.value = response.data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

const subscribeToUpdates = async () => {
  if (!token.value) {
    console.error('No token available for Mercure subscription');
    return;
  }

  const url = new URL('http://localhost/.well-known/mercure');
  url.searchParams.append('topic', 'books');

  const eventSource = new EventSourcePolyfill(url.href, { headers: {
    'Authorization': 'Bearer ' + token.value,
  } });

  console.log('eventSource', eventSource);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updates.value.push(data);
  };

  eventSource.onerror = (error) => {
    console.log('Error connecting to Mercure hub:', error);
  };
};

</script>

