<template>
    <el-config-provider :locale="locale">
        <RouterView> </RouterView>
    </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const language = ref('zh-cn');

const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
</script>

<style scoped lang="scss"></style>
