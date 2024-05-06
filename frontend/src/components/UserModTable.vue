<template>
  <DxDataGrid
    :data-source="users"
    :show-borders="true"
    key-expr="id"
    @saved="onSaving"
  >
    <DxPaging :enabled="true" />
    <DxEditing
      :allow-updating="false"
      :allow-adding="false"
      :allow-deleting="false"
      v-model:changes="changes"
      mode="popup"
    >
      <DxPopup
        :show-title="true"
        :width="700"
        :height="525"
        title="Employee Info"
      />
      <DxForm>
        <DxItem :col-count="1" :col-span="2" item-type="group">
          <DxItem data-field="username" caption="UserName" />
          <DxItem data-field="password" caption="Password" />
          <DxItem data-field="roleId" caption="UserRole" />
        </DxItem>
      </DxForm>
    </DxEditing>

    <DxColumn data-field="id" caption="Id" />
    <DxColumn data-field="username" />
    <DxColumn data-field="password" />
    <DxColumn :width="125" data-field="roleId" caption="Role">
      <DxLookup :data-source="roles" value-expr="ID" display-expr="Name" />
    </DxColumn>
  </DxDataGrid>
</template>

<script setup lang="ts">
import {
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxForm,
  DxLookup,
  DxPaging,
  DxPopup,
} from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';
import { ref, onMounted } from 'vue';
import TableService, { UserUpdate } from '../services/table.service';
import { useAppUserStore } from '../stores/app';

let users = ref([]);
type Role = {
  ID: number;
  Name: string;
};

const roles: Role[] = [
  {
    ID: 1,
    Name: 'admin',
  },
  {
    ID: 2,
    Name: 'user',
  },
];

let changes = ref([]);

onMounted(async () => {
  const response = await TableService.getAllusers();
  users.value = response.data;
});

let store = useAppUserStore();
const onSaving = async () => {
  console.log(changes.value);
  let userArr: UserUpdate[] = users.value;
  console.log(userArr);
  await store.updateUsers(userArr);
  await TableService.getAllusers();
};
</script>

<style scoped lang="sass"></style>
