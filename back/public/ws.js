/* global WebSocket */
const ws = new WebSocket('ws://localhost:8080/msg/echo')

ws.onopen = () => console.log('connected')
ws.onclose = () => console.error('disconnected')
ws.onerror = error => console.error('failed to connect', error)
ws.onmessage = ({ data }) => {
  const li = document.createElement('li')
  li.innerText = data
  document.querySelector('#chat').append(li)
}

document.querySelector('#chatBox').addEventListener('submit', e => {
  e.preventDefault()
  ws.send(document.querySelector('#message').value)
  document.querySelector('#message').value = ''
})
