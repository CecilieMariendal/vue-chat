<template>
  <div id="app">
    <header>
      <h1>
        <router-link to="/">[insert name]</router-link>
      </h1>
      <p>Realtime voice chat</p>
    </header>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  height: 100vh;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  > header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 8px;
    box-sizing: border-box;

    h1 {
      margin: 0rem;
      font-size: 1.5rem;

      a {
        color: black;
        text-decoration: none;
      }
    }

    p {
      margin: 0 0 0 0.5rem;
    }
  }
}
</style>
