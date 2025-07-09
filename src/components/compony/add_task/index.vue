<template>
    <el-form :model="form" label-width="auto">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="安排时间" required>
                    <el-date-picker v-model="form.time" type="date" placeholder="安排时间" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="跟进人">
                    <el-select v-model="form.user_id">
                        <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系人">
                    <el-select v-model="form.contact_id">
                        <el-option v-for="item in contact" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="跟进阶段">
                    <el-select v-model="form.stage">
                        <el-option value="了解客户需求以及开通使用" />
                        <el-option value="发送资料" />
                        <el-option value="见面" />
                        <el-option value="确认方案合同" />
                        <el-option value="续约电话" />
                        <el-option value="培训" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系方式">
                    <el-select v-model="form.contact_information">
                        <el-option value="电话" />
                        <el-option value="邮件" />
                        <el-option value="会面" />
                        <el-option value="其他" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" type="textarea" />
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="跟进状态">
                    <el-checkbox v-model="form.state" :true-value="1" :false-value="0" label="已完成" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { GetV1UsersList, V1Contact } from '@/types/dto';
import { TaskForm } from './type';

const props = defineProps<{
    users?: GetV1UsersList[];
    contact?: V1Contact[];
}>();

const form = defineModel<TaskForm>({
    default: {
        time: '2025-05-21T16:00:00.000Z',
        stage: '发送资料',
        contact_id: 2,
        user_id: 1,
        remark: 'dd',
        contact_information: '电话',
        state: 1,
    },
});

const { users, contact } = toRefs(props);
</script>

<style lang="scss"></style>
