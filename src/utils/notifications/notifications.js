import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

export function sucssesNotif(data) {
  notify({
    title: 'Succses',
    text: data,
    type: 'success',
  })
}

export function errorNotif(data) {
  notify({
    title: 'Error',
    text: data,
    type: 'error',
  })
}

export function warningNotif(data) {
  notify({
    title: 'Warning',
    text: data,
    type: 'warn',
  })
}
