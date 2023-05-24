var express = require("express")

var Socket = require("socket.io")

var app = express()

var fs = require("fs")

var request = require("request")

var cheerio = require("cheerio")

var bodyParser = require("body-parser")

var url = require("url")

var urlencode = bodyParser.urlencoded({
    extended: true
})

var fileUpload = require("express-fileupload")

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.use(express.json())

app.get("/flashwave", function(req, res) {
    res.send(__dirname + "/Sho_py.html")
})

var vn_hod = []
var vn_hod2 = []

app.post("/ads_upload", fileUpload({
    createParentPath: true
}), function(req, res) {

    if (req.files) {

        var file = req.files.ads_img_input
        var pathdir = __dirname + "/flashwave_ads_photo/" + file.name

        file.mv(pathdir, (err) => {

            if (err) {
                throw err
            } else {
                console.log("Done")
            }

        })

    }

})

app.post("/bis_upload", fileUpload({
    createParentPath: true
}), function(req,
    res) {

    if (req.files) {

        var file = req.files.myPic
        var nam = req.body.bis_nam
        var own = req.body.bis_own
        var mail = req.body.mail
        var abut = req.body.abut
        var id = req.body.id
        var bis = req.body.bissy
        var bis_count = req.body.bis_count
        console.log(file.name)

        var pathdir = __dirname + "/flashwave_photos/" + file.name

        if (bis == "yes") {

            fs.readFile("Bissy.html", "UTF-8", function(err, data) {

                if (err) {
                    throw err
                }

                var rep = "__";
                var elem = `--<img class='prof_img' src='${pathdir}' /><b class='T_nam'>${nam}</b>__`;

                var result = data.replace(rep, elem)

                fs.writeFile("Bissy.html", result, function(err) {

                    if (err) {
                        throw err
                    } else {
                        console.log("Done")
                    }

                })

            })

        } else {

            if (bis == "no") {

                let eley = `<div id='${id}' class='bisky'> <img class='prof_img' src='${pathdir}' /><b class='T_nam'>${nam}</b>__ </div>`

                fs.appendFile("Bissy.html", eley, "UTF-8", error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }

                })

            }

        }

        file.mv(pathdir,
            (err) => {

                if (err) {
                    throw err
                } else {

                    if (req.body.refer) {

                        var data = `<div id='${id}' class='bis_profile'> <div style='text-align: center; width:100%'> <img class='prof_img' src='${pathdir}' /> </div> <div class='bis_nam'>${nam}</div> <div class='bis_own'>${own}</div> <div class='abuti'>${abut}</div> <div class='contact'> <div style='display:flex; width:75%'> <div class='mail'> <a href='mailto:${mail}'> ${mail} </a> </div> </div> <button class='add'> <b> <i class='fa fa-plus'></i> Contact </b> </button> </div> <div id='prod_disp${bis_count}' class='prod_disp'></div> <div class='so_med'> <button class='add'> <b> <i class='fa fa-plus'></i> Social media </b> </button> <div class='so_cont'></div> </div> </div>`

                        fs.appendFile("Bissy.html", data, "UTF-8", error => {

                            if (error) {
                                throw error
                            } else {
                                console.log("Done")

                                var ele = `<div id='${req.body.refer}' class='refer'> <div> ${nam} </div> </div>`

                                fs.appendFile("Refer.html", ele, "UTF-8", error => {
                                    if (error) {
                                        throw error
                                    } else {

                                        return res.status(200).send("Business registration successful")

                                    }
                                })

                            }

                        })

                    } else {

                        if (!req.body.refer) {

                            var data = `<div id='${id}' class='bis_profile'> <div style='text-align: center; width:100%'> <img class='prof_img' src='${pathdir}' /> </div> <div class='bis_nam'>${nam}</div> <div class='bis_own'>${own}</div> <div class='abuti'>${abut}</div> <div class='contact'> <div style='display:flex; width:75%'> <div class='mail'> <a href='mailto:${mail}'> ${mail} </a> </div> </div> <button class='add'> <b> <i class='fa fa-plus'></i> Contact </b> </button> </div> <div id='prod_disp${bis_count}' class='prod_disp'></div> <div class='so_med'> <button class='add'> <b> <i class='fa fa-plus'></i> Social media </b> </button> <div class='so_cont'></div> </div> </div>`

                            fs.appendFile("Bissy.html", data, "UTF-8", error => {

                                if (error) {

                                    throw error

                                } else {

                                    console.log("Done")

                                }

                            })

                        }

                    }

                }

            })
    }

})

app.post("/prod_upload", fileUpload({
    createParentPath: true
}), function(req, res) {

    if (req.files) {

        var files = req.files.prod_pics
        var pre_disp = req.body.pre_disp
        var Id = req.body.Id

        files.forEach(file => {

            var pathdir = __dirname + "/flashwave_business/" + file.name

            file.mv(pathdir, (err) => {

                if (err) {
                    throw err
                } else {

                    var data = `<img id='${Id}_${pre_disp}' class='prod_img' src='${pathdir}' onclick='window.localStorage.setItem("receiver", "${Id}"), window.localStorage.setItem("pathdir", "${pathdir}"), window.localStorage.setItem("pre_disp", "${pre_disp}"), bis_start()'/>`

                    fs.appendFile("Product.html", data, "UTF-8", error => {
                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }
                    })

                }

            })

        })

    }

})

app.post("/frd_vn", fileUpload({
    createParentPath: true
}), function(req,
    res) {

    var name = req.body.fileName
    var rec = req.files.rec
    var by = req.body.by
    var to = req.body.to
    var audId = req.body.audId

    var pathdir = __dirname + "/flashwave_vn/" + name

    rec.mv(pathdir,
        (err) => {

            if (err) {
                throw err
            } else {
                console.log("Done")

                var G = `<div id='${by}_${to}' class='message'> <div class='frd_msg_mine'> <audio id='${audId}' src='${pathdir}' onended='audEnd()' hidden></audio> <div class='aud_pad'> <input id='aud${audId}' class='timeline' type='range' min='0' max='100' value='0' /> </div> </div> <button id='aud${audId}' class='aud_play' onclick='window.localStorage.setItem("audId", "${audId}"), aud_play()'> <i class='fa fa-play'></i> </button> <button id='aud${audId}' class='aud_pus' onclick='aud_pus()' hidden> <i class='fa fa-pause'></i> </button> </div>`

                var H = `<div id='${to}_${by}' class='message'> <div class='frd_msg_yours'> <audio id='${audId}' src='${pathdir}' onended='audEnd()' hidden></audio> <div class='aud_pad'> <input id='aud${audId}' class='timeline' type='range' min='0' max='100' value='0' /> </div> </div> <div class='play_pac2'></div> <div class='play_pac'> <button id='aud${audId}' class='aud_play' onclick='window.localStorage.setItem("audId", "${audId}"), aud_play()'> <i class='fa fa-play'></i> </button> <button id='aud${audId}' class='aud_pus' onclick='aud_pus()' hidden> <i class='fa fa-pause'></i> </button> </div> </div>`

                vn_hod = [];
                vn_hod.push(G)
                vn_hod.push(H)

                fs.appendFile("FrdMsg.html",
                    G,
                    "UTF-8",
                    error => {

                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }

                    })

                fs.appendFile("FrdMsg.html",
                    H,
                    "UTF-8",
                    error => {

                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }

                    })

                if (req.body.New) {

                    var New = req.body.New

                    fs.appendFile("MyFred.html", New, "UTF-8", error => {

                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }

                    })

                }

            }

        })

})

app.post("/bis_vn", fileUpload({
    createParentPath: true
}), function(req, res) {

    var rec = req.files.rec
    var reced = req.body.receiver
    var pre_disp = req.body.pre_disp
    var nam = req.body.nam
    var audId = req.body.audId
    var user_Id = req.body.user_Id

    var pathdir = __dirname + "/flashwave_business_vn/" + nam

    rec.mv(pathdir, (err) => {

        if (err) {
            throw err
        } else {

            console.log("Done")

            var G = `<div id='${user_Id}_${reced}_${pre_disp}' class='message'> <div class='bis_msgi_mine'> <audio id='${audId}' src='${pathdir}' onended='audEnd()' hidden></audio> <div class='aud_pad'> <input id='aud${audId}' class='timeline' type='range' min='0' max='100' value='0' /> </div> </div> <button id='aud${audId}' class='aud_play' onclick='window.localStorage.setItem("audId", "${audId}"), aud_play()'> <i class='fa fa-play'></i> </button> <button id='aud${audId}' class='aud_pus' onclick='aud_pus()' hidden> <i class='fa fa-pause'></i> </button> </div>`

            var H = `<div id='${reced}_${user_Id}_${pre_disp}' class='message'> <div class='bis_msgi_yours'> <audio id='${audId}' src='${pathdir}' onended='audEnd()' hidden></audio> <div class='aud_pad'> <input id='aud${audId}' class='timeline' type='range' min='0' max='100' value='0' /> </div> </div> <div class='play_pac2'></div> <div class='play_pac'> <button id='aud${audId}' class='aud_play' onclick='window.localStorage.setItem("audId", "${audId}"), aud_play()'> <i class='fa fa-play'></i> </button> <button id='aud${audId}' class='aud_pus' onclick='aud_pus()' hidden> <i class='fa fa-pause'></i> </button> </div> </div>`

            vn_hod2 = [];
            vn_hod2.push(G)
            vn_hod2.push(H)
            vn_hod2.push(pre_disp)

            fs.appendFile("BisMsg.html", G, "UTF-8", error => {

                if (error) {
                    throw error
                } else {
                    console.log("Done")
                }

            })

            fs.appendFile("BisMsg.html",
                H,
                "UTF-8",
                error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }

                })

            if (req.body.New) {

                var New = req.body.New

                fs.appendFile("MyFred.html", New, "UTF-8", error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }

                })

            }

        }

    })

})

var server = app.listen(8000, "127.0.0.1", () => {
    console.log("server listening on port 8000")
})

var io = Socket(server)

io.on("connection", (socket) => {

    socket.on("user",
        ({
            name,
            use,
            pass,
            phone,
            Id
        }) => {

            var data = `<div id='${Id}' class='info'> <div class='name'>${name}</div> <div class='use'>${use}</div> <div class='pass'>${pass}</div> <div class='phone'>${phone}</div> </div>`

            var info = `<div id='${phone}' class='friend'> <div class='icod'> <button class='imig'> <i class='fa fa-user'></i> </button> </div> <div class='namy' onclick='window.localStorage.setItem("chat_id", "${Id}")'>${use} <div id='${Id}' class='recent'> <button id='${Id}' class='msg_num'></button> </div> </div> <div class='poll' onclick='window.localStorage.setItem("chat_id", "${Id}")'> <i class='fa fa-menu'></i> </div> </div> <div id='${use}' class='friend'> <div class='icod'> <button class='imig'> <i class='fa fa-user'></i> </button> </div> <div class='namy' onclick='window.localStorage.setItem("chat_id", "${Id}")'>${use} <div id='${Id}' class='recent'> <button id='${Id}' class='msg_num'></button> </div> </div> <div class='poll' onclick='window.localStorage.setItem("chat_id", "${Id}")'> <i class='fa fa-menu'></i> </div> </div>`

            var login = `<div id='${phone}_${pass}' class='login'> <div id='${phone}_${pass}' class='log_nam'>${name}</div> <div id='${phone}_${pass}' class='log_pass'>${pass}</div> <div id='${phone}_${pass}' class='log_id'>${Id}</div> </div> <div id='${use}_${pass}' class='login'> <div id='${use}_${pass}' class='log_nam'>${name}</div> <div id='${use}_${pass}' class='log_pass'>${pass}</div> <div id='${use}_${pass}' class='log_id'>${Id}</div> </div>`

            fs.appendFile("Inform.html",
                info,
                "UTF-8",
                error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }

                })

            fs.appendFile("Inform.html",
                data,
                "UTF-8",
                error => {

                    if (error) {
                        throw error
                    } else {

                        console.log("User id is: " + Id)

                        socket.emit(`${Id}_done`, {
                            nam: name, usey: use
                        })
                    }

                })

            fs.appendFile("Inform.html",
                login,
                "UTF-8",
                error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }

                })

        })

    socket.on("bis_messages", ({
        by,
        to,
        content1,
        content2,
        pre_disp
    }) => {

        if (by !== "" && to !== "" && content1 !== "" && content2 !== "") {

            socket.emit(`${by}_bis_msg_sender`, content1)
            socket.emit(`${to}_bis_msg_reced`, {
                content: content2,
                by: by,
                pre_disp: pre_disp,
                to: to
            })

            fs.appendFile("BisMsg.html", content1, "UTF-8", error => {

                if (error) {
                    throw error
                } else {
                    console.log("Content1 Done")
                }

            })

            fs.appendFile("BisMsg.html",
                content2,
                "UTF-8",
                error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Content2 Done")
                    }

                })

        }

    })

    socket.on("bis_friend", (data) => {

        if (data !== "") {

            fs.appendFile("BisFred.html", data, "UTF-8", error => {

                if (error) {
                    throw error
                } else {
                    console.log("Done")
                }

            })

        }

    })

    socket.on("frd_new", ({
        by,
        to,
        msg1,
        msg2,
        New,
        snip
    }) => {

        if (New == "yes") {

            if ((by && to && msg1 && msg2) !== ("" && null && undefined)) {

                socket.emit(`${to}_frd_new`, {
                    msg: msg2, by: by, snip: snip
                })

                fs.appendFile("FrdMsg.html", msg1, "UTF-8", error => {

                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }

                })

                fs.appendFile("FrdMsg.html",
                    msg2,
                    "UTF-8",
                    error => {

                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }

                    })

            }

        } else {

            if (New == "no") {

                if ((by && to && msg1 && msg2) !== ("" && null && undefined)) {

                    socket.emit(`${to}_frd_reced`, {
                        msg: msg2, by: by, snip: snip
                    })

                    fs.appendFile("FrdMsg.html", msg1, "UTF-8", error => {

                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }

                    })

                    fs.appendFile("FrdMsg.html",
                        msg2,
                        "UTF-8",
                        error => {

                            if (error) {
                                throw error
                            } else {
                                console.log("Done")
                            }

                        })

                }

            }

        }

    })

    socket.on("frd_addy", (data) => {

        if (data !== ("" && null && undefined)) {

            fs.appendFile("MyFred.html", data, "UTF-8", error => {

                if (error) {
                    throw error
                } else {
                    console.log("Frd Done")
                }

            })

        }

    })

    socket.on("vn_send", (data) => {

        console.log("vn sent as been received")

        setTimeout(function() {

            var f = vn_hod[0]

            if (f !== ("" && null && undefined)) {

                socket.emit(`${data}_vn_send`, f)

            }

        },
            600);

    })

    socket.on("vn_send2", (data) => {

        console.log("vn sent as been received")

        setTimeout(function() {

            var f = vn_hod2[0]

            if (f !== ("" && null && undefined)) {

                socket.emit(`${data}_vn_send2`, f)

            }

        },
            600);

    })

    socket.on("vn_reced", ({
        by,
        to
    }) => {

        console.log("vn received as been sent")

        setTimeout(function() {

            var f = vn_hod[1]

            if (f !== ("" && null && undefined)) {

                socket.emit(`${to}_vn_reced`, {
                    cont: f, byi: by
                })

                setTimeout(function() {
                    vn_hod = []
                }, 50);

            }

        },
            600);

    })

    socket.on("vn_reced2", ({
        by,
        to
    }) => {

        console.log("vn received as been sent")

        setTimeout(function() {

            var f = vn_hod2[1]
            var g = vn_hod2[2]

            if ((f && g) !== ("" && null && undefined)) {

                socket.emit(`${to}_vn_reced2`, {
                    cont: f, byi: by, pre_disp: g
                })

                setTimeout(function() {
                    vn_hod2 = []
                }, 50);

            }

        },
            600);

    })

    socket.on("ads_create", (data) => {

        if (data !== "") {

            fs.appendFile("Bissy.html", data, "UTF-8", error => {

                if (error) {
                    throw error
                } else {
                    console.log("Done")
                }

            })

        }

    })

})