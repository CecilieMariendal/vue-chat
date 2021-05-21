<template>
    <header>
        <h1>
            <router-link to="/">CHATTER</router-link>
        </h1>
    
        <router-link v-if="user" to="/profile"><user-icon></user-icon></router-link>
    </header>
</template>

<script>
import UserIcon from './UserIcon';

export default {
    components: {
        UserIcon
    },
    props: ['user'],
}
</script>

<style lang="scss" scoped>
header {
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
</style>
