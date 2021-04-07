const express = require(`express`)
const socket = require(`socket.io`)

// App Setup
const app = express()
const server = app.listen(`4000`, () => {
    console.log(`👂  listening to requests on port 4000`)
})

// Static Files
app.use(express.static(`public`))

// Socket Setup
const io = socket(server)

io.on(`connection`, (socket) => {
    console.log(`🤝  made socket connection`, socket.id)

    socket.on(`chat`, (data) => {
        console.log(`✉️  sending message`, data.message, `from`, data.username)
        io.sockets.emit(`chat`, data)
    })

    socket.on(`typing`, (data) => {
        socket.broadcast.emit(`typing`, data)
    })
})
