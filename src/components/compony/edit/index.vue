<template>
    <el-form :model="form" label-width="auto">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="公司名称" required>
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="公司电话">
                    <el-input v-model="form.phone" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="公司邮编">
                    <el-input v-model="form.post_code" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="公司地址">
                    <el-input v-model="form.address" />
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="跟进人">
                    <el-select v-model="form.follow_person_id">
                        <el-option
                            v-for="item in users"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { GetV1UsersList } from '@/types/dto';
import { ComponyForm } from './type';

const props = defineProps<{
    users?: GetV1UsersList[];
}>();

const form = defineModel<ComponyForm>({
    default: {
        name: '',
    },
});

const { users } = toRefs(props);
</script>

<style lang="scss"></style>
