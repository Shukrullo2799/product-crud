<template>
  <div class="flex flex-column gap-3">
    <skeleton-table v-if="loading_skeleton"></skeleton-table>
    <template v-else>
      <div class="flex align-items-center justify-content-end">
        <Button class="p-button-info" @click="addItem()">
          <i class="mr-2 pi pi-plus"></i><span>Add</span>
        </Button>
      </div>
      <div class="bg-primary border-round h-full overflow-auto">
        <DataTable :value="useProductStore().getProducts">
          <template #empty>
            <div class="mx-auto text-xl text-300 text-center">No data</div>
          </template>
          <Column field="id" style="width: 64px">
            <template #header>
              <span class="w-3rem text-center">№</span>
            </template>
            <template #body="{ index }">
              <div class="text-center w-full">
                <span>{{ index + 1 + (page - 1) * 10 }} </span>
              </div>
            </template>
          </Column>
          <Column field="name_uz" header="Name"></Column>
          <Column field="address" header="Address"></Column>
          <Column field="cost" header="Cost"></Column>
          <Column field="product_type_id" header="Type"></Column>
          <Column field="actions" style="width: 100px">
            <template #body="{ data }">
              <div class="flex">
                <i
                  class="pi pi-pencil text-xl mx-2 text-blue-500 cursor-pointer"
                  @click="editItem(data)"
                ></i>
                <i
                  class="pi pi-trash text-xl mx-2 text-red-500 cursor-pointer"
                  @click="deleteConfirm(data)"
                ></i>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="flex justify-content-end">
        <pagination :total="total" :page="page" :per_page="per_page" @page="getPage($event)" />
      </div>
    </template>
  </div>
  <upsert-product
    v-if="dialog_upsert"
    @close="dialog_upsert = false"
    @save="getList()"
    :item="item_edit"
  />
  <confirm-delete
    v-if="dialog_delete"
    @confirm="deleteItem"
    @cancel="dialog_delete = false"
  ></confirm-delete>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product";
import SkeletonTable from "@/components/SkeletonTable.vue";
import ConfirmDelete from "@/components/ConfirmDelete.vue";
import Pagination from "@/components/Pagination.vue";
import UpsertProduct from "./UpsertProduct.vue";

const { fetchProducts, fetchDeleteProduct, fetchProductTypes } = useProductStore();
const loading_skeleton = ref(true);
const dialog_upsert = ref(false);
const dialog_delete = ref(false);
const item_edit = ref({});
const page = ref(1);
const from = ref(0);
const total = ref(108);
const per_page = ref(10);

const getList = () => {
  loading_skeleton.value = true;
  let params = `page=${page.value}&perPage=${per_page.value}`;

  fetchProducts(params).then((res) => {
    loading_skeleton.value = false;
  });
};
const getPage = (event) => {
  page.value = event.page;
  per_page.value = event.per_page;
  from.value = from.value * page.value;
  getList();
};
const addItem = () => {
  item_edit.value = {};
  dialog_upsert.value = true;
};
const editItem = (item) => {
  item_edit.value = item;
  dialog_upsert.value = true;
};
const deleteConfirm = (data) => {
  item_edit.value = data;
  dialog_delete.value = true;
};
const deleteItem = () => {
  fetchDeleteProduct(item_edit.value.id).then(() => {
    dialog_delete.value = false;
    getList();
  });
};
onMounted(() => {
  if (useProductStore().getProductTypes && !useProductStore().getProductTypes.length)
    fetchProductTypes();
  getList();
});
</script>
