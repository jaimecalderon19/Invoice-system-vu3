<template>
    <transition name="slide-fade">
      <div class="transaction-container" v-show="menuIsOpen">
        <h2>{{ title}}</h2>
        <slot />
      </div>
    </transition>
  </template>
  
  <script lang="ts" setup>
  interface Props {
    menuIsOpen: boolean;
    title: String;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    menuIsOpen: false,
  });
  
  // Emitimos eventos para controlar el modal desde el padre
  const emit = defineEmits<{
    (e: 'update:menuIsOpen', value: boolean): void;
    (e: 'close'): void;
  }>();
  
  // Método para cerrar el modal
  const closeModal = () => {
    emit('update:menuIsOpen', false);
    emit('close');
  };
</script>

<style>
    .transaction-container {
    overflow: auto;
    position: absolute;
    top: 0;
    left: 150px;
    min-width: 55vh;
    max-width: 70vh;
    height: 100vh;
    padding: 56px 32px 2rem 129px;
    display: flex;
    flex-direction: column;
    background-color: #141624;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    color: white;
    z-index: 2;
}

    h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    }
    h3 {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgb(123, 92, 250);
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

    .form-container {
        top: 80px;
        width: 100vw;
        height: 100vh;
        padding: 20px 20px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    h2 {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }
    h3 {
        font-size: 0.75rem;
    }

}
</style>