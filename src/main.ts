import './style.css'
import { setupCounter } from './counter.ts'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>
    <br/>

    <span id="server-status"></span>

    <ul id="client-ul">
    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </from>

    <h3>Messages</h3>
    <ul id="message-ul">
    </ul>
  </div>
`
// localhost:3000/socket.io/socket.io.js
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer()

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

const inputJWT = document.querySelector<HTMLInputElement>('#jwtToken')!

btnConnect.addEventListener('click', () => {
  if(jwtToken.value.trim().length <= 0) return alert('enter a valid jwt token')
  connectToServer(jwtToken.value.trim())
})