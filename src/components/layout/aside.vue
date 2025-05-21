<template>
    <el-card class="w-200px rcc-aside">
        <template #header> Logo </template>
        <el-menu default-active="1" :default-openeds="['1']">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>公司管理</span>
                </template>
                <el-menu-item index="1-1">
                    <RouterLink to="/"> 公司列表 </RouterLink>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-card>
</template>

<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue';
import { RouterLink } from 'vue-router';
</script>

<style lang="scss">
.rcc-aside {
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: transparent;

    & .el-card {
        &__body {
            padding: 0;
        }

        &__header {
            border-bottom: none;
        }
    }

    & .el-menu {
        background-color: transparent;
        --el-menu-active-color: #fff;
        --el-menu-text-color: #fff;

        border-right: none;

        .el-sub-menu__title {
            &:hover {
                background-color: #515a6e;
            }
        }

        &-item {
            &:hover {
                background-color: #2d8cf0;
            }
        }
    }
}
</style>
