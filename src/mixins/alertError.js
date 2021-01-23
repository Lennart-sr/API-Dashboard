export default {
  methods: {
    alertError(msg) {
      const hasAlert = document.querySelector('.alert'),
      inputs = document.querySelectorAll('input'),
      alert = document.createElement('span');

      alert.classList.add("alert")
      alert.innerText = msg

      if(hasAlert)
        hasAlert.remove()

      inputs[inputs.length-1].after(alert);
      setTimeout(() => alert.remove(), 10000);
    }
  }
}