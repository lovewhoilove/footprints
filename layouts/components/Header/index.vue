<template>
    <el-header style="text-align: right; font-size: 12px">
        <!-- Logo 子组件 -->
        <Logo />
        <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img src="/images/avatar.png" class="user-avatar" />
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>账号信息</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display: block">退出登陆</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script>
import Logo from './Logo';
export default {
    name: 'Header',
    components: { Logo },
    props: {},
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        logout() {
            this.$message('你点击了退出');
        },
    },
};
</script>
<style>
.el-header {
    background: #1b2034;
    color: #fff;
    line-height: 60px;
}

.el-header .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
}

.el-header .right-menu:focus {
    outline: none;
}

.el-header .right-menu .right-menu-item {
    display: inline-block;
    padding: 5px 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
}

.el-header .right-menu .right-menu-item .hover-effect {
    cursor: pointer;
}

.el-header .right-menu .right-menu-item .hover-effect:hover {
    background: rgba(0, 0, 0, 0.025);
}

.el-header .right-menu .avatar-container {
    margin-right: 30px;
}

.el-header .right-menu .avatar-container .avatar-wrapper {
    margin-top: 5px;
    position: relative;
}

.el-header .right-menu .avatar-container .avatar-wrapper .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
}

.el-header .right-menu .avatar-container .avatar-wrapper .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 15px;
    font-size: 12px;
}
</style>