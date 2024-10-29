import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()



export function sucssesNotif(data : string ) {
  notify({
    title: 'Succses',
    text: data,
    type: 'success',
  })
}

export function errorNotif(data : string ) {
  notify({
    title: 'Error',
    text: data,
    type: 'error',
  })
}

export function warningNotif(data : string) {
  notify({
    title: 'Warning',
    text: data,
    type: 'warn',
  })
}
