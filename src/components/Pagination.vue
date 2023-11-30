<template>
  <div v-if="total > 20" class="mt-3 flex align-items-center">
    <div
      v-if="paginate.page !== 1 && page_total > 4"
      class="ong-page ml-0"
      @click="changePage(--paginate.page)"
    >
      <i class="pi pi-angle-left"></i>
    </div>
    <div v-if="paginate.page > 3" class="ong-page" @click="changePage(1)"><span>1</span></div>
    <div v-if="paginate.page > 4" class="ong-page">
      <i class="pi pi-ellipsis-h"></i>
    </div>
    <template v-for="i in page_total" :key="i">
      <div
        v-if="show(i)"
        class="ong-page"
        :class="{ active: i == paginate.page }"
        @click="changePage(i)"
      >
        <span>{{ i }}</span>
      </div>
    </template>
    <div v-if="paginate.page < page_total - 3" class="ong-page">
      <i class="pi pi-ellipsis-h"></i>
    </div>
    <div v-if="paginate.page < page_total - 2" class="ong-page" @click="changePage(page_total)">
      <span>{{ page_total }}</span>
    </div>
    <div
      v-if="paginate.page !== page_total && page_total > 4"
      class="ong-page"
      @click="changePage(++paginate.page)"
    >
      <i class="pi pi-angle-right"></i>
    </div>
    <div v-if="rows.length" class="ong-down mr-0" @click="showDowm">
      <span>{{ paginate.per_page }}</span>
      <i class="pi pi-angle-down"></i>
    </div>
    <Menu class="w-5rem" id="rows_menu" ref="rows_menu" :model="rowses" :popup="true" />
    <div class="py-2 ml-2">
      {{ (page - 1) * per_page + 1 }}-{{ per_page * page < total ? per_page * page : total }} /
      {{ total }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: { type: Number, default: 1 },
    rows: { type: Array, default: () => [20, 50, 100] },
    page: { type: Number, default: 1 },
    per_page: { type: Number, default: 1 },
  },
  emits: ["page"],
  data() {
    return {
      paginate: {
        page: this.page,
        per_page: this.per_page,
        total: this.total,
      },
      rowses: [],
    };
  },
  computed: {
    page_total() {
      return this.paginate.total ? Math.ceil(this.paginate.total / this.paginate.per_page) : 1;
    },
  },
  watch: {
    total(to) {
      this.paginate.total = to;
      if (this.page > 1 && to % this.per_page == 0) {
        this.paginate.page = this.paginate.page - 1;
        this.$emit("page", this.paginate);
      }
    },
  },
  methods: {
    show(i) {
      return i >= this.paginate.page - 2 && i <= this.paginate.page + 2;
    },
    changePage(page) {
      this.paginate.page = page;
      this.$emit("page", this.paginate);
    },
    showDowm(event) {
      this.$refs.rows_menu.toggle(event);
    },
  },
  mounted() {
    this.rowses = this.rows.map((row) => {
      return {
        label: row,
        value: row,
        command: () => {
          this.paginate.per_page = row;
          this.changePage(1);
        },
      };
    });
  },
};
</script>

<style scoped>
.ong-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-size: 16px;
  cursor: pointer;
  margin: 0px 4px;
  font-family: "ongfont-medium", sans-serif !important;
}
.ong-page:hover {
  border-color: var(--blue-600);
}

.active {
  background-color: var(--blue-600);
  color: var(--surface-a);
  border-color: var(--blue-600);
}
.active:hover {
  background-color: var(--blue-700);
  border-color: var(--blue-700);
}
.disabled {
  color: var(--gray-500);
  cursor: not-allowed;
}
.ong-down {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
  font-size: 16px;
  cursor: pointer;
  margin: 0px 4px;
  font-family: "ongfont-medium", sans-serif !important;
}
.ong-down:hover {
  border-color: var(--blue-600);
}
.ong-down span {
  margin: 8px 16px;
}
.ong-down i {
  margin: 8px 16px 8px 0px;
}
</style>
