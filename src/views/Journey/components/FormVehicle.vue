<template>
    <Transation :menuIsOpen="vehiculeStore.menuIsOpen" title="Asignar vehículo">
      <form class="form">
        <!-- Proveedor -->
        <SelectCustom
          label="Proveedor"
          :options="providers"
          v-model="selectedProvider"
          placeholder="Seleccione un proveedor"
          :required="true"
          :rules="[v => !!v || 'Este campo es requerido']"
        />
  
        <!-- Conductor -->
        <SelectCustom
          label="Conductor"
          :options="drivers"
          v-model="selectedDriver"
          placeholder="Seleccione un conductor"
          :required="true"
          :rules="[v => !!v || 'Este campo es requerido']"
        />
  
        <!-- Tipo de Vehículo -->
        <SelectCustom
          label="Tipo de Vehículo"
          :options="vehicleTypes"
          v-model="selectedVehicleType"
          placeholder="Seleccione el tipo de vehículo"
          :required="true"
        />
  
        <!-- Placa -->
        <SelectCustom
          label="Placa"
          :options="licensePlates"
          v-model="selectedPlate"
          placeholder="Seleccione la placa"
          :required="true"
        />
  
        <!-- Tarifa -->
        <div class="tarifa-display">
          <label>Tarifa:</label>
          <span>{{ rate | currency }}</span>
        </div>
      </form>
  
      <!-- Botón de Asignación -->
      <div style="display: flex; justify-content: end;">
        <BoutomCustom variant="discard" @click="vehiculeStore.toggleMenu()">Descartar</BoutomCustom>
        <BoutomCustom variant="save" @click="assignVehicle">Asignar</BoutomCustom>
      </div>
    </Transation>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import { useVehiculeStore } from "@/stores/vehiculeStore";
  import Transation from "@/components/Transation.vue";
  import SelectCustom from "@/components/SelectCustom.vue";
  import BoutomCustom from "@/components/BoutomCustom.vue";

  const vehiculeStore = useVehiculeStore();
  
  // Variables y opciones quemadas
  const selectedProvider = ref('');
  const selectedDriver = ref('');
  const selectedVehicleType = ref('');
  const selectedPlate = ref('');
  const rate = ref(0.00);  // Tarifa inicial
  const currency = ref(0.00);  // Tarifa inicial
  
  const providers = [
    { label: '1A INGENIERIA Y GAS S.A.S', value: '1a_ingenieria_gas' },
    { label: 'Transporte Seguro LTDA', value: 'transporte_seguro' },
    { label: 'Logística Express SAS', value: 'logistica_express' },
  ];
  
  const drivers = [
    { label: 'Jocabeth PEREZ - 1010235685', value: 'jocabeth_perez' },
    { label: 'Carlos RODRIGUEZ - 1014587965', value: 'carlos_rodriguez' },
    { label: 'Ana MARTINEZ - 1017894562', value: 'ana_martinez' },
  ];
  
  const vehicleTypes = [
    { label: 'CAMIONETA', value: 'camioneta' },
    { label: 'SEDÁN', value: 'sedan' },
    { label: 'FURGÓN', value: 'furgon' },
  ];
  
  const licensePlates = [
    { label: 'GRC127', value: 'grc127' },
    { label: 'BCD456', value: 'bcd456' },
    { label: 'EFG789', value: 'efg789' },
  ];
  
  // Función para asignar el vehículo
  const assignVehicle = () => {
    console.log('Asignación completada con:', {
      provider: selectedProvider.value,
      driver: selectedDriver.value,
      vehicleType: selectedVehicleType.value,
      plate: selectedPlate.value,
      rate: rate.value,
    });
    // Aquí puedes agregar la lógica para procesar la asignación
  };
  </script>