<template>
  <div>
    <h1>Book Updates</h1>

    <ul>
      <li v-for="update in updates" :key="update.id">{{ update.name }} - {{ update.status }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import {  EventSourcePolyfill } from 'event-source-polyfill';

export default {
  data() {
    return {
      updates: [],
      token: null
    };
  },
  mounted() {
    this.fetchToken().then(() => {
      this.subscribeToUpdates();
    });
  },
  methods: {
    async fetchToken() {
      try {
        const response = await axios.get('http://localhost/api/token', { withCredentials: true });
        console.log('token', response)
        this.token = response.data.token;
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    },
    subscribeToUpdates() {
      if (!this.token) {
        console.error('No token available for Mercure subscription');
        return;
      }
      // Adding the trailing slash gets rid of the cors error
      const url = new URL('http://localhost/.well-known/mercure');
      url.searchParams.append('topic', 'books');
      // url.searchParams.append('jwt', this.token); // Include the JWT token

      const eventSource = new EventSourcePolyfill(url.href, { headers: {
          'Authorization': 'Bearer ' + this.token,
        }});

      console.log('eventSource', eventSource)
      eventSource.onmessage = (event) => {
        console.log('event', event)
        const data = JSON.parse(event.data);
        this.updates.push(data);
      };

      eventSource.onerror = (error) => {
        console.log('Error connecting to Mercure hub:', error);
      };
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
