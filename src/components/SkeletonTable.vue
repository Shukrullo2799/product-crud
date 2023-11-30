<template>
  <div>
    <div class="p-datatable">
      <div class="p-datatable-wrapper">
        <table class="p-datatable-table w-full">
          <thead class="p-datatable-thead">
            <tr>
              <th class="text-center" style="width: 50px">№</th>
              <template v-for="(column, index) in columns" :key="index">
                <th>{{ column.header }}</th>
              </template>
              <th v-if="!no_action" class="border-left-1" style="min-width: 50px; width: 70px"></th>
            </tr>
          </thead>
          <tbody class="p-datatable-tbody">
            <template v-for="c in count" :key="c">
              <tr>
                <td><Skeleton height="20px" borderRadius="16px" width="100%"></Skeleton></td>
                <template v-for="(column, index) in columns" :key="index">
                  <td><Skeleton height="20px" borderRadius="16px" width="50%"></Skeleton></td>
                </template>
                <td v-if="!no_action" class="border-left-1">
                  <Skeleton height="20px" borderRadius="16px" width="70%"></Skeleton>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    columns: {
      type: Array,
      default: () => [{ header: "name" }, { header: "description" }],
      required: false,
    },
    no_action: { type: Boolean, default: false, required: false },
  },
  setup() {
    let count = ref(0);
    onMounted(() => {
      setInterval(() => {
        if (count.value < 15) {
          count.value++;
        }
      }, 1000);
    });
    return { count };
  },
};
</script>
