import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

export function useNotify() {
  function successNotif(data: string) {
    notify({
      title: 'Success',
      text: data,
      type: 'success',
    })
  }

  function errorNotif(data: string) {
    notify({
      title: 'Error',
      text: data,
      type: 'error',
    })
  }

  function warningNotif(data: string) {
    notify({
      title: 'Warning',
      text: data,
      type: 'warn',
    })
  }

  return {
    successNotif,
    errorNotif,
    warningNotif,
  }
}
