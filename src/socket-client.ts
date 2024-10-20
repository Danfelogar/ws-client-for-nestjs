import { Manager, Socket } from 'socket.io-client';

let socket: Socket

export const connectToServer = (token: string) => {
  // localhost:3000/socket.io/socket.io.js

  //manager sirve para conectarse al servidor de socket.io
  const manager = new Manager('localhost:3000/socket.io/socket.io.js',{
    extraHeaders: {
      hello: 'world',
      authentication: token
    }
  })

  socket?.removeAllListeners()
  // socket?.getSocket().removeAllListeners()
  //este es el nameSpace al que se quiere conectar '/' es el default
  socket = manager.socket('/')

  // console.log(manager.socket('/'));
  addListeners()
}


const addListeners = () => {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!
  const clientUl = document.querySelector<HTMLUListElement>('#client-ul')!

  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!

  const messageUl = document.querySelector<HTMLUListElement>('#message-ul')!
  //todos los socket.on son para escuchar eventos del servidor
  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Connected'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Disconnected'
  })

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = ''
    clients.forEach(clientId => {
      clientsHtml += `<li>${clientId}</li>`
    })
    clientUl.innerHTML = clientsHtml
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if(messageInput.value.trim().length <= 0) return

    //emisión desde el cliente para el servidor
    socket.emit('message-from-client',{id:'ME', message: messageInput.value});

    messageInput.value = ''
  })

  socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
    const newMessage = `
    <li>
      <strong>${payload.fullName}</strong>
      <span>${payload.message}</span>
    </li>
    `;

    const li = document.createElement('li')
    li.innerHTML = newMessage
    messageUl.append(li)
  })
}