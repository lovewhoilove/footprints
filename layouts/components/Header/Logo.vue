<template>
    <div class="logo-container">
        <transition name="sogoFade">
            <router-link class="logo-link" to="/">
                <img src="images/footprint.png" class="logo" />
                <h1 class="title">足迹点地图展示系统</h1>
            </router-link>
        </transition>
    </div>
</template>
<style>
.sogoFade-enter-active {
    transition: opacity 1.5s;
}

.sogoFade-enter,
.sogoFade-leave-to {
    opacity: 0;
}

.logo-container {
    position: relative;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    width: 260px;
    text-align: left;
    float: left;
}

.logo-container .logo-link {
    height: 100%;
    width: 100%;
}

.logo-container .logo-link .logo {
    height: 36px;
    vertical-align: middle;
    margin-right: 12px;
}

.logo-container .logo-link .title {
    display: inline-block;
    margin: 0;
    color: #1496db;
    font-weight: 600;
    line-height: 50px;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
}
</style>