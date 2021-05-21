<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserIcon from './components/UserIcon.vue';

@Component({
  components: {
    UserIcon
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=KoHo&family=Roboto&display=swap');

:root {
  --font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family-display: 'KoHo', sans-serif;
  --color-text: #2c3e50;
  --color-background: hsla(0, 0%, 95%, 1) radial-gradient(circle, hsl(0, 0%, 95%), hsl(0, 0%, 100%));
}

html,
body {
  height: 100vh;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-family-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--color-background);
  color: var(--color-text);

  > header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 8px;
    box-sizing: border-box;

    a {
      color: black;
      text-decoration: none;
    }

    h1 {
      margin: 0rem;
      font-family: var(--font-family-display);
      font-size: 1.5rem,
    }
  }
}
</style>
