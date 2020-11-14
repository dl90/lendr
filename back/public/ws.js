/* global WebSocket */
const www = window.location
const ws = new WebSocket(`ws://${www.hostname}:${www.port}/msg/live`)

ws.onopen = () => console.log('connected')
ws.onclose = () => console.error('disconnected')
ws.onerror = error => {
  const div = document.createElement('div')
  div.innerText = error
  document.querySelector('#chat').append(div)
}

ws.onmessage = (socket) => {
  const div = document.createElement('div')
  const payload = JSON.parse(socket.data)

  /*
    payload {
      senderID: 1,
      sender: "John",
      receiverID: 2,
      receiver: "Joe",
      message: "a"
    }
  */

  div.innerText = `From ${payload.sender}: ${payload.message}`
  document.querySelector('#chat').append(div)
}

document.querySelector('#chatBox').addEventListener('submit', e => {
  e.preventDefault()

  const receiverID = document.querySelector('#recipient-id').value
  const message = document.querySelector('#message').value
  if (ws.readyState) ws.send(JSON.stringify({ receiverID: +receiverID, message }))

  const div = document.createElement('div')
  div.innerText = ws.readyState
    ? `To ${receiverID}: ${message}`
    : `Failed to send: ${message}`

  document.querySelector('#chat').append(div)
  document.querySelector('#message').value = ''
})
