/* global WebSocket */
const ws = new WebSocket('ws://localhost:8080/msg/echo')

ws.onopen = () => console.log('connected', ws.readyState)
ws.onclose = () => console.error('disconnected')
ws.onerror = error => console.error('error', error)

ws.onmessage = (socket) => {
  const li = document.createElement('li')
  const payload = JSON.parse(socket.data)
  li.innerText = `From ${payload.senderID}: ${payload.message}`
  document.querySelector('#chat').append(li)
}

document.querySelector('#chatBox').addEventListener('submit', e => {
  e.preventDefault()

  const receiverID = document.querySelector('#recipient-id').value
  const message = document.querySelector('#message').value
  ws.send(JSON.stringify({ receiverID: +receiverID, message }))

  const li = document.createElement('li')
  li.innerText = `To ${receiverID}: ${message}`
  document.querySelector('#chat').append(li)
  document.querySelector('#message').value = ''
})
