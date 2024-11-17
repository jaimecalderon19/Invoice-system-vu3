<template>
    <div class="dropdown-container">
      <button
        :class="[
          'btn',
          { 'btn-disabled': disabled }
        ]"
        @click="toggleDropdown"
        :disabled="disabled"
      >
        <slot name="trigger">
          {{ text }}
        </slot>
        <span class="arrow" :class="{ 'arrow-up': isOpen }">▼</span>
      </button>
  
      <div v-if="isOpen" class="dropdown-menu" :class="{ 'menu-right': alignRight }">
        <slot name="menu">
          <div
            v-for="(option, index) in options"
            :key="index"
            class="dropdown-item"
            @click="handleOptionClick(option)"
          >
            {{ option.label }}
          </div>
        </slot>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>

  import {onMounted, onUnmounted, ref} from "vue"

  interface DropdownOption {
    label: string;
    value: any;
  }
  
  interface Props {
    disabled?: boolean;
    text?: string;
    options?: DropdownOption[];
    alignRight?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    text: 'Dropdown',
    options: () => [],
    alignRight: false
  });
  
  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
    (e: 'option-selected', option: DropdownOption): void;
  }>();
  
  const isOpen = ref(false);
  
  const toggleDropdown = (event: MouseEvent) => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value;
      emit('click', event);
    }
  };
  
  const handleOptionClick = (option: DropdownOption) => {
    emit('option-selected', option);
    isOpen.value = false;
  };
  
  // Cerrar el dropdown cuando se hace click fuera
  onMounted(() => {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        isOpen.value = false;
      }
    });
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', () => {});
  });
  </script>
  
  <style scoped>
  .dropdown-container {
    position: relative;
    display: inline-block;
  }
  
  .btn {
    background-color: #7b5cfa;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .arrow {
    font-size: 12px;
    transition: transform 0.2s;
  }
  
  .arrow-up {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 140px;
    margin-top: 4px;
    background-color: #252946;
    border: 1px solid #2e345e;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .menu-right {
    left: auto;
    right: 0;
  }
  
  .dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
  }
  
  .dropdown-item:hover {
    background-color: #4b33ac;;
  }
  
  
  .btn-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    }
  </style>