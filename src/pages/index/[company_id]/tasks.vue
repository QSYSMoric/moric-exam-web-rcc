<template>
    <el-space class="w-100% pt-16px" direction="vertical" fill>
        <el-card shadow="hover">
            <template #header>
                <el-space :size="16">
                    <el-text> 未完成 ({{ task_pending.length }}条) </el-text>
                    <el-button type="primary" @click="add_dialog = true">
                        添加跟进
                    </el-button>
                    <el-button> 完成 </el-button>
                </el-space>
            </template>
            <el-table
                :data="task_pending"
                style="width: 100%"
                @selection-change="task_form_add.handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column fixed label="安排时间/人" width="200">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        {{ dayjs(scope.row.time).format('YYYY-MM-DD') }}/{{
                            users.find((item) => item.id == scope.row.user_id)
                                ?.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column fixed label="创建时间/人" width="200">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        {{ dayjs(scope.row.create_at).format('YYYY-MM-DD') }}/{{
                            users.find((item) => item.id == scope.row.user_id)
                                ?.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column fixed label="联系人" width="150">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        {{
                            company_info.contacts.find(
                                (item) => item.id == scope.row.contact_id,
                            )?.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="联系方式" prop="contact_information">
                </el-table-column>
                <el-table-column label="阶段" prop="stage"> </el-table-column>
                <el-table-column label="备注" prop="remark"> </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="80">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        <el-space>
                            <el-button
                                type="primary"
                                @click="task_form_edit.set_data(scope.row.id)"
                            >
                                编辑
                            </el-button>
                            <el-button type="danger"> 删除 </el-button>
                        </el-space>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card shadow="hover">
            <template #header>
                <el-space>
                    <el-text> 已完成 ({{ task_success.length }}条) </el-text>
                </el-space>
            </template>
            <el-table :data="task_success" style="width: 100%">
                <el-table-column fixed label="安排时间/人" width="200">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        {{ dayjs(scope.row.time).format('YYYY-MM-DD') }}/{{
                            users.find((item) => item.id == scope.row.user_id)
                                ?.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column fixed label="创建时间/人" width="200">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        {{ dayjs(scope.row.create_at).format('YYYY-MM-DD') }}/{{
                            users.find((item) => item.id == scope.row.user_id)
                                ?.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column fixed label="联系人" width="150">
                    <template
                        #default="scope: { row: V1Tasks; $index: number }"
                    >
                        {{
                            company_info.contacts.find(
                                (item) => item.id == scope.row.contact_id,
                            )?.name
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="联系方式" prop="contact_information">
                </el-table-column>
                <el-table-column label="阶段" prop="stage"> </el-table-column>
                <el-table-column label="备注" prop="remark"> </el-table-column>
            </el-table>
        </el-card>
    </el-space>
    <el-dialog title="添加跟进" v-model="add_dialog">
        <AddTask
            v-model="task_form_add.data"
            :contact="company_info.contacts"
            :users="users"
        ></AddTask>
        <template #footer>
            <el-button type="primary" @click="task_form_add.add_task">
                确认
            </el-button>
            <el-button @click="task_form_add.remake"> 重置 </el-button>
        </template>
    </el-dialog>
    <el-dialog title="编辑跟进信息" v-model="set_dialog">
        <EditTask
            v-model="task_form_edit.data"
            :contact="company_info.contacts"
            :users="users"
        ></EditTask>
        <template #footer>
            <el-button type="primary" @click="task_form_edit.set_task">
                确认
            </el-button>
            <el-button @click="task_form_edit.remake"> 重置 </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {
    addApiV1CompanyTask,
    getApiV1CompanyInfo,
    setApiV1CompanyTask,
} from '@/api/company';
import { GetV1CompanyInfo, GetV1UsersList, V1Tasks } from '@/types/dto';
import { TaskForm } from '@/components/compony/add_task/type';
import { getApiV1UserList } from '@/api/user';
import { dayjs, ElMessage } from 'element-plus';
import AddTask from '@/components/compony/add_task/index.vue';
import EditTask from '@/components/compony/edit_task/index.vue';

const route = useRoute() as unknown as {
    params: {
        company_id: number;
    };
};

const add_dialog = ref(false);

const set_dialog = ref(false);

/**
 * @description: 跟进记录创建
 * @return {*}
 */
const task_form_add = ref<{
    data: TaskForm;
    add_task: () => void;
    remake: () => void;
    handleSelectionChange: (row: V1Tasks[]) => void;
}>({
    data: {
        time: '',
        stage: '',
        contact_id: 1,
        user_id: 1,
        remark: '',
        contact_information: '',
        state: 0,
    },
    add_task: function (): void {
        addApiV1CompanyTask(
            route.params.company_id,
            task_form_add.value.data,
        ).then((data) => {
            company_info.value.tasks.push(data.data);
        });
    },
    remake() {
        task_form_add.value.data = {
            time: '',
            stage: '',
            contact_id: 1,
            user_id: 1,
            remark: '',
            contact_information: '',
            state: 0,
        };
    },
    handleSelectionChange(row) {
        console.log(row);
    },
});

/**
 * @description: 跟进记录编辑
 * @return {*}
 */
const task_form_edit = ref<{
    data: TaskForm;
    id: number;
    remake: () => void;
    set_task: () => void;
    set_data: (id: number) => void;
}>({
    id: 0,
    data: {
        time: '',
        stage: '',
        contact_id: 0,
        user_id: 0,
        remark: '',
        contact_information: '',
        state: 0,
    },
    remake: function (): void {
        setApiV1CompanyTask(
            route.params.company_id,
            task_form_edit.value.id,
            task_form_edit.value.data,
        ).then((data) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            });
        });
    },
    set_task: function (): void {
        setApiV1CompanyTask(
            route.params.company_id,
            task_form_edit.value.id,
            task_form_edit.value.data,
        ).then((data) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            });
            set_dialog.value = false;
        });
    },
    set_data: function (id: number): void {
        set_dialog.value = true;

        task_form_edit.value.id = id;

        task_form_edit.value.data = company_info.value.tasks.find(
            (item) => item.id == id,
        )!;
    },
});

/**
 * @description: 人员
 * @return {*}
 */
const users = ref<GetV1UsersList[]>([]);

/**
 * @description: 公司详情
 * @return {*}
 */
const company_info = ref<GetV1CompanyInfo>({
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
    follow_person_id: 0,
    contacts: [],
    tasks: [],
});

/**
 * @description: 已完成的跟进任务
 * @param {*} computed
 * @return {*}
 */
const task_success = computed<V1Tasks[]>((): V1Tasks[] => {
    return company_info.value.tasks.filter((item) => item.state === 1);
});

/**
 * @description: 未完成的跟进任务
 * @param {*} computed
 * @return {*}
 */
const task_pending = computed<V1Tasks[]>((): V1Tasks[] => {
    return company_info.value.tasks.filter((item) => item.state === 0);
});

getApiV1UserList().then((data) => {
    users.value = data.data;
});

getApiV1CompanyInfo(route.params.company_id).then((data) => {
    company_info.value = data.data;
});
</script>

<style scoped lang="scss"></style>
