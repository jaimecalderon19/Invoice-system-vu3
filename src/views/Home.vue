<template>
  <main class="home">
    <InvoicesHeader class="header" />
    <div class="invoices-container">
      <InvoiceShort v-for="invoice in filteredInvoices" :key="invoice.id" :invoice="invoice" />
    </div>
  </main>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useInvoiceStore } from '../stores'; // Asegúrate de que la ruta sea correcta
import InvoicesHeader from '../components/InvoicesHeader.vue';
import InvoiceShort from '../components/InvoiceShort.vue';

// import Navigation from "@src/components/views/HomeView/Navigation/Navigation.vue";

const invoiceStore = useInvoiceStore();
const { filteredInvoices } = storeToRefs(invoiceStore);
const { setEdit } = invoiceStore;

onMounted(() => {
  setEdit({ status: false });
  console.log(filteredInvoices.value);
  invoiceStore.fetchInvoices();
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 50px 150px 50px 220px;
  height: 100vh;
  width: 100%;
}
.invoices-container {
  height: 90%;
  overflow-y: scroll;
  padding-right: 10px;
}
.header {
  margin-bottom: 30px;
}

::-webkit-scrollbar {
  width: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #141624;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #252946;
  border-radius: 20px;
}

@media screen and (max-width: 1024px) {
  .home {
    padding: 100px 120px 20px 120px;
  }
  .header {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 750px) {
  .home {
    padding: 100px 20px 20px 20px;
  }
}
</style>
