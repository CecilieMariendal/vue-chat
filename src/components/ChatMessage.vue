<template>
    <div class="message" :class="{'message-tx': messageTx}">
        {{message}}
    </div>
</template>

<script>
export default {
    props: ['message', 'messageTx'],
}
</script>

<style lang="scss" scoped>
.message {
    display: inline-block;
    margin: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: #ddd;
    border-radius: 4px;

    &.message-tx {
        margin-left: auto;
        background: rgb(107, 32, 178);
        color: white;
        font-weight: bold;
    }
}
</style>