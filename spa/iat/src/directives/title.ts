import { DirectiveOptions } from "vue";
import { DirectiveBinding } from "vue/types/options";

export const DocumentTitle: DirectiveOptions = {
  inserted: (el: HTMLElement, binding: DirectiveBinding) => {
    const { value } = binding;
    if (el.dataset.title) {
      document.title = el.dataset.title;
    } else if (value && value.title) {
      document.title = value.title;
    }
  },
  update: (el: HTMLElement, binding: DirectiveBinding) => {
    const { value } = binding;
    if (el.dataset.title) {
      document.title = el.dataset.title;
    } else if (value && value.title) {
      document.title = value.title;
    }
  }
};
