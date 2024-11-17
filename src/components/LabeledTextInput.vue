<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import BaseTextInput from "./BaseTextInput.vue";

interface Props {
  rules?: ((value: any) => boolean | string)[]
  label?: string;
  type?: string;
  id?: string;
  value?: string;
  name?: string;
  class?: string;
  placeholder?: string;
  bordered?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  rules: () => []
})

const emit = defineEmits(['valueChanged'])

const inputRef = ref<HTMLInputElement>()
const errorMessage = ref('')
const isDirty = ref(false)

// Hacer el inject opcional usando { default: undefined }
const registerFormElement = inject('registerFormElement', undefined) as Function | undefined
const unregisterFormElement = inject('unregisterFormElement', undefined) as Function | undefined

// Solo registrar si estamos dentro de un CustomForm
onMounted(() => {
  if (registerFormElement) {
    registerFormElement({
      validate: validateInput,
      reset,
      resetValidation
    })
  }
})

onUnmounted(() => {
  if (unregisterFormElement) {
    unregisterFormElement({
      validate: validateInput,
      reset,
      resetValidation
    })
  }
})

// Métodos de validación
const validateInput = async () => {
  isDirty.value = true
  errorMessage.value = ''

  // Si no hay reglas, retornar válido
  if (!props.rules || props.rules.length === 0) {
    return true
  }

  for (const rule of props.rules) {
    const result = await rule(props.value)
    if (result !== true) {
      errorMessage.value = typeof result === 'string' ? result : 'Error de validación'
      return false
    }
  }

  return true
}

const reset = () => {
  emit('valueChanged', '')
  resetValidation()
}

const resetValidation = () => {
  errorMessage.value = ''
  isDirty.value = false
}

const updateValue = (value: string) => {
  emit('valueChanged', value)
  if (isDirty.value && props.rules && props.rules.length > 0) {
    validateInput()
  }
}

// Exponer métodos para uso externo
defineExpose({
  validate: validateInput,
  reset,
  resetValidation
})
</script>

<template>
  <div class="flex flex-col mb-3" ref="inputRef">
    <label
      v-if="props.label"
      :id="props.id"
      class="body-2 text-color mb-3"
    >
      {{ props.label }}
      <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <BaseTextInput
        :type="props.type || 'text'"
        :name="props.name"
        :id="props.id"
        :value="value"
        class="text-input"
        :class="[
          props.bordered ? 'bordered-input' : 'ringed-input',
          props.class,
        ]"
        :placeholder="props.placeholder"
        @value-changed="updateValue"
      />
    </div>

    <span
      v-if="errorMessage"
      class="text-red-500 text-sm mt-1"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style>
.mb-3{
  margin-bottom: 0.5rem;
}
</style>