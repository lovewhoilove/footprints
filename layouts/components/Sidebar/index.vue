<template>
    <div style="100%">
        <el-aside width="200px">
            <el-menu>
                <template v-for="item in data">
                    <!-- 有子菜单，嵌套菜单 -->
                    <el-submenu v-if="hasChildren(item)" :index="item.name" :key="item.name">
                        <template slot="title">
                            <i :class="getIconCls(item.meta.icon)"></i>
                            {{ item.meta.title }}
                        </template>
                        <template v-for="child in item.children">
                            <el-submenu v-if="hasChildren(child)" :index="child.name" :key="child.name">
                                <template slot="title">{{ item.meta.title }}</template>
                                <nuxt-link :to="child.path">
                                    <el-menu-item :index="child.name" :key="child.name">
                                        {{ child.meta.title }}
                                    </el-menu-item>
                                </nuxt-link>
                            </el-submenu>
                            <template v-else>
                                <nuxt-link :to="child.path" :key="child.path">
                                    <el-menu-item :index="child.name" :key="child.name">{{
                                        child.meta.title
                                    }}</el-menu-item>
                                </nuxt-link>
                            </template>
                        </template>
                    </el-submenu>
                    <template v-else>
                        <!-- 只有一层菜单 -->
                        <nuxt-link :to="item.path" :key="item.path">
                            <el-menu-item :index="item.name" :key="item.name">
                                <i :class="getIconCls(item.meta.icon)"></i>
                                {{ item.meta.title }}
                            </el-menu-item>
                        </nuxt-link>
                    </template>
                </template>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        data: { type: Array, default: () => [] },
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        hasChildren(item) {
            return item.children && item.children.length > 0;
        },
        getIconCls(iconName) {
            return `el-icon-${iconName}`;
        },
    },
};
</script>
<style>
.el-aside {
    color: #333;
    border-right: solid 1px #e6e6e6;
    height: 100%;
    overflow: hidden;
}

.el-aside .el-menu {
    border-right: 0;
}
</style>