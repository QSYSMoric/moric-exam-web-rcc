<template>
    <el-form :model="form" label-width="auto">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="姓名" required>
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="性别">
                    <el-select v-model="form.gender">
                        <el-option value="男"> </el-option>
                        <el-option value="女"> </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="部门">
                    <el-input v-model="form.department" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="重要性">
                    <el-select v-model="form.importance">
                        <el-option value="重要"> </el-option>
                        <el-option value="普通"> </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col>
                <el-space class="w-100% justify-between" alignment="start">
                    <el-space direction="vertical">
                        <el-form-item
                            label="手机"
                            required
                            v-for="(item, index) of form.phones"
                        >
                            <el-space>
                                <el-input v-model="form.phones[index]" />
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="removePhone(index)"
                                >
                                    删除
                                </el-button>
                            </el-space>
                        </el-form-item>
                    </el-space>
                    <el-button @click="form.phones.push('')">
                        添加手机
                    </el-button>
                </el-space>
            </el-col>
            <el-col :span="12">
                <el-form-item label="电话">
                    <el-input v-model="form.telephone" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" />
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" type="textarea" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import { ContactForm } from './type';

const form = defineModel<ContactForm>({
    default: {
        name: '',
        phones: [''],
    },
});

/**
 * @description: 删除手机号
 * @param {*} index
 * @return {*}
 */
function removePhone(index: number): void {
    form.value.phones.splice(index, 1);
}
</script>

<style lang="scss"></style>
