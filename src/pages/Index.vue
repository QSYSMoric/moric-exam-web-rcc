<template>
    <el-container class="w-100vw min-h-100vh rcc-layout">
        <el-aside class="w-200px! rcc-layout__aside">
            <Aside />
        </el-aside>
        <el-container>
            <el-header class="rcc-layout__header">
                <el-space class="justify-between h-100% w-100%">
                    Header
                </el-space>
            </el-header>
            <el-main>
                <RouterView> </RouterView>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Aside from '@/components/layout/aside.vue';
</script>

<style lang="scss">
.rcc-layout {
    & &__aside {
        background-color: #515a6e;

        box-shadow: rgba(0, 0, 0, 0.4) 2px 0px 4px 0px;
    }

    & &__header {
        background-color: #515a6e;
    }
}
</style>
