<template>
  <Dialog
    header="Delete"
    v-model:visible="display"
    :style="{ width: '520px' }"
    :modal="true"
    @hide="$emit('cancel')"
  >
    <div class="text-center">
      <span>{{ "Are you sure delete" }}</span>
    </div>
    <div class="flex mt-4">
      <Button label="No" @click="$emit('cancel')" class="p-button-outlined w-full mr-3" />
      <Button
        :icon="loading ? 'pi pi-spin pi-spinner' : ''"
        label="Yes"
        @click="$emit('confirm')"
        class="p-button-danger w-full"
      />
    </div>
  </Dialog>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ConfirmDelete",
  props: { loading: { type: Boolean, default: false } },
  emits: ["cancel", "confirm"],
  setup() {
    const display = ref(true);
    return { display };
  },
};
</script>
