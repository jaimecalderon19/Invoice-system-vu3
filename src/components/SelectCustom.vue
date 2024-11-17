<template>
    <div class="flex flex-col mb-3" ref="selectRef">
      <label
        v-if="props.label"
        :id="props.id"
        class="body-2 text-color mb-3"
      >
        {{ props.label }}
        <span v-if="props.required" class="text-red-500">*</span>
      </label>
  
      <div class="relative">
        <div
          class="select-container"
          :class="[
            props.bordered ? 'bordered-input' : 'ringed-input',
            props.class,
            { 'is-open': isOpen }
          ]"
          @click="toggleDropdown"
        >
          <span class="selected-value" :class="{ 'is-placeholder': !selectedLabel }">
            {{ selectedLabel || props.placeholder }}
          </span>
          <span class="select-arrow">▼</span>
        </div>
  
        <transition name="fade">
          <div v-if="isOpen" class="options-container">
            <div
              v-for="option in props.options"
              :key="option.value"
              class="option-item"
              :class="{ 'selected': option.value === modelValue }"
              @click="selectOption(option)"
            >
              {{ option.label }}
            </div>
          </div>
        </transition>
      </div>
  
      <span
        v-if="errorMessage"
        class="text-red-500 text-sm mt-1"
      >
        {{ errorMessage }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
  
  interface Option {
    label: string;
    value: string | number;
  }
  
  interface Props {
    modelValue: string | number; // Cambiado de value a modelValue
    rules?: ((value: any) => boolean | string)[]
    label?: string;
    id?: string;
    name?: string;
    class?: string;
    placeholder?: string;
    bordered?: boolean;
    required?: boolean;
    options: Option[];
  }
  
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '', // Valor por defecto para modelValue
    rules: () => [],
    options: () => [],
    placeholder: 'Seleccione una opción'
  })
  
  const emit = defineEmits(['update:modelValue']) // Cambiado de valueChanged a update:modelValue
  
  const selectRef = ref<HTMLDivElement>()
  const errorMessage = ref('')
  const isDirty = ref(false)
  const isOpen = ref(false)
  
  // Calcular la etiqueta seleccionada
  const selectedLabel = computed(() => {
    const selectedOption = props.options.find(opt => opt.value === props.modelValue)
    return selectedOption?.label || ''
  })
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const selectOption = (option: Option) => {
    emit('update:modelValue', option.value) // Emitimos el evento update:modelValue
    isOpen.value = false
    if (isDirty.value) {
      validateInput()
    }
  }

  
  // Cerrar el dropdown al hacer click fuera
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }

  
  
  // Métodos de validación
  const validateInput = async () => {
    isDirty.value = true
    errorMessage.value = ''
  
    if (!props.rules || props.rules.length === 0) {
      return true
    }
  
    for (const rule of props.rules) {
      const result = await rule(props.modelValue)
      if (result !== true) {
        errorMessage.value = typeof result === 'string' ? result : 'Error de validación'
        return false
      }
    }
  
    return true
  }
  
  </script>
  
  <style scoped>

    .mb-3{
        margin-bottom: 0.5rem;
    }

  .select-container {
    padding: 16px 13px 16px 20px;
    border-radius: 4px;
    border: 1px solid hsl(233, 30%, 21%);
    background-color: hsl(233, 31%, 17%);
    font-weight: 700;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  
  .select-arrow {
    font-size: 0.8em;
    transition: transform 0.3s ease;
  }
  
  .is-open .select-arrow {
    transform: rotate(180deg);
  }
  
  .is-placeholder {
    color: hsl(233, 30%, 50%);
  }
  
  .options-container {
    margin-top: 4px;
    background-color: hsl(233, 31%, 17%);
    border: 1px solid hsl(233, 30%, 21%);
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
  }
  
  .option-item {
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .option-item:hover {
    background-color: hsl(233, 30%, 25%);
  }
  
  .option-item.selected {
    background-color: hsl(233, 30%, 30%);
  }
  
  /* Animaciones */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>