window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('url-form')
  const input = document.getElementById('url-input')

  if (!form || !input) return

  input.focus()

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    let value = input.value.trim()
    if (!value) return

    // If user did not provide a scheme, default to https://
    if (!/^https?:\/\//i.test(value)) {
      value = `https://${value}`
    }

    // Navigate the current window to the requested URL
    window.location.href = value
  })
})

