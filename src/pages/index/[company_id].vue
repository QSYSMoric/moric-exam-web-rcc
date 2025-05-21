<template>
    <el-main class="h-100% rcc-commodify">
        <el-space class="w-100%" direction="vertical" fill>
            <el-card shadow="hover">
                <el-text>
                    {{ company_info.name }}
                </el-text>
            </el-card>
            <el-card shadow="hover">
                <template #header> 基本信息 </template>
                <el-descriptions :column="2" border>
                    <!-- 第一行：独占一行 -->
                    <el-descriptions-item
                        label="跟进人"
                        :span="2"
                        class="full-row"
                    >
                        {{ company_info.follow_person?.name }}
                    </el-descriptions-item>

                    <!-- 第二行：两个平分 -->
                    <el-descriptions-item label="公司电话">
                        {{ company_info.phone }}
                    </el-descriptions-item>
                    <el-descriptions-item label="公司邮编">
                        {{ company_info.post_code }}
                    </el-descriptions-item>

                    <!-- 第三行：独占一行 -->
                    <el-descriptions-item
                        label="公司地址"
                        :span="2"
                        class="full-row"
                    >
                        {{ company_info.address }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card shadow="hover">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                >
                    <el-menu-item index="/">联系人</el-menu-item>
                    <el-menu-item index="/tasks">跟进记录</el-menu-item>
                </el-menu>
                <section class="h-[calc(100vh-550px)] overflow-y-auto">
                    <RouterView> </RouterView>
                </section>
            </el-card>
        </el-space>
    </el-main>
</template>

<script setup lang="ts">
import { getApiV1CompanyInfo } from '@/api/company';
import { GetV1CompanyInfo } from '@/types/dto';

const route = useRoute() as unknown as {
    params: {
        company_id: number;
    };
};

const router = useRouter();

const company_info = ref<GetV1CompanyInfo>({
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
    follow_person_id: 0,
    contacts: [],
    tasks: [],
});

const activeIndex = ref('/');

const handleSelect = (key: string) => {
    router.replace({
        path: `/${route.params.company_id}` + key,
    });
};

getApiV1CompanyInfo(route.params.company_id).then((data) => {
    company_info.value = data.data;
});
</script>

<style scoped lang="scss"></style>
