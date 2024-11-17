<template>
  <div class="invoice-item">
    <p class="id">#{{ journey.id }}</p>
    <p class="name">{{ journey.fecha }}</p>
    <p class="name">{{ journey.usuario }}</p>
    <p class="name">{{ journey.usuarioAprueba }}</p>
    <p class="name">{{ journey.origen }}</p>
    <p class="name">{{ journey.destino }}</p>
    <p class="name">{{ journey.fechaServicio }}</p>
    <p class="name">{{ journey.horaServicio }}</p>
    <div
      class="status"
      :class="[statusBackground]"
    >
      <div
        class="status-circle"
        :class="[statusCircle]"
      ></div>
      <div
        class="status-text"
        :class="[statusColor]"
      >
        {{ journey.estado }}
      </div>
    </div>
    
    <div style="flex-basis: 15%; text-align: center;">
      <DropdownButton 
        text="Acciones"
        :options="[
          { label: 'Asignar vehiculo', value: 1 },
          { label: 'Anular trayecto', value: 2 }
        ]"
        @option-selected="handleOptionSelect"
      />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref} from 'vue';
import {useVehiculeStore} from '@/stores/vehiculeStore';
import DropdownButton from '@/components/DropdownButton.vue';
import Modal from '@/components/Modal.vue';

const vehiculeStore = useVehiculeStore();
const router = useRouter();

const props = defineProps({
  journey: Object,
  index: Number,
})

const emit = defineEmits(["cancel-route"])

interface DropdownOption {
    label: string;
    value: any;
  }

const handleOptionSelect = (option: DropdownOption) => {
  if (option.value == 1) {
    vehiculeStore.toggleMenu();
  }else if(option.value == 2){
    emit("cancel-route")
  }

  console.log('Opción seleccionada:', option);
};

interface Journey{
  id: number,
  fecha: string,
  usuario: string,
  usuarioAprueba: string,
  origen: string,
  destino: string,
  fechaServicio: string,
  horaServicio: string,
  estado: string,
};

const journey = props.journey as Journey;

// Computed properties for dynamic class binding
const statusBackground = computed(() => {
  switch (journey.estado) {
    case 'Draft':
      return 'draft-background';
    case 'Pending':
      return 'pending-background';
    case 'Paid':
      return 'paid-background';
    default:
      return '';
  }
});

const statusCircle = computed(() => {
  switch (journey.estado) {
    case 'Draft':
      return 'circle-draft';
    case 'Pending':
      return 'circle-pending';
    case 'Paid':
      return 'circle-paid';
    default:
      return '';
  }
});

const statusColor = computed(() => {
  switch (journey.estado) {
    case 'Draft':
      return 'draft-color';
    case 'Pending':
      return 'pending-color';
    case 'Paid':
      return 'paid-color';
    default:
      return '';
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invoice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 15px 32px;
  border: 1px solid #1e2139;
  border-radius: 8px;
  background-color: #1e2139;
  color: white;
  transition: border 350ms ease-in-out;
  cursor: pointer;
  margin-bottom: 20px;
}
.invoice-item:hover {
  border: 1px solid #7b5cfa;
}
.id {
  flex-basis: 5%;
  font-weight: 700;
}

.name {
  flex-basis: 15%;
  font-size: 12px;
  text-align: left;
}

.status {
  flex-basis: 15%;
  width: 105px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 6px;
  font-weight: 700;
}
.status-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
}
.status-text {
  font-size: 12px;
}


.draft-background {
  background-color: #292c45;
}
.draft-color {
  color: rgb(224, 228, 251);
}
.pending-background {
  background-color: rgba(255, 145, 0, 0.06);
}
.pending-color {
  color: rgb(255, 145, 0);
}
.paid-background {
  background-color: rgba(51, 215, 160, 0.06);
}
.paid-color {
  color: rgb(51, 215, 160);
}
.circle-draft {
  background-color: rgb(224, 228, 251);
}
.circle-pending {
  background-color: rgb(255, 145, 0);
}
.circle-paid {
  background-color: rgb(51, 215, 160);
}

@media screen and (max-width: 1024px) {
  .invoice-item {
    display: grid;
    grid-template-columns: 1fr 1fr 30px;
    grid-template-rows: auto;
    align-items: center;
    row-gap: 10px;
    padding: 16px 16px;
    margin-bottom: 10px;
  }
  .id {
    justify-self: start;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .due {
    justify-self: start;
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: start;
  }
  .price {
    justify-self: start;
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .name {
    justify-self: end;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .status {
    justify-self: end;
    align-self: center;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  svg {
    justify-self: end;
    align-self: center;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 4;
  }
}
</style>
