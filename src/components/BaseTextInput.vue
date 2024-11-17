<script setup lang="ts">
const emit = defineEmits(["valueChanged"]);

const props = defineProps<{
  id?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  bordered?: boolean;
}>();

const handleInput = (event: any) => {
  emit("valueChanged", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    :type="props.type || 'text'"
    name="props.name"
    :id="props.id"
    class="text-input"
    :class="[props.bordered ? 'bordered-input' : 'ringed-input']"
    @input="handleInput"
    :value="props.value"
    :placeholder="props.placeholder"
  />
</template>

<style scoped>

input,
select {
  padding: 16px 13px 16px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
  color: white;
}

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

</style>