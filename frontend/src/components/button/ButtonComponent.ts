export default {
  props: {
    text: String,
    buttonType: {
      type: String,
      default: 'primary',
      validator(value: any) {
        return ['primary', 'secondary', 'danger'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
