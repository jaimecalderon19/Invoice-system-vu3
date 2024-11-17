<template>
  <div
    role="dialog"
    class="modal-container"
    :aria-hidden="!props.open"
    aria-labelledby="modal-title"
    aria-modal="true"
  >
    <!-- Overlay -->
    <transition name="fade">
      <div
        v-show="props.open"
        class="modal-overlay"
      ></div>
    </transition>

    <!-- Modal -->
    <transition name="slide-down">
      <div
        v-show="props.open"
        class="modal-wrapper"
      >
        <div
          ref="modal"
          @click="closeOnClick"
          id="close-modal"
          class="modal-content-wrapper"
        >
          <!-- Contenido -->
           <div class="modal-content">
             <slot></slot>
           </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  open: boolean;
  closeModal: () => void;
}>();

const modal = ref<HTMLElement>();

// Cerrar modal al hacer click fuera
const closeOnClick = (event: Event) => {
  if ((event.target as HTMLElement).id === 'close-modal') {
    props.closeModal();
  }
};

// Cerrar modal con tecla ESC
const handleCloseOnEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    props.closeModal();
  }
};

// Gestionar eventos del teclado
onMounted(() => {
  document.addEventListener('keydown', handleCloseOnEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleCloseOnEscape);
});

// Gestionar el foco
watch(
  () => props.open,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        modal.value?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
  }
);
</script>

<style scoped>
.modal-container {
  position: relative;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 10;
  height: 100%;
  overflow-y: auto;
}

.modal-content-wrapper {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-content {
  color: white;
  background-color: #141624;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}
</style>