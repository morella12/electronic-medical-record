import { defineComponent, ref, watch, type PropType } from 'vue';

export default defineComponent({
  name: 'FieldComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<'text'>,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    filedType: {
      type: String as PropType<'input' | 'textarea'>,
      default: 'input',
    },
    placeholder: {
      type: String,
      default: '',
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue || '');

    watch(() => props.modelValue, (newValue) => {
      internalValue.value = newValue;
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      internalValue.value = target.value;
      emit('update:modelValue', internalValue.value);
    };

    return {
      internalValue,
      handleInput,
    };
  },
});
