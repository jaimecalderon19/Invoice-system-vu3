<script setup lang="ts">
import { ref, provide } from 'vue'

interface Props {
  onSubmit?: (valid: boolean) => void
}

const props = defineProps<Props>()

const formRef = ref<HTMLFormElement>()
const formElements = ref<any[]>([])

// Método para registrar elementos del formulario (inputs)
const registerFormElement = (element: any) => {
  formElements.value.push(element)
}

// Método para remover elementos del formulario
const unregisterFormElement = (element: any) => {
  const index = formElements.value.indexOf(element)
  if (index > -1) {
    formElements.value.splice(index, 1)
  }
}

// Proporcionar métodos de registro a los componentes hijos
provide('registerFormElement', registerFormElement)
provide('unregisterFormElement', unregisterFormElement)

// Método de validación
const validate = async () => {
  const results = await Promise.all(
    formElements.value.map(element => element.validate())
  )
  const valid = results.every(result => result === true)
  return { valid }
}

// Método para resetear el formulario
const reset = () => {
  formElements.value.forEach(element => element.reset())
}

// Método para resetear las validaciones
const resetValidation = () => {
  formElements.value.forEach(element => element.resetValidation())
}

// Exponer métodos para usar con ref
defineExpose({
  validate,
  reset,
  resetValidation
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  const { valid } = await validate()
  props.onSubmit?.(valid)
}
</script>

<template>
  <form
    ref="formRef"
    @submit="handleSubmit"
    class="custom-form"
  >
    <slot />
  </form>
</template>
