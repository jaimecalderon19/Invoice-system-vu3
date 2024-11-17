<template>
  <Transation :menuIsOpen="menuIsOpen" :title="edit.status ? 'Editar trayecto' : 'Nuevo trayecto'">
    <form class="form">
      <!-- Fecha Solicitud -->
      <LabeledTextInput
        label="Fecha Solicitud"
        type="date"
        placeholder="Seleccione la fecha"
        required
        class="mb-3"
        v-model="requestDate"
      />

      <!-- Tipo de Usuario -->
      <SelectCustom
        label="Tipo de Usuario"
        :options="userTypes"
        v-model="selectedUserType"
        :required="true"
        :rules="[v => !!v || 'Este campo es requerido']"
      />

      <!-- Usuario requiere servicio -->
      <SelectCustom
        label="Usuario requiere servicio"
        :options="users"
        v-model="selectedUser"
        placeholder="Seleccione un usuario"
        :required="true"
        :rules="[v => !!v || 'Este campo es requerido']"
      />

      <!-- Origen -->
      <SelectCustom
        label="Origen"
        :options="origins"
        v-model="selectedOrigin"
        placeholder="Seleccione el origen"
        :required="true"
      />

      <!-- Destino -->
      <SelectCustom
        label="Destino"
        :options="destinations"
        v-model="selectedDestination"
        placeholder="Seleccione el destino"
        :required="true"
      />

      <!-- Fecha Servicio -->
      <LabeledTextInput
        label="Fecha Servicio"
        type="date"
        placeholder="Seleccione la fecha de servicio"
        required
        class="mb-3"
        v-model="serviceDate"
      />

      <!-- Hora Servicio -->
      <LabeledTextInput
        label="Hora Servicio"
        type="time"
        placeholder="Seleccione la hora"
        required
        class="mb-3"
        v-model="serviceTime"
      />

      <!-- Centro de Costo -->
      <SelectCustom
        label="Centro de Costo"
        :options="costCenters"
        v-model="selectedCostCenter"
        placeholder="Seleccione el centro de costo"
      />
    </form>

    <!-- Botones -->
    <div style="display: flex; justify-content: end;">
      <BoutomCustom variant="discard" @click="invoiceStore.toggleMenu()">Descartar</BoutomCustom>
      <div>
        <BoutomCustom v-show="!edit.status" variant="save" @click="save">Guardar y Enviar</BoutomCustom>
        <BoutomCustom v-show="edit.status" variant="save" @click="update">Guardar Cambios</BoutomCustom>
      </div>
    </div>
  </Transation>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useInvoiceStore } from "../../../stores";
import { ref } from "vue";
import Transation from "@/components/Transation.vue";
import LabeledTextInput from "@/components/LabeledTextInput.vue";
import BoutomCustom from "@/components/BoutomCustom.vue";
import SelectCustom from "@/components/SelectCustom.vue";

// Pinia store
const invoiceStore = useInvoiceStore();
const { menuIsOpen, edit } = storeToRefs(invoiceStore);

// Variables y opciones quemadas
const requestDate = ref('');
const serviceDate = ref('');
const serviceTime = ref('');
const selectedUserType = ref('');
const selectedUser = ref('');
const selectedOrigin = ref('');
const selectedDestination = ref('');
const selectedCostCenter = ref('');

const userTypes = [
  { label: 'Empleado', value: 'empleado' },
  { label: 'Externo', value: 'externo' },
];

const users = [
  { label: 'Jaime', value: 1234 },
  { label: 'Carlos', value: 5678 },
  { label: 'Ana', value: 9101 },
];

const origins = [
  { label: 'Oficina Central', value: 'oficina_central' },
  { label: 'Bodega Principal', value: 'bodega_principal' },
  { label: 'Sucursal Norte', value: 'sucursal_norte' },
];

const destinations = [
  { label: 'Cliente A', value: 'cliente_a' },
  { label: 'Cliente B', value: 'cliente_b' },
  { label: 'Cliente C', value: 'cliente_c' },
];

const costCenters = [
  { label: 'Centro 1', value: 'centro_1' },
  { label: 'Centro 2', value: 'centro_2' },
  { label: 'Centro 3', value: 'centro_3' },
];

// Función para guardar un nuevo trayecto
const save = async () => {
  try {
    // await invoiceStore.addTrayecto();
    invoiceStore.toggleMenu();
  } catch (error) {
    console.error("Error al guardar el trayecto:", error);
  }
};

// Función para actualizar un trayecto existente
const update = async () => {
  try {
    if (edit.value.id) {
      // await invoiceStore.updateTrayecto({});
      invoiceStore.toggleMenu();
    }
  } catch (error) {
    console.error("Error al actualizar el trayecto:", error);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
