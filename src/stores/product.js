import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const product_types = ref([]);

  const setProducts = (newProducts) => {
    products.value = newProducts;
  };
  const setProductTypes = (newProductTypes) => {
    product_types.value = newProductTypes;
  };
  const getProducts = computed(() => products.value);
  const getProductTypes = computed(() => product_types.value);
  const fetchProducts = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/product?${data}`)
        .then((response) => {
          setProducts(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const fetchDeleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/product/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const fetchUpdateProduct = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/product`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const fetchCreateProduct = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/product`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const fetchProductTypes = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/product/get-product-types`)
        .then((response) => {
          resolve(response);
          setProductTypes(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    products,
    getProducts,
    product_types,
    getProductTypes,
    fetchProducts,
    fetchDeleteProduct,
    fetchUpdateProduct,
    fetchCreateProduct,
    fetchProductTypes,
  };
});
