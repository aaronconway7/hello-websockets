// Make Connection
const socket = io.connect(`http://localhost:4000`)

// Query DOM
const $id = document.getElementById.bind(document)
const chat = $id(`chat`)
const form = $id(`message-form`)
const username = $id(`username`)
const message = $id(`message`)
const feedback = $id(`feedback`)

// Emit Events
form.addEventListener(`submit`, (e) => {
    e.preventDefault()
    socket.emit(`chat`, {
        username: username.value,
        message: message.value,
        timestamp: e.timeStamp,
    })

    message.value = ``
})

message.addEventListener(`keypress`, (e) => {
    socket.emit(`typing`, username.value || `someone`)
})

// Listen for events
socket.on(`chat`, (data) => {
    chat.innerHTML += `
        <div class="grid auto-rows-max">
            <span class="text-sm opacity-50 italic">${data.timestamp}</span>
            <p class="inline-block">
                <strong>${data.username}:</strong> ${data.message}
            </p>
        </div>`
    feedback.innerHTML = ``
})

socket.on(`typing`, (data) => {
    feedback.innerHTML = `${data} is typing...`
})
