<template>
  <div class="app" :class="{ dark: menuIsOpen }">
    <HeaderComp />
    <FormComp />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useInvoiceStore } from "./stores"; // Importa Pinia
import { computed } from "vue";
import HeaderComp from "./components/HeaderComp.vue";
import FormComp from "./components/FormComp.vue";

const invoiceStore= useInvoiceStore();


// Obtén el estado de menuIsOpen desde el store
const menuIsOpen = computed(() => invoiceStore.menuIsOpen); // Asumiendo que menuIsOpen es un getter o estado en la tienda

</script>


<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #2b2f4d;
  font-family: "Spartan", sans-serif;
  font-size: 0.75rem;
  line-height: 1.25;
}
.app {
  background-color: #141624;
  width: 100%;
  min-height: 100vh;
  display: flex;
  transition: background-color 0.5s;
}
.dark {
  background-color: #0a0b12;
}
</style>