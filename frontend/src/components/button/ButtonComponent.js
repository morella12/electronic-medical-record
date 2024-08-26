export default {
  props: {
    buttonType: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'danger'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
