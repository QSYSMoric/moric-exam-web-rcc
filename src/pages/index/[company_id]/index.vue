<template>
    <el-space class="w-100% py-12px" direction="vertical" :size="16" fill>
        <el-space>
            <el-button type="primary" @click="add_dialog = true">
                添加联系人
            </el-button>
            <el-button> 刷新 </el-button>
        </el-space>
        <Contact
            v-for="(item, index) in company_info.contacts"
            :key="index"
            :data="item"
        />
    </el-space>
    <el-dialog title="添加联系人" v-model="add_dialog">
        <AddContact v-model="contact_form.data"> </AddContact>
        <template #footer>
            <el-button type="primary" @click="contact_form.add_contact">
                确认
            </el-button>
            <el-button @click="contact_form.remake"> 重置 </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { addApiV1CompanyContact, getApiV1CompanyInfo } from '@/api/company';
import { GetV1CompanyInfo } from '@/types/dto';
import Contact from '@/components/compony/contact/index.vue';
import { ContactForm } from '@/types/form';
import AddContact from '@/components/compony/add_contact/index.vue';

const route = useRoute() as unknown as {
    params: {
        company_id: number;
    };
};

const add_dialog = ref(false);

const contact_form = ref<{
    data: ContactForm;
    add_contact: () => void;
    remake: () => void;
}>({
    data: {
        name: '',
        phones: [''],
        gender: '男',
        email: '',
        remark: '',
        telephone: '',
        importance: '',
        department: '',
    },
    add_contact: function (): void {
        addApiV1CompanyContact(
            route.params.company_id,
            contact_form.value.data,
        ).then((data) => {
            company_info.value.contacts.push(data.data);
            add_dialog.value = false;
        });
    },
    remake() {
        contact_form.value.data = {
            name: '',
            phones: [''],
            gender: '男',
            email: '',
            remark: '',
            telephone: '',
            importance: '',
            department: '',
        };
    },
});

const company_info = ref<GetV1CompanyInfo>({
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
    follow_person_id: 0,
    contacts: [],
    tasks: [],
});

getApiV1CompanyInfo(route.params.company_id).then((data) => {
    company_info.value = data.data;
});
</script>

<style scoped lang="scss"></style>
