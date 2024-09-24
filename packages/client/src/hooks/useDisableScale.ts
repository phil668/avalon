import { onMounted } from "vue";

function useDisableScale() {
  onMounted(() => {
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
  })
}

export { useDisableScale }
