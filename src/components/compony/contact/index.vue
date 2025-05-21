<template>
    <el-descriptions :column="3" border>
        <!-- 第一行：独占一行 -->
        <el-descriptions-item label="姓名" :span="3" class="full-row">
            {{ data.name }}
        </el-descriptions-item>

        <!-- 第二行：两个平分 -->
        <el-descriptions-item :span="1" label="手机">
            {{ data.masked_phones?.join(',') }}
        </el-descriptions-item>
        <el-descriptions-item :span="1" label="电话">
            {{ data.telephone }}
        </el-descriptions-item>
        <el-descriptions-item :span="1" label="邮箱">
            {{ data.email }}
        </el-descriptions-item>

        <!-- 第三行：独占一行 -->
        <el-descriptions-item label="备注" :span="3" class="full-row">
            {{ data.remark }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import { V1Contact } from '@/types/dto';

const props = defineProps<{
    data: V1Contact;
}>();

const { data } = toRefs(props);
</script>

<style scoped lang="scss"></style>
