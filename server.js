var express = require("express")

var Socket = require("socket.io")

var app = express()

var fs = require("fs")

var request = require("request")

var cheerio = require("cheerio")

app.use(express.static("public"))

var server = app.listen(8080, "127.0.0.1", () => {
    console.log("server listening on port 8080")
})

var io = Socket(server)

var activeUser = new Set()

var userId = new Set();

var msg_bag = []

io.on("connection", (socket) => {

    console.log("Connection created")

    socket.on("new user", function(data) {

        console.log("User id is: " + data)

        socket.userId = data
        activeUser.add(data)

    })

    socket.on("users", () => {

        socket.emit("new user", [...activeUser])

    })

    socket.on("user info", (data) => {

        let l = data.length;

        for (var element of data) {

            let I = element.toString()
            l--;
            l = l;

            let info = `<div class='${data[5]}_${l}'> ${element} </div>`

            fs.appendFile("Info.html", info, "UTF-8", error => {
                if (error) {
                    throw error
                } else {
                    console.log(element + " saved")
                }
            })

        }

    })

    socket.on("disconnect", () => {

        activeUser.delete(socket.userId)
        socket.emit("user disconnected",
            socket.userId)

    })

    socket.on("added", ({
        content,
        by
    }) => {

        console.log("Data received")

        socket.emit(by,
            content)

    })

    socket.on("check", (data) => {

        if (data == "yes") {

            if (userId.length !== 0) {

                socket.emit("added_fred", [...userId])

            }

        }

    })

    socket.on("store_added",
        (data) => {

            userId.add(data)

        })

    socket.on("Int_check",
        (data) => {

            if (userId.length !== 0) {

                console.log("Received check from user_Id: " + data)

                var user_ID = [...userId]

                for (I = 0; I < user_ID.length; I++) {

                    var A = user_ID[I].split("-")

                    console.log(A)

                    if (data == `${A[0]}`) {

                        console.log(data + " and " + A[0] + " are the same")

                        var C = A[1]

                        socket.emit(`check_don_${data}`, `${C}`)

                        var z = user_ID.length - 1;

                        if (I == z) {

                            socket.emit(`fred_don_${data}`, "yes")

                        }

                    }

                }

            }

        })

    socket.on("line_check",
        (data) => {

            let A = [...activeUser]

            A.forEach(elem => {

                if (elem == data) {

                    let k = `${data}-online`

                    socket.emit(`line_check`, k)

                } else {}

            })

        })

    socket.on("messages", ({
        msg,
        by,
        to,
        time,
        New
    }) => {

        if (New == "yes") {

            let ele = `${to}-${by}`
            userId.add(ele)

        }

        let data = `<div id='${by}_${to}' class='melly'> <div class='message' id='${by}_${to}'> <div class='sender'> <div class='cont'> ${msg} </div> <div class='timestamp'> ${time} </div> </div> </div> </div>`

        let data2 = `<div id='${to}_${by}' class='melly'> <div class='messages' id='${to}_${by}'> <div class='receiver'> <div class='cont'> ${msg} </div> <div class='timestamp'> ${time} </div> </div> </div> </div>`

        msg_bag.push(`${by}_${to}-${data}`)
        msg_bag.push(`${to}_${by}-${data2}`)

        var bad = msg_bag

        for (I = 0; I < bad.length; I++) {

            var Z = bad[I].split("-")

            let A = `${Z[1]}`
            let B = `${Z[0]}`

            socket.emit(`sender_${by}`,
                {
                    msg: A,
                    Id: B,
                    idy: `${by}_${to}`
                })
            socket.emit(`receiver_${to}`,
                {
                    msg: A,
                    Id: B,
                    idy: `${to}_${by}`
                })

            msg_bag.pop(A)
            msg_bag.pop(B)

        }

        fs.appendFile("Msg.html", data, "UTF-8", error => {

            if (error) {
                throw error
            }

        })

        fs.appendFile("Msg.html",
            data2,
            "UTF-8",
            error => {

                if (error) {
                    throw error
                }

            })

    })

})