<template>
    <div>
        <router-link to="/index">
            <div class="error"></div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'name'

}
</script>

<style scoped>
.error{
    width: 100%;
    height: 100%;
    background:url('/static/img/404.png');
    background-size:cover;
    background-position:center center
}
</style>