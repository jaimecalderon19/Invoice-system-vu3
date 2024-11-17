<template>
    <button 
      :class="[
        'btn',
        `btn-${variant}`,
        { 'btn-disabled': disabled }
      ]"
      @click="handleClick"
      :disabled="disabled"
    >
      <slot />
    </button>
</template>
  
<script lang="ts" setup>
  interface Props {
    variant: 'save' | 'draft' | 'discard';
    disabled?: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'save',
    disabled: false
  });
  
  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
  }>();
  
  const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
      emit('click', event);
    }
  };
</script>

<style>

button {
  border: none;
  border-radius: 24px;
  cursor: pointer;
  padding: 17px 24px;
  color: white;
  font-weight: 700;
}

.btn-add-item {
  width: 100%;
  background-color: #252946;
  margin-top: 20px;
}

.btn-discard {
  background-color: #252946;
}
.btn-draft {
  background-color: #373b53;
}
.btn-save {
  background-color: #7b5cfa;
  margin-left: 5px;
}

@media screen and (max-width: 1024px) {
    .btn-container {
    padding-top: 2rem;
    padding-right: 20px;
    padding-left: 5px;
  }
  button {
    padding: 8px 12px;
  }
}

</style>