<template>
<div>
    <font-awesome-icon :icon="['fas', 'spinner']" />
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--color-background);
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
        @keyframes spinning {
            100% { transform: rotate(360deg); }
        }

        font-size: 10vw;
        box-sizing: border-box;
        border-radius: 50%;
        animation: spinning 1s infinite linear;

    }
}
</style>