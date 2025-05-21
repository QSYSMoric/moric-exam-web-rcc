<template>
    <el-main class="h-100% rcc-commons">
        <el-card shadow="never" class="h-100%">
            <template #header> 公司列表 </template>
            <section
                class="h-100% grid grid-rows-[max-content_1fr_max-content] gap-12px"
            >
                <el-space>
                    <el-button
                        type="primary"
                        @click="create_form_dialog = true"
                    >
                        添加公司
                    </el-button>
                    <el-button @click="refresh"> 刷新 </el-button>
                </el-space>
                <el-table :data="paging.rows" border style="width: 100%">
                    <el-table-column label="Date" width="180" fixed>
                        <template #header>
                            <el-input placeholder="公司名称" />
                        </template>
                        <template
                            #default="scope: {
                                row: GetV1Company;
                                $index: number;
                            }"
                        >
                            <RouterLink :to="`/${scope.row.id}`">
                                <el-text type="primary">
                                    {{ scope.row.name }}
                                </el-text>
                            </RouterLink>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="follow_person.name"
                        label="跟进人"
                        width="180"
                    />
                    <el-table-column
                        prop="created_at"
                        label="创建时间"
                        width="180"
                    >
                        <template
                            #default="scope: {
                                row: GetV1Company;
                                $index: number;
                            }"
                        >
                            <el-text>
                                {{
                                    dayjs(scope.row.created_at).format(
                                        'YYYY-MM-DD',
                                    )
                                }}
                            </el-text>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="公司电话"
                        width="120"
                    />
                    <el-table-column
                        prop="post_code"
                        label="公司邮编"
                        width="90"
                    />
                    <el-table-column prop="address" label="公司地址" />
                    <el-table-column align="center" width="160">
                        <template #header>
                            <el-text>操作</el-text>
                        </template>
                        <template
                            #default="scope: {
                                row: GetV1Company;
                                $index: number;
                            }"
                        >
                            <el-button
                                size="small"
                                @click="set_form.set_data(scope.row.id)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                size="small"
                                type="danger"
                                @click="paging.deleteCompany(scope.row.id)"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-model:current-page="paging.current_page"
                    v-model:page-size="paging.per_page"
                    :page-sizes="[1, 10, 20]"
                    :total="paging.total_count"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="paging.handleSizeChange"
                    @current-change="paging.handleCurrentChange"
                />
            </section>
        </el-card>
    </el-main>
    <el-dialog title="添加公司" v-model="create_form_dialog" width="600px">
        <CreateCompony
            v-model="create_form.data"
            :users="users"
        ></CreateCompony>
        <template #footer>
            <el-button type="primary" @click="create_form.add_compony">
                新增
            </el-button>
            <el-button @click="create_form.remake"> 重置 </el-button>
        </template>
    </el-dialog>
    <el-dialog title="编辑信息" v-model="set_form_dialog">
        <EditCompony v-model="set_form.data" :users="users"> </EditCompony>
        <template #footer>
            <el-button type="primary" @click="set_form.set_compony">
                确认
            </el-button>
            <el-button @click="set_form.remake"> 重置 </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {
    addApiV1Company,
    deleteApiV1Company,
    getApiV1Company,
    setApiV1Company,
} from '@/api/company';
import { getApiV1UserList } from '@/api/user';
import { GetV1Company, GetV1UsersList } from '@/types/dto';
import { ComponyForm } from '@/types/form';
import { dayjs, ElMessage } from 'element-plus';
import CreateCompony from '@/components/compony/create/index.vue';
import EditCompony from '@/components/compony/edit/index.vue';
import { Soccer } from '@element-plus/icons-vue/dist/types';

const create_form_dialog = ref(false);

const set_form_dialog = ref(false);

/**
 * @description: 分页器
 * @return {*}
 */
const paging = ref<{
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
    rows: GetV1Company[];
    query?: {
        company_name?: string;
        follow_person_id?: number;
    };
    handleSizeChange: (val: number) => void;
    handleCurrentChange: (val: number) => void;
    deleteCompany: (val: number) => void;
}>({
    current_page: 1,
    total_pages: 0,
    total_count: 0,
    per_page: 10,
    rows: [],
    handleSizeChange: function (val: number): void {
        paging.value.per_page = val;

        getApiV1Company(
            paging.value.current_page,
            paging.value.per_page,
            paging.value.query?.company_name,
            paging.value.query?.follow_person_id,
        ).then((data) => {
            paging.value.rows = data.data.rows;

            paging.value.total_pages = data.data.total_pages;

            paging.value.total_count = data.data.total_count;
        });
    },
    handleCurrentChange: function (val: number): void {
        paging.value.current_page = val;

        getApiV1Company(
            paging.value.current_page,
            paging.value.per_page,
            paging.value.query?.company_name,
            paging.value.query?.follow_person_id,
        ).then((data) => {
            paging.value.rows = data.data.rows;

            paging.value.total_pages = data.data.total_pages;

            paging.value.total_count = data.data.total_count;
        });
    },
    deleteCompany: function (val: number): void {
        deleteApiV1Company(val).then((data) => {
            paging.value.rows.splice(val, 1);

            ElMessage({
                message: '删除成功',
                type: 'success',
            });
        });
    },
});

/**
 * @description: 人员
 * @return {*}
 */
const users = ref<GetV1UsersList[]>([]);

/**
 * @description: 创建公司表单
 * @return {*}
 */
const create_form = ref<{
    data: ComponyForm;
    add_compony: () => void;
    remake: () => void;
}>({
    data: {
        name: '',
        follow_person_id: 1,
    },
    add_compony: function (): void {
        addApiV1Company(create_form.value.data).then((data) => {
            paging.value.rows.push(data.data);

            ElMessage({
                message: '创建成功',
                type: 'success',
            });

            create_form_dialog.value = false;
        });
    },
    remake: function (): void {
        create_form.value.data = {
            name: '',
            follow_person_id: 1,
        };
    },
});

/**
 * @description: 编辑公司信息
 * @return {*}
 */
const set_form = ref<{
    id: number;
    data: ComponyForm;
    set_compony: () => void;
    remake: () => void;
    set_data: (id: number) => void;
}>({
    id: 0,
    data: {
        name: '',
        follow_person_id: 0,
    },
    set_compony: function (): void {
        setApiV1Company(set_form.value.id, set_form.value.data).then((data) => {
            ElMessage({
                message: '更新成功',
                type: 'success',
            });

            set_form_dialog.value = false;
        });
    },
    remake: function (): void {
        set_form.value.data = {
            name: '',
            follow_person_id: 1,
        };
    },
    set_data(id) {
        set_form_dialog.value = true;

        set_form.value.id = id;

        set_form.value.data = paging.value.rows.find((item) => item.id == id)!;
    },
});

/**
 * @description: 获取公司分页
 * @return {*}
 */
function refresh(): void {
    getApiV1Company(
        paging.value.current_page,
        paging.value.per_page,
        paging.value.query?.company_name,
        paging.value.query?.follow_person_id,
    ).then((data) => {
        paging.value.rows = data.data.rows;

        paging.value.total_pages = data.data.total_pages;

        paging.value.total_count = data.data.total_count;
    });
}

getApiV1UserList().then((data) => {
    users.value = data.data;
});

refresh();
</script>

<style lang="scss">
.rcc-commons {
    & .el-card {
        display: grid;
        height: 100%;
        grid-template-rows: max-content 1fr;
    }
}
</style>
