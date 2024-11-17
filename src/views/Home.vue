<template>
  <main class="home">
    <InvoicesHeader class="header" />
    <div class="invoices-container">
      <InvoiceShort v-for="trayecto in trayectos" :key="trayecto.id" :journey="trayecto" @cancel-route="openModal = true"/>
    </div>
  </main>

  <Modal :open="openModal" :closeModal="closeModal">
   <div style="text-align: center;">

      <!-- Título de Anulación -->
      <h2>Anulación</h2>

      <SelectCustom
        label="Motivo de la anulacion"
        :options="cancelMotive"
        v-model="selectedMotive"
        placeholder="Seleccione el motivo"
        :required="true"
      />

      <!-- Confirmación de anulación -->
      <p>¿Estás seguro de anular el trayecto?</p>

      <!-- Botones de acción -->
      <div style="margin-top: 20px;">
        <button style="background-color: #007bff; color: white; padding: 10px 20px; margin-right: 10px;" >
          Sí
        </button>
        <button style="background-color: #dc3545; color: white; padding: 10px 20px;" @click="closeModal">
          No
        </button>
      </div>
    </div>
  </Modal>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useInvoiceStore } from '../stores'; // Asegúrate de que la ruta sea correcta
import Modal from '@/components/Modal.vue';
import SelectCustom from '@/components/SelectCustom.vue';
import InvoicesHeader from './Journey/components/Header.vue';
import InvoiceShort from './Journey/components/Short.vue';

// import Navigation from "@src/components/views/HomeView/Navigation/Navigation.vue";

const invoiceStore = useInvoiceStore();
const { filteredInvoices } = storeToRefs(invoiceStore);
const { setEdit } = invoiceStore;
const openModal = ref(false)
const selectedMotive = ref("")

const closeModal = () => {
  openModal.value = false;
};

const cancelMotive = [
  {label: "Jaime ", value: 1}
]

const trayectos = [
  {
    id: 1,
    fecha: "2024-11-04",
    usuario: "Juan Pérez",
    usuarioAprueba: "María Gómez",
    origen: "Oficina Central",
    destino: "Sucursal Norte",
    fechaServicio: "2024-11-10",
    horaServicio: "08:00",
    estado: "Pendiente",
  },
  {
    id: 2,
    fecha: "2024-11-05",
    usuario: "Ana López",
    usuarioAprueba: "Carlos Ramírez",
    origen: "Sucursal Sur",
    destino: "Oficina Central",
    fechaServicio: "2024-11-12",
    horaServicio: "14:00",
    estado: "Completado",
  },
  {
    id: 3,
    fecha: "2024-11-06",
    usuario: "Luis García",
    usuarioAprueba: "Carmen Ortega",
    origen: "Oficina Central",
    destino: "Sucursal Este",
    fechaServicio: "2024-11-15",
    horaServicio: "10:30",
    estado: "Cancelado",
  },
]

onMounted(() => {
  setEdit({ status: false });
  console.log(filteredInvoices.value);
  invoiceStore.fetchInvoices();
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 50px 20px 50px 16vw;
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
