<template>
  <Dialog
    :header="item.id ? 'Edit' : 'Add'"
    v-model:visible="display"
    :style="{ width: '620px' }"
    :modal="true"
    @hide="$emit('close')"
  >
    <div class="mb-3">
      <label for="name">Name<span class="text-red-600"> *</span></label>
      <InputText
        v-model="form.name_uz"
        placeholder="Enter name"
        class="w-full surface-100 mt-2"
        :class="v$.name_uz.$error ? 'p-invalid' : ''"
      />
      <small v-for="(error, i) in v$.name_uz.$errors" class="p-error" :key="i">{{
        error.$message
      }}</small>
    </div>
    <div class="mb-3">
      <label for="address">Address<span class="text-red-600"> *</span></label>
      <InputText
        v-model="form.address"
        placeholder="Enter name"
        class="w-full surface-100 mt-2"
        :class="v$.address.$error ? 'p-invalid' : ''"
      />
      <small v-for="(error, i) in v$.address.$errors" class="p-error" :key="i">{{
        error.$message
      }}</small>
    </div>
    <div class="mb-3">
      <label for="cost">Cost<span class="text-red-600"> *</span></label>
      <InputNumber
        v-model="form.cost"
        placeholder="Enter name"
        class="w-full surface-100 mt-2"
        :class="v$.cost.$error ? 'p-invalid' : ''"
      />
      <small v-for="(error, i) in v$.cost.$errors" class="p-error" :key="i">{{
        error.$message
      }}</small>
    </div>
    <div class="mb-3">
      <label for="product_type_id">Type<span class="text-red-600"> *</span></label>
      <Dropdown
        optionValue="id"
        optionLabel="name_uz"
        class="w-full mt-2"
        v-model="form.product_type_id"
        :options="useProductStore().getProductTypes"
        placeholder="Select type"
      />
      <small v-for="(error, i) in v$.product_type_id.$errors" class="p-error" :key="i">{{
        error.$message
      }}</small>
    </div>

    <Button @click="save" class="mt-4 p-button-info w-full" :disabled="loading_save">
      <div class="flex justify-content-center align-items-center w-full">
        <span class="flex"><i class="text-xl mx-2 ong-floppy" /></span>
        <span class="flex">Save</span>
      </div>
    </Button>
  </Dialog>
</template>
<script setup>
import { ref, defineProps, onMounted, reactive, computed } from "vue";
import { useProductStore } from "@/stores/product";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const { fetchCreateProduct, fetchUpdateProduct } = useProductStore();
const props = defineProps({ item: { type: Object, default: () => ({}), required: true } });
const emit = defineEmits(["close", "save"]);

const form = reactive({
  ...props.item,
});
const rules = computed(() => {
  return {
    name_uz: { required },
    address: { required },
    cost: { required },
    product_type_id: { required },
  };
});

const display = ref(true);
const loading_save = ref(false);
const v$ = useVuelidate(rules, form);

const save = () => {
  v$.value.$validate().then((valid) => {
    if (valid) {
      loading_save.value = true;
      console.log(form);
      form.id
        ? fetchUpdateProduct(form).then(() => {
            loading_save.value = false;
            display.value = false;
            emit("save");
          })
        : fetchCreateProduct(form).then(() => {
            loading_save.value = false;
            display.value = false;
            emit("save");
          });
    }
  });
};
onMounted(() => {});
</script>
