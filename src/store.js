import { reactive } from "vue";
let store = reactive({
  searchTerm: "",
  currentUser: null,
});

export default store;
