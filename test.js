const socket = io("http://127.0.0.1:8000");

socket.on("connect", () => {

    console.log(socket.id)

})

var A = window.localStorage.getItem("user_Id")
var B = window.localStorage.getItem("bissy")
var q = window.localStorage.getItem("bis_count")
var t = window.localStorage.getItem("Frd_add")
var audioStream = null;
var rec = null;

var Idy = A;
var c = [];
var c2 = [];

window.localStorage.setItem("trio", "bis")
window.localStorage.setItem("recording", "no")
window.localStorage.setItem("recording2", "no")
window.localStorage.setItem("pathdir", "")
window.localStorage.setItem("attach_disp", "no")
window.localStorage.setItem("cards", 2)

if (A !== "" && A !== null && A !== undefined) {

    $(".paste").load(`Inform.html #${A}.info`)
    $(".paste2").load(`Inform.html .login`)

    setTimeout(function() {
        check()
    }, 700);

    if (B == "yes") {

        $(".paste5").load(`Bissy.html`)

        setTimeout(function() {
            bis_check()

            var z = window.localStorage.getItem("prod_img")

            if (z == "yes") {

                var v = window.localStorage.getItem("pre_disp")

                $(".paste7").load(`Product.html`)
                $(".paste9").load("BisMsg.html")
                $(".paste10").load(`BisFred.html #${A}_bis.friendy`)

            }

        },
            700);

    }

    if (q == "" || q == null || q == undefined) {
        window.localStorage.setItem("bis_count", 0)
    }

    if (t == "yes") {

        $(".paste13").load("MyFred.html")
        $(".paste12").load(`FrdMsg.html`)

        setTimeout(function() {

            check_frd()

        }, 500);

    }

} else {

    if (A == "" || A == null || A == undefined) {

        $(".fom2").slideToggle(1)
        $(".paste2").load(`Inform.html .login`)

    }

}

$(document).ready(function() {

    $(".Up").click(function() {

        $(".fom").slideToggle(1)
        $(".fom2").slideToggle(1)

    })

    $(".ini").click(function() {

        $(".fom").slideToggle(1)
        $(".fom2").slideToggle(1)

    })

    $(".upy").click(function() {

        var A = $("#full_name").val();
        var B = $("#user_name").val();
        var C = $("#password").val();
        var D = $("#phone").val();

        if (A !== "" && B !== "" && C !== "" && D !== "") {

            let ID = []
            for (I = 0; I < 6; I++) {
                var b = Math.floor(Math.random() * 6)
                ID.push(b)
            }

            var id = `${ID[0]}` + `${ID[1]}` + `${ID[2]}` + `${ID[3]}` + `${ID[4]}` + `${ID[5]}`
            window.localStorage.setItem("user_Id", id)
            window.localStorage.setItem("login", "yes")
            window.localStorage.setItem("bissy", "")
            window.localStorage.setItem("prod_img", "")
            window.localStorage.setItem("bis_count", 0)
            window.localStorage.setItem("Frd_add", "")
            Idy = id;


            socket.emit("user", {
                name: A,
                use: B,
                pass: C,
                phone: D,
                Id: id,
            })

            $("input").val("")

            socket.on(`${id}_done`, ({
                nam, usey
            }) => {
                console.log(nam)

                if (nam !== "" && usey !== "") {

                    $(".other").css({
                        "display": "flex", "width": "40%", "flex-grow": "1.0"
                    })

                    $(".fom2").slideToggle(1)
                    $(".logo2").slideToggle(1)
                    $(".logo").slideToggle(1)
                    $(".othery").slideToggle(1)

                    $(".nami").append(`<div> <b> ${B} </b> <div class='owny'> ${A} </div> </div>`)
                    $(".cont").slideToggle(1)

                }

            })

        }

    })

    $(".In").click(function() {

        var A = $("#username").val()
        A.trim()
        var B = $("#Password").val()
        B.trim()

        if (A !== "" && B !== "") {

            var C = $(`#${A}_${B}.login`).html()

            if (C !== "") {

                C.trim()

                var d = $(`#${A}_${B}.log_nam`).html()

                var e = $(`#${A}_${B}.log_pass`).html()
                var f = $(`#${A}_${B}.log_id`).html()
                var qu = e.trim()
                var ru = f.trim()
                var su = d.trim()

                if (B == qu) {

                    $(".fom").slideToggle(1)

                    $(".other").css({
                        "width": "40%", "display": "flex", "flex-grow": "1.0"
                    })

                    window.localStorage.setItem("login", "yes")
                    $("#username").val("")
                    $("#Password").val("")
                    $(".mody").html("")

                    $(".paste").load(`Inform.html #${ru}.info`)

                    window.localStorage.setItem("user_Id", ru)

                    setTimeout(function() {

                        var i = $(".paste").html()

                        if (i !== ("" && null && undefined)) {

                            check()

                            $(".paste5").load(`Bissy.html #${ru}.bis_profile`)

                            setTimeout(function() {

                                var y = $(".paste5").html()

                                if (y !== ("" && null && undefined)) {

                                    $(".paste7").load("Product.html")
                                    $(".paste9").load("BisMsg.html")
                                    $(".paste10").load(`BisFred.html #${f}_bis.friendy`)
                                    $(".paste5").load("Bissy.html")

                                    window.localStorage.setItem("bissy", "yes")

                                    setTimeout(function() {

                                        bis_check()

                                        var o = $(".paste10").html()

                                        if (o !== ("" && null && undefined)) {
                                            bid_check()
                                        }

                                    },
                                        400);

                                }

                                var z = $(`.paste5 > #${ru}.bis_profile`)

                                if (z.length !== ("" && null && undefined)) {

                                    window.localStorage.setItem("bis_count",
                                        z.length)

                                } else {
                                    window.localStorage.setItem("bis_count", 0)
                                }

                            },
                                400);

                            $(".paste13").load(`MyFred.html #${ru}.friend`)

                            setTimeout(function() {

                                var s = $(".paste13").html()

                                if (s !== ("" && null && undefined)) {

                                    window.localStorage.setItem("Frd_add", "yes")

                                    $(".paste12").load(`FrdMsg.html`)

                                    setTimeout(function() {
                                        check_frd()
                                    }, 400);

                                }

                            },
                                400);

                        }

                    },
                        700);

                } else {

                    if (B !== qu) {

                        $(".mody").html("*Incorrect Password")
                        $("#Password").val("")

                    }

                }

            }

        }

    })

    $(".logy2").click(function() {

        $("#myPic").click();

    })

    $(".closy").click(function() {

        $(".chat_open").slideToggle(1)

        $(".cont").slideToggle(1)

        $(".hed_bar").slideToggle(1)

        window.localStorage.setItem("chat_id", "")

        $(".namy").unbind('click')

    })

    $(".chat_disp").click(function() {

        $(".chat_open").slideToggle(1)

        var k = $(".chat_disp").html()

        $(".open_bod").html(k)

        $(".cont").slideToggle(1)

        $(".hed_bar").slideToggle(1)

        $(".poll").click(function() {
            Polly()
        })

        $(".namy").click(function() {

            var A = window.localStorage.getItem("chat_id")

            if (A !== "") {

                $(".paste4").load(`Inform.html #${A}.info`)

                setTimeout(function() {

                    var B = $(`#${A}.info > .use`).html()
                    B.trim()

                    var C = `<div class='cha_edd'> <div class='icodi'> <button class='chat_ext' onclick='chat_ext()'> <i class='fa fa-arrow-left'></i> </button> <button class='imig'> <i class='fa fa-user'></i> </button> </div> <div class='namee'> ${B} <div class='line'></div> </div> <div class='poll'> <i class='fa fa-align-center'></i> </div> </div>`

                    $(".open_hed").after(C)
                    $(".open_hed").slideToggle(1)
                    $(".open_bod").slideToggle(1)
                    $(".open_disp").slideToggle(1)

                    var l = `<div class='intro'> <div class='introd'> This chat is between you and ${B}, send a message now and he/she will be added to your friend list. <div>Messaging as never been better without flashwave <i class='fa fa-smile-o'></i> <i class='fa fa-smile-o'></i> <i class='fa fa-smile-o'></i> <i class='fa fa-smile-o'></i> </div> </div> </div>`

                    $(".msg_bod").html(l)

                    setTimeout(function() {
                        check_frd_msg(`${B}`)

                        $(`#${A}.msg_num`).remove()
                    },
                        300);

                }, 400);

            }

        })

    })

    $(".chat_add2").click(function() {

        $(".sech2").css({
            "display": "none"
        })

        $(".chat_add2").slideToggle(1)
        $(".chat_add").slideToggle(1)

    })

    $("#ads_img_input").change(function(e) {

        if (this.files && this.files[0]) {

            var t = e.target.files[0].name

            var src = `./flashwave_ads_photo/${t}`

            window.localStorage.setItem("ads_change", src)

            var reader = new FileReader()

            reader.onload = function (e) {

                var s = `<img class='ads_img' src='${e.target.result}' />`

                $(".ads_img_cont > .ads_img").replaceWith(s)

            }

            reader.readAsDataURL(this.files[0])

            var A = $("#ads_fom")[0]
            var form = new FormData(A);

            $.ajax({
                type: "post",
                enctype: "multipart/form-data",
                url: "http://127.0.0.1:8000/ads_upload",
                data: form,
                processData: false,
                contentType: false,
                success: function(mata) {
                    console.log(mata)
                },
            })

        }

    })

    $(".edy").click(function() {

        $(".hed_bar").slideToggle(1)
        $(".cont").slideToggle(1)
        $(".ads_ground").slideToggle(1)

        var A = window.localStorage.getItem("user_Id")

        var q = window.localStorage.getItem("cards")

        var v = $(".ads_bod").html()

        if (v == "") {

            if (q > 0) {

                for (I = 0; I < q; I++) {

                    var B = $(`.paste5 > #${A}_${I}.ads`)

                    $(".ads_bod").append(B)

                    $(`#${A}.ads`).css({
                        "margin": "0.5vw"
                    })

                }

            } else {

                if (q == 0) {

                    $(".ads_bod").html("<div style=' position: absolute; width: 85%; color:white; background: black; opacity: 0.5; border-radius: 2vw; padding: 2vw; font-size: 3vw; left: 6vw'> Oops, it looks like you have not created any ads for your business or you have not registered any business yet</div>")

                }

            }

        }

    })

    $(".closy2").click(function() {

        $(".hed_bar").slideToggle(1)
        $(".cont").slideToggle(1)
        $(".ads_ground").slideToggle(1)

    })

    $(".chat_add").click(function() {

        $(".chat_add").slideToggle(1)
        $(".chat_add2").slideToggle(1)

        $(".sech2").css({
            "display": "flex",
            "width": "80%",
            "float": "right"
        })

        $("#serch").click(function() {

            $(".chat_disp").css({
                "display": "none"
            })

        })

        $(".serched").click(function() {

            var A = $("#serch").val()

            if (A !== "") {

                $(".paste3").load(`Inform.html #${A}.friend`)

                setTimeout(function() {

                    var B = $(".paste3").html()

                    if (B !== "") {

                        $(".chat_disp").html(B)

                        $(".sech2").css({
                            "display": "none", "width": "80%", "float": "right"
                        })

                        $("#serch").val("")

                        $(".chat_disp").css({
                            "display": "block"
                        })

                        $(".chat_add2").slideToggle(1)
                        $(".chat_add").slideToggle(1)

                    } else {

                        if (B == "") {

                            $(".chat_disp").html("user not found")

                        }

                    }

                },
                    500);

            }

        })
    })

})

function check() {

    var A = window.localStorage.getItem("user_Id")

    if (A !== "" && A !== null && A !== undefined) {

        var B = window.localStorage.getItem("login")

        if (B == "yes") {

            $(".logo").slideToggle(1)
            $(".logo2").slideToggle(1)
            $(".othery").slideToggle(1)
            $(".other").css({
                "width": "40%", "display": "flex", "flex-grow": "1.0"
            })

            setTimeout(function() {

                var B = $(".name").html()
                var C = $(".use").html()
                B.trim()
                C.trim()

                $(".nami").append(`<div> <b> ${C} </b> <div class='owny'> ${B} </div> </div>`)
                $(".cont").slideToggle(1)

            }, 300);

        } else {

            if (B == "" || B == null || B == undefined) {

                $(".fom").slideToggle(1)

            }

        }

    }
}

function send_disp() {

    var A = $("#bis_msg").html()

    if (A == "") {

        var B = window.localStorage.getItem("recording2")

        if (B == "yes") {

            rec.stop()
            audioStream.getAudioTracks()[0].stop()

            $("#bis_vn_stop").slideToggle(1)
            $("#bis_msg_send").slideToggle(1)

            window.localStorage.setItem("recording2", "no")

        } else {

            if (B == ("no" || null || undefined)) {

                $('#bis_msg_send').slideToggle(5)
                $('#bis_vn_rec').slideToggle(5)

            }

        }

    }

}

function send_hid() {

    var A = $("#bis_msg").html()

    if (A == "") {

        $('#bis_msg_send').slideToggle(5)
        $('#bis_vn_rec').slideToggle(5)

    }

}

function send_disy() {

    var A = $(".msgy").html()

    if (A == "") {

        var B = window.localStorage.getItem("recording")

        if (B == "yes") {

            rec.stop()
            audioStream.getAudioTracks()[0].stop()

            $("#frd_vn_stop").slideToggle(1)
            $("#frd_send").slideToggle(1)

            window.localStorage.setItem("recording", "no")

        } else {

            if (B == ("no" || null || undefined)) {

                $('#frd_send').slideToggle(5)
                $('#frd_vn_rec').slideToggle(5)

            }

        }
    }

}

function send_hidy() {

    var A = $(".msgy").html()

    if (A == "") {

        $('#frd_send').slideToggle(5)
        $('#frd_vn_rec').slideToggle(5)

    }

}

function bis_reg() {

    $(function() {
        $(".bis_reg").dialog({
            modal: true,
            hide: {
                effect: "blind",
                duration: 100,
            },
            show: {
                effect: "blind",
                duration: 100,
            }
        })
    })

    $(".bis_reg").css({
        "background": "black",
    })

}

function bis_close() {

    $(".ui-icon-closethick").click()

}

$(document).ready(function() {

    $(".bis_img").click(function() {
        $("#myPic").click()

        window.localStorage.setItem("pics", "yes")
    })

    $("#myPic").change(function() {

        var p = `<div class='outputy'> <img class='output' /> </div>`

        if (this.files && this.files[0]) {

            var reader = new FileReader()

            reader.onload = function(e) {

                $(".output").attr("src", e.target.result)

            }

            reader.readAsDataURL(this.files[0])
            $(".bis_img").replaceWith(p)
        }

    })

    $(".bis_ext").click(function() {

        $(".cont").slideToggle(1)
        $(".hed_bar").slideToggle(1)
        $(".biss_disp").slideToggle(1)

        $(".biss_dispy").html("")

    })

    $(".biss_don").click(function() {

        var A = $("#biss_nam").val()
        var B = $("#biss_own").val()
        var C = $("#mail").val()
        var D = $(".abut").html()
        var F = window.localStorage.getItem("user_Id")

        var k = window.localStorage.getItem("pics")

        if (k == "" || k == null || k == undefined) {

            $("#myPic").click()
            window.localStorage.setItem("pics", "yes")
            return;

        }

        var form = $("#fum")[0]
        var formData = new FormData(form)

        var G = window.localStorage.getItem("bissy")
        var q = window.localStorage.getItem("bis_count")

        if (G == "" || G == null || G == undefined) {
            formData.append("bissy", "no")
        } else {
            if (G == "yes") {
                formData.append("bissy", "yes")
            }
        }

        if (q !== "") {
            formData.append("bis_count", q)
            q++;
            window.localStorage.setItem("bis_count", q)
        }

        if (A !== "" && B !== "" && C !== "" && D !== "" && A.length > 4) {

            var E = $("#referer").val()

            if (E == "") {

                formData.append("bis_nam", A)
                formData.append("bis_own", B)
                formData.append("mail", C)
                formData.append("abut", D)
                formData.append("id", F)

                $.ajax({
                    type: "post",
                    enctype: "multipart/form-data",
                    url: "http://127.0.0.1:8000/bis_upload",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(mata) {
                        console.log(mata)
                    },
                })

                $("#biss_nam").val("")
                $("#biss_own").val("")
                $("#mail").val("")
                $(".abut").html("")

                $(".ui-icon-closethick").click()
                window.localStorage.setItem("bissy", "yes")

                setTimeout(function() {

                    $(".cont").slideToggle(1)
                    $(".hed_bar").slideToggle(1)
                    $(".bis_dispy").load(`Bissy.html ${F}.bis_profile`)
                    $(".biss_disp").slideToggle(1)

                }, 800);

            } else {

                if (E !== "") {

                    formData.append("bis_nam", A)
                    formData.append("bis_own", B)
                    formData.append("mail", C)
                    formData.append("abut", D)
                    formData.append("refer", E)
                    formData.append("id", F)

                    $.ajax({
                        type: "post",
                        enctype: "multipart/form-data",
                        url: "http://127.0.0.1:8000/bis_upload",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(mata) {
                            console.log(mata)
                        },
                    })

                    $("#biss_nam").val("")
                    $("#biss_own").val("")
                    $("#mail").val("")
                    $(".abut").html("")

                    $(".ui-icon-closethick").click()
                    window.localStorage.setItem("bissy", "yes")

                    setTimeout(function() {

                        $(".cont").slideToggle(1)
                        $(".hed_bar").slideToggle(1)
                        $(".bis_dispy").load(`Bissy.html ${F}.bis_profile`)
                        $(".biss_disp").slideToggle(1)

                    }, 800);

                }

            }

        } else {

            if (A == "") {
                $("#biss_nam").focus()
            } else {
                if (B == "") {
                    $("#biss_own").focus()
                } else {
                    if (C == "") {
                        $("#mail").focus()
                    } else {
                        if (D == "") {
                            $(".abut").focus()
                        } else {
                            if (A.length <= 4) {
                                $("#biss_nam").val("")
                                $("#biss_nam").attr("placeholder", "minimum of four characters")
                            }
                        }
                    }
                }
            }

        }

    })

    $("#frd_send2").click(function() {

        var A = $("#frd_msg2").html()

        if (A !== "") {

            var B = window.localStorage.getItem("user_Id")

            var C = window.localStorage.getItem("chat_id")

            if ((B && C) !== ("" && null && undefined)) {

                $(`.paste16`).load(`FrdMsg.html #${B}_${C}.message`)

                setTimeout(function() {

                    var y = $(".paste16").html()

                    if (y !== "") {

                        var E = `<div id='${B}_${C}' class='message'> <div class='frd_msg_mine'> ${A} </div> </div>`

                        var F = `<div id='${C}_${B}' class='message'> <div class='frd_msg_yours'> ${A} </div> </div>`

                        socket.emit("frd_new", {
                            by: B, to: C, msg1: E, msg2: F, New: "no", snip: A
                        })

                        document.getElementById("frd_scroll2").remove()

                        $(".Qview").append(E)
                        var z = $(".Qview").html()

                        c = []
                        c.push(z)

                        $(".Qview").append("<div id='frd_scroll2'></div>")

                        document.getElementById("frd_scroll2").scrollIntoView()

                        document.getElementById("not_sund").play()

                        $("#frd_msg2").html("")
                        $(".paste12").html("")

                    } else {

                        if (y == "") {

                            var E = `<div id='${B}_${C}' class='message'> <div class='frd_msg_mine'> ${A} </div> </div>`

                            var F = `<div id='${C}_${B}' class='message'> <div class='frd_msg_yours'> ${A} </div> </div>`

                            socket.emit("frd_new", {
                                by: B, to: C, msg1: E, msg2: F, New: "yes", snip: A
                            })

                            document.getElementById("frd_scroll2").remove()

                            $(".Qview").append(E)
                            var z = $(".Qview").html()

                            c = []
                            c.push(z)

                            $(".Qview").append("<div id='frd_scroll2'></div>")

                            document.getElementById("frd_scroll2").scrollIntoView()

                            document.getElementById("not_sund").play()

                            $("#frd_msg2").html("")
                            $(".paste12").html("")

                            $(".paste11").load ("Inform.html")

                            setTimeout(function() {

                                var x = $(`#${C}.info > .phone`).html()
                                var rili = x.trim()

                                var z = $(`.paste11 > #${rili}.friend`).html()

                                var zs = `<div id='${B}' class='friend'>${z}</div>`

                                $("chat_disp").html(zs)

                                socket.emit("frd_addy", zs)

                                window.localStorage.setItem("Frd_add", "yes")

                            }, 400);

                        }

                    }

                },
                    400);

            }

        }

    })

    $("#bis_msg_send2").click(function() {

        var A = $("#bis_msg2").html()

        if (A !== "") {

            var B = window.localStorage.getItem("user_Id")
            var C = window.localStorage.getItem("receiver")
            var D = window.localStorage.getItem("msg_disp")

            if ((B && C && D) !== ("" && null && undefined)) {

                var E = `<div id='${B}_${C}_${D}' class='message'> <div class='bis_msgi_mine'> <div class='bis_msg_cont'> ${A} </div> </div> </div>`

                var F = `<div id='${C}_${B}_${D}' class='message'> <div class='bis_msgi_yours'> <div class='bis_msg_cont'> ${A} </div> </div> </div>`

                socket.emit("bis_messages", {
                    by: B, to: C, content1: E, content2: F, pre_disp: D
                })

                $("#bis_scroll2").remove()

                $('.Bview').append(E)
                var u = $(".Bview").html()
                c2 = []
                c2.push(u)

                $('.Bview').append("<div id='bis_scroll2'></div>")

                $("#bis_msg2").html("")
                $(".paste9").html("")

                document.getElementById("bis_scroll2").scrollIntoView()

                document.getElementById("not_sund").play()

                $(`.paste9`).load("BisMsg.html")

                setTimeout(function() {

                    var y = $(`.paste9 > #${B}_${C}_${D}.message`).html()

                    if (y == ("" || null || undefined)) {

                        var q = $(`#${C}.bis_profile > .bis_nam`).html()
                        q.trim()

                        var r = $(`#${C}.bis_profile > .bis_own`).html()
                        r.trim()

                        var s = $(`#${C}.bis_profile`).find("img").attr("src")

                        var v = `<div id='${B}_bis' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${s}' /> </button> </div> <div class='namy' onclick='window.localStorage.setItem("msg_disp", "${D}"), window.localStorage.setItem("receiver","${C}"), bis_start2()'> ${q} <div class='owny'> ${r} <button id='${C}' class='bis_num'></button> </div> </div> <div class='poll2' onclick='window.localStorage.setItem("msg_disp", "${D}"), window.localStorage.setItem("receiver","${C}")'> <i class='fa fa-align-center'></i> </div> </div>`

                        socket.emit("bis_friend", v)

                    }

                },
                    400);

            }

        }

    })

})

function chat_ext() {

    var s = $("#frd_msg").html()
    var t = window.localStorage.getItem("recording")

    $(".open_hed").slideToggle(1)
    $(".open_bod").slideToggle(1)
    $(".open_disp").slideToggle(1)
    $(".cha_edd").remove()

    if (s !== "") {
        $("#frd_msg").html("")

        setTimeout(function() {
            send_hidy()
        }, 10);
    }

    if (t == "yes") {
        rec.stop()
        audioStream.getAudioTracks()[0].stop()

        $("#frd_vn_rec").slideToggle(1)
        $("#frd_vn_stop").slideToggle(1)

        window.localStorage.setItem("recording", "no")
    }

}

function bis_check() {

    var j = window.localStorage.getItem("user_Id")

    var A = $(`#${j}.bisky`).html()
    A = `${A}`;

    if (A !== "") {

        var B = A.split("--")

        $(".biss_pad").css({
            "height": "15%"
        })

        if (B.length > 1) {

            for (var I = 0; I < B.length; I++) {

                $(".paste6").html(B[I])
                var g = $(".paste6").find("img").attr("src")

                var f = $(".paste6 > .T_nam").html()

                var C = `<div class='pre_due'> <img id='pre_disp${I}' class='pre_disp' src='${g}' onclick='window.localStorage.setItem("pre_disp", "pre_disp${I}"), bis_hal(), check_prod()' /> <div class='pre_mod'> <div id='bis_nam_tag${I}' class='bis_nam_tag'></div> <div class='add_pan'> <button id='prod_add${I}' class='prod_add' onclick='window.localStorage.setItem("pre_disp", "pre_disp${I}"), pre_disp()'> <i class='fa fa-plus'></i> </button> </div> </div> </div>`

                $(".bis_disp").append(C)
                $('.bis_disp').css({
                    "display": "flex"
                })
                $(".biss_pad").css({
                    "display": "none"
                })
                $(".add_disp").css({
                    "display": "inline", "text-align": "center"
                })
                $(".add_disp2").css({
                    "display": "inline", "text-align": "center"
                })

                nam_check(f, I)

            }

        } else {

            if (B.length == 1) {

                $(".paste6").html(B[0])
                var g = $(".paste6").find("img").attr("src")

                var f = $(".paste6 > .T_nam").html()

                var C = `<div class='pre_due'> <img id='pre_disp' class='pre_disp' src='${g}' onclick='window.localStorage.setItem("pre_disp", "pre_disp0"), bis_hal(), check_prod()' /> <div class='pre_mod'> <div class='bis_nam_tag'></div> <div class='add_pan'> <button class='prod_add' onclick='window.localStorage.setItem("pre_disp", "pre_disp0"), pre_disp()'> <i class='fa fa-plus'></i> </button> </div> </div> </div>`

                $(".bis_disp").append(C)
                $(".bis_disp").css({
                    "display": "flex"
                })
                $(".biss_pad").css({
                    "display": "none"
                })
                $(".add_disp").css({
                    "display": "inline", "text-align": "center"
                })
                $(".add_disp2").css({
                    "display": "inline", "text-align": "center"
                })

                nam_check(f, "")

            }

        }

    }

}

function nam_check(msg, cunt) {

    if (cunt !== ("" && null && undefined)) {

        $(`#bis_nam_tag${cunt}`).html(`<div class='predi'>${msg}</div>`)

    } else {

        $(".bis_nam_tag").html(`<div class='predi'>${msg}</div>`)

    }

}

function bis_hal() {

    $(".cont").slideToggle(1)
    $(".hed_bar").slideToggle(1)
    $(".biss_disp").slideToggle(1)

    var B = window.localStorage.getItem("user_Id")

    var A = $(`#${B}.bis_profile`)
    $(".bis_dispy").append(A)

    window.localStorage.setItem("hall", "no")

}

function pre_disp() {

    var A = window.localStorage.getItem("pre_disp")
    $("#prod_pics").click()

}

$(document).ready(function() {

    $("#prod_pics").change(function() {

        if (this.files && this.files[0]) {

            var data = $("#fum2")[0]
            var formData = new FormData(data)

            var A = window.localStorage.getItem("pre_disp")
            var v = window.localStorage.getItem("user_Id")

            formData.append("pre_disp", A)
            formData.append("Id", v)

            $.ajax({
                type: "post",
                enctype: "multipart/form-data",
                url: "http://127.0.0.1:8000/prod_upload",
                data: formData,
                processData: false,
                contentType: false,
                success: function(mata) {
                    console.log(mata)
                },
            })

            window.localStorage.setItem("prod_img", "yes")

            setTimeout(function() {
                check_prod()
            }, 700);

        }

    })

    $(".manager").click(function() {

        $(".link_create").slideToggle(1)
        $(".link_clip").slideToggle(1)
        $(".ads_create").slideToggle(1)
        $(".ads_clip").slideToggle(1)

        window.localStorage.setItem("creating", "manager")

        var y = window.localStorage.getItem("bis_count")

        for (I = 0; I < y; I++) {

            if (I == 0) {

                var o = $("#pre_disp.pre_disp").attr("src")

                var l = $(".bis_nam_tag > .predi").html()

                var p = `<div id='friendy' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${o}' /> </button> </div> <div class='namy2'>${l} <div class='owny'></div> </div> <div class='poll3'> <input type='radio' name='picked' class='rad' onfocusin='madsink("rad")' /> </div> </div>`

                if ((l && o) !== "") {


                    $(".bis_ads").html(`<div class='ads_for'> <b> Create manager for</b>:</div> <div class='for_disp'>${p}</div>`)
                    $(".bis_ads").slideToggle(1)

                    $(".namy2").click(function() {
                        $(`.rad`).focus()
                    })

                }

            }

            if (I > 0) {

                var o = $(`#pre_disp${I}.pre_disp`).attr("src")

                var l = $(`.bis_nam_tag${I} > .predi`).html()

                var p = `<div id='friendy${I}' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${o}' /> </button> </div> <div class='namy2'>${l} <div class='owny'></div> </div> <div class='poll3'> <input type='radio' name='picked' class='rad${I}' onfocusin='madsink("rad${I}")' /> </div> </div>`

                if ((l && o) !== "") {


                    $(".bis_ads").html(`<div class='ads_for'> <b> Create manager for</b>:</div> <div class='for_disp'>${p}</div>`)
                    $(".bis_ads").slideToggle(1)

                    $(".namy2").click(function() {
                        $(`.rad${I}`).focus()
                    })

                }

            }

        }

    })

    $(".ads_clip").click(function() {
        $(".ads_create").click()
    })

    $(".link_clip").click(function() {
        $(".ads_create").click()
    })

    $(".manager_clip").click(function() {
        $(".manager").click()
    })

    $(".ads_create").click(function() {

        $(".manager").slideToggle(1)
        $(".manager_clip").slideToggle(1)

        window.localStorage.setItem("creating", "ads")

        var y = window.localStorage.getItem("bis_count")

        for (I = 0; I < y; I++) {

            if (I == 0) {

                var o = $("#pre_disp.pre_disp").attr("src")

                var l = $(".bis_nam_tag > .predi").html()

                var p = `<div id='friendy' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${o}' /> </button> </div> <div class='namy2'>${l} <div class='owny'></div> </div> <div class='poll3'> <input type='radio' name='picked' class='rad' onfocusin='madsink("rad")' /> </div> </div>`

                if ((l && o) !== "") {


                    $(".bis_ads").html(`<div class='ads_for'> <b> Create card for</b>:</div> <div class='for_disp'>${p}</div>`)
                    $(".bis_ads").slideToggle(1)

                    $(".namy2").click(function() {
                        $(`.rad`).focus()
                    })

                }

            }

            if (I > 0) {

                var o = $(`#pre_disp${I}.pre_disp`).attr("src")

                var l = $(`.bis_nam_tag${I} > .predi`).html()

                var p = `<div id='friendy${I}' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${o}' /> </button> </div> <div class='namy2'>${l} <div class='owny'></div> </div> <div class='poll3'> <input type='radio' name='picked' class='rad${I}' onfocusin='madsink("rad${I}")' /> </div> </div>`

                if ((l && o) !== "") {


                    $(".bis_ads").html(`<div class='ads_for'> <b> Create ads for</b>:</div> <div class='for_disp'>${p}</div>`)
                    $(".bis_ads").slideToggle(1)

                    $(".namy2").click(function() {
                        $(`.rad${I}`).focus()
                    })

                }

            }

        }

    })

})

function check_prod() {

    var A = window.localStorage.getItem("bis_count")
    var B = window.localStorage.getItem("user_Id")
    var C = window.localStorage.getItem("pre_disp")

    $(".paste7").load(`Product.html #${B}_${C}.prod_img`)

    setTimeout(function() {

        if (A > 0) {

            A++;
            for (var I = 0; I < A; I++) {

                var b = $(`.paste7 > #${B}_pre_disp${I}.prod_img`)

                if (b !== "" && b !== null && b !== undefined) {

                    $(`#prod_disp${I}`).html(b)

                }

            }

        } else {
            if (A == 0) {

                var b = $(`#${B}_pre_disp0.prod_img`)

                if (b !== "" && b !== null && b !== undefined) {

                    $("#prod_disp0").html(b)

                }

            }
        }

    },
        300);

}

function check_hall() {

    var A = $(".paste8").html()

    if (A !== "") {

        $(".cont").slideToggle(1)
        $(".hed_bar").slideToggle(1)
        $(".bisy_hall").slideToggle(1)

        var B = `<div style='background: #2f3f4f; padding: 2vw; color:white; font-size: 4vw' class='bisi'> <button class='bis_exty' onclick='hall_don()'> <i class='fa fa-arrow-left'></i> </button> Business Hall </div> <div class='hallway'> <div class='row'> <div class='columny'> ${A} </div> </div> </div>`

        $(".bisy_hall").html(B)

        $(".prod_img").css({
            "vertical-align": "middle", "margin-top": "8px"
        })

        window.localStorage.setItem("hall", "yes")

    } else {

        if (A == "") {

            $(".paste8").load("Product.html")

            setTimeout(function() {

                var A = $(".paste8").html()

                if (A !== "" && A !== null && A !== undefined) {

                    $(".cont").slideToggle(1)
                    $(".hed_bar").slideToggle(1)
                    $(".bisy_hall").slideToggle(1)

                    var B = `<div style='background: #2f3f4f; padding: 2vw; color:white; font-size: 4vw' class='bisi'> <button class='bis_exty' onclick='hall_don()'> <i class='fa fa-arrow-left'></i> </button> Business Hall </div> <div class='hallway'> <div class='row'> <div class='columny'> ${A} </div> </div> </div>`

                    $(".bisy_hall").html(B)

                    $(".prod_img").css({
                        "vertical-align": "middle", "margin-top": "8px"
                    })

                    window.localStorage.setItem("hall", "yes")

                }

            },
                300);

        }

    }

}

function hall_don() {

    $(".cont").slideToggle(1)
    $(".hed_bar").slideToggle(1)
    $(".bisy_hall").slideToggle(1)
    $(".container_back").slideToggle(1)

    $(".bisy_hall").html("")

}

function bis_start() {

    var A = window.localStorage.getItem("receiver")

    var B = window.localStorage.getItem("user_Id")

    if (A !== B) {

        var I = $(".paste5").html()

        if (I == "") {
            $(".paste5").load("Bissy.html")
        }

        var C = window.localStorage.getItem("pathdir")

        console.log(C)

        setTimeout(function() {

            if (C !== "") {

                window.localStorage.setItem("file_attach", "yes")

                var D = window.localStorage.getItem("hall")

                if (D == "yes") {

                    var E = $(`#${A}.bis_profile > .bis_nam`).html()
                    E.trim()
                    var F = $(`#${A}.bis_profile`).find("img").attr("src")
                    var H = $(`#${A}.bis_profile > .bis_own`).html()
                    H.trim()

                    var l = `<div class='intro_hed'> <div class='intro_pad'> This message is a business message, all messages should be based on ${E}'s products and nothing else. <div> Once messaging starts, product (s) will be tagged <b>BID</b>, check more about BID in the BID section. </div> </div> </div>`

                    $(".chat_ody").html(l)

                    var G = `<div class='b_edd'> <button class='b_ext'> <i class='fa fa-arrow-left'></i> </button> <div class='b_img'> <img class='bimg' src='${F}' /> </div> <div class='b_nam'>${E} <div class='b_own'>${H}</div> </div> <div class='poll'> <i class='fa fa-align-center'></i> </div> </div>`

                    var J = `<img class='init_disp' src='${C}' />`
                    $(".attach_disp").html(J)

                    $(".bisy_chat_ed").html(G)

                    setTimeout(function() {
                        check_bis_msg()
                    }, 50);

                    $(".bisy_hall").slideToggle(1)
                    $(".bisy_chat").slideToggle(1)
                    $("#bis_msg").focus()
                    $(".attach_disp").slideToggle(500)
                    window.localStorage.setItem("attach_disp", "on")
                    window.localStorage.setItem("send_hid", "no")
                    $("#bis_msg").html(`Hello ${E}, is this still available?`)

                    $(".b_ext").click(function() {

                        $(".bisy_hall").slideToggle(1)
                        $(".bisy_chat").slideToggle(1)
                        $("#bis_msg").html("")
                        window.localStorage.setItem("pathdir", "")

                        var u = window.localStorage.getItem("attach_disp")

                        if (u == "on") {

                            $(".attach_disp").slideToggle(1)

                            $(".attach_disp").html("")

                            window.localStorage.setItem("attach_disp", "off")

                        }

                        var v = window.localStorage.getItem("send_hid")

                        if (v == "no") {

                            send_hid()

                            window.localStorage.setItem("send_hid", "yes")

                        }

                        var w = window.localStorage.getItem("recording2")

                        if (w == "yes") {

                            rec.stop()
                            audioStream.getAudioTracks()[0].stop()

                            $("#bis_vn_stop").slideToggle(1)
                            $("#bis_vn_rec").slideToggle(1)

                            window.localStorage.setItem("recording2", "no")

                        }

                    })

                } else {

                    if (D == "no") {

                        var E = $(`#${A}.bis_profile > .bis_nam`).html()
                        E.trim()
                        var F = $(`#${A}.bis_profile`).find("img").attr("src")
                        var H = $(`#${A}.bis_profile > .bis_own`).html()
                        H.trim()

                        var l = `<div class='intro_hed'> <div class='intro_pad'> This message is a business message, all messages should be based on ${E}'s products and nothing else. <div> Once messaging starts, product (s) will be tagged <b>BID</b>, check more about BID in the BID section. </div> </div> </div>`

                        $(".chat_ody").html(l)

                        var G = `<div class='b_edd'> <button class='b_ext'> <i class='fa fa-arrow-left'></i> </button> <div class='b_img'> <img class='bimg' src='${F}' /> </div> <div class='b_nam'>${E} <div class='b_own'>${H}</div> </div> <div class='poll'> <i class='fa fa-align-center'></i> </div> </div>`

                        var J = `<img class='init_disp' src='${C}' />`
                        $(".attach_disp").html(J)

                        $(".bisy_chat_ed").html(G)

                        setTimeout(function() {
                            check_bis_msg()
                        }, 50);

                        $(".biss_disp").slideToggle(1)
                        $(".bisy_chat").slideToggle(1)
                        $("#bis_msg").focus()
                        $(".attach_disp").slideToggle(500)
                        window.localStorage.setItem("attach_disp", "on")
                        window.localStorage.setItem("send_hid", "no")
                        $("#bis_msg").html(`Hello ${E}, is this still available?`)

                        window.localStorage.setItem("pathdir", "")

                        $(".b_ext").click(function() {

                            $(".biss_disp").slideToggle(1)
                            $(".bisy_chat").slideToggle(1)
                            $("#bis_msg").html("")

                            var u = window.localStorage.getItem("attach_disp")

                            if (u == "on") {

                                $(".attach_disp").slideToggle(1)

                                $(".attach_disp").html("")

                                window.localStorage.setItem("attach_disp", "off")

                            }

                            var v = window.localStorage.getItem("send_hid")

                            if (v == "no") {

                                send_hid()

                                window.localStorage.setItem("send_hid", "yes")

                            }

                            var w = window.localStorage.getItem("recording2")

                            if (w == "yes") {

                                rec.stop()
                                audioStream.getAudioTracks()[0].stop()

                                $("#bis_vn_stop").slideToggle(1)
                                $("#bis_vn_rec").slideToggle(1)

                                window.localStorage.setItem("recording2", "no")

                            }

                        })

                    }

                }

            } else {

                if (C == "") {

                    window.localStorage.setItem("file_attach", "no")

                    var E = $(`#${A}.bis_profile > .bis_nam`).html()
                    E.trim()
                    var F = $(`#${A}.bis_profile`).find("img").attr("src")
                    var H = $(`#${A}.bis_profile > .bis_own`).html()
                    H.trim()

                    var l = `<div class='intro_hed'> <div class='intro_pad'> This message is a business message, all messages should be based on ${E}'s products and nothing else. <div> Once messaging starts, product (s) will be tagged <b>BID</b>, check more about BID in the BID section. </div> </div> </div>`

                    $(".chat_ody").html(l)

                    var G = `<div class='b_edd'> <button class='b_ext'> <i class='fa fa-arrow-left'></i> </button> <div class='b_img'> <img class='bimg' src='${F}' /> </div> <div class='b_nam'>${E} <div class='b_own'>${H}</div> </div> <div class='poll'> <i class='fa fa-align-center'></i> </div> </div>`

                    $(".bisy_chat_ed").html(G)

                    setTimeout(function() {
                        check_bis_msg()
                    }, 50);

                    $(".cont").slideToggle(1)
                    $(".hed_bar").slideToggle(1)
                    $(".container_back").slideToggle(1)
                    $(".bisy_chat").slideToggle(1)

                    $(".b_ext").click(function() {

                        $(".cont").slideToggle(1)
                        $(".container_back").slideToggle(1)
                        $(".hed_bar").slideToggle(1)
                        $(".bisy_chat").slideToggle(1)
                        $("#bis_msg").html("")

                        var w = window.localStorage.getItem("recording2")

                        if (w == "yes") {

                            rec.stop()
                            audioStream.getAudioTracks()[0].stop()

                            $("#bis_vn_stop").slideToggle(1)
                            $("#bis_vn_rec").slideToggle(1)

                            window.localStorage.setItem("recording2", "no")

                        }

                    })

                }

            }

        }, 400);

    } else {

        if (A == B) {

            window.localStorage.setItem("pathdir", "")
            window.localStorage.setItem("file_attach", "no")
        }

    }

}

$(document).ready(function() {

    $("#bis_msg_send").click(function() {

        var A = $("#bis_msg").html()

        if (A !== "") {

            var B = window.localStorage.getItem("file_attach")

            if (B == "yes") {

                var C = window.localStorage.getItem("pathdir")

                var D = window.localStorage.getItem("user_Id")

                var E = window.localStorage.getItem("pre_disp")

                var G = window.localStorage.getItem("receiver")

                var F = `<div id='${D}_${G}_${E}' class='message'> <div class='bis_msgi_mine'> <div class='bis_img_cont'> <img class='bis_msg_img' src='${C}' /> </div> <div class='bis_msg_cont'>${A}</div> </div> </div>`

                var H = `<div id='${G}_${D}_${E}' class='message'> <div class='bis_msgi_yours'> <div class='bis_img_cont'> <img class='bis_msg_img' src='${C}' /> </div> <div class='bis_msg_cont'>${A}</div> </div> </div>`

                socket.emit("bis_messages", {
                    by: D, to: G, content1: F, content2: H, pre_disp: E
                })

                $("#bis_msg").html("")
                $(".attach_disp").html("")
                $(".attach_disp").slideToggle(1)

                setTimeout(function() {

                    send_hid()
                    window.localStorage.setItem("file_attach", "no")
                    window.localStorage.setItem("pathdir", "")
                    window.localStorage.setItem("attach_disp", "off")
                    window.localStorage.setItem("send_hid", "yes")

                }, 50);

            } else {

                if (B == "no") {

                    var D = window.localStorage.getItem("user_Id")

                    var E = window.localStorage.getItem("pre_disp")

                    var G = window.localStorage.getItem("receiver")

                    var F = `<div id='${D}_${G}_${E}' class='message'> <div class='bis_msgi_mine'> <div class='bis_msg_cont'>${A}</div> </div> </div>`

                    var H = `<div id='${G}_${D}_${E}' class='message'> <div class='bis_msgi_yours'> <div class='bis_msg_cont'>${A}</div> </div> </div>`

                    socket.emit("bis_messages", {
                        by: D, to: G, content1: F, content2: H, pre_disp: E,
                    })

                    $("#bis_msg").html("")
                    $(".attach_disp").html("")

                    setTimeout(function() {

                        send_hid()
                        window.localStorage.setItem("file_attach", "no")
                        window.localStorage.setItem("pathdir", "")
                        window.localStorage.setItem("attach_disp", "off")
                        window.localStorage.setItem("send_hid", "yes")

                    }, 50);

                }

            }

            setTimeout(function() {

                var D = window.localStorage.getItem("user_Id")

                var E = window.localStorage.getItem("pre_disp")

                var G = window.localStorage.getItem("receiver")

                var e = $(`.paste9 > #${D}_${G}_${E}.message`).html()

                if (e == ("" || null || undefined)) {


                    var q = window.localStorage.getItem("receiver")
                    var r = window.localStorage.getItem("pre_disp")
                    var s = $(`#${q}.bis_profile > .bis_nam`).html()
                    s.trim()
                    var u = $(`#${q}.bis_profile`).find("img").attr("src")
                    var n = window.localStorage.getItem("user_Id")
                    var m = $(`#${q}.bis_profile > .bis_own`).html()
                    m.trim()

                    var v = `<div id='${n}_bis' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${u}' /> </button> </div> <div class='namy' onclick='window.localStorage.setItem("msg_disp", "${r}"), window.localStorage.setItem("receiver","${q}"), bis_start2()'> ${s} <div class='owny'> ${m} <button id='${q}' class='bis_num'></button> </div> </div> <div class='poll2' onclick='window.localStorage.setItem("msg_disp", "${r}"), window.localStorage.setItem("receiver","${q}")'> <i class='fa fa-align-center'></i> </div> </div>`

                    socket.emit("bis_friend", v)

                }

            },
                300);

        }

    })

})

socket.on(`${Idy}_bis_msg_sender`, (data) => {

    if (data !== "") {

        $(".chat_ody").append(data)
        document.getElementById("bis_scroll").remove()

        $(".chat_ody").append("<div id='bis_scroll'></div>")

        var v = $(".chat_ody").html()
        c2 = [];
        c2.push(v)

        document.getElementById("bis_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

    }

})

socket.on(`${Idy}_bis_msg_reced`, ({
    content, by, pre_disp, to
}) => {

    if ((content && by && pre_disp) !== "") {

        var e = $(`.paste9 > #${to}_${by}_${pre_disp}.message`).html()

        if (e == "") {

            var q = $(`#${by}.info > .use`).html()
            var r = $(`#${by}.info > .name`).html()
            q.trim()
            r.trim()

            var t = window.localStorage.getItem("user_Id")

            var s = `<div id='${t}_bis' class='friendy'> <div class='icod'> <button class='imgi'> <i class='fa fa-user'></i> </button> </div> <div class='namy' onclick='window.localStorage.setItem("msg_disp", "${pre_disp}"), window.localStorage.setItem("receiver", "${by}"), bis_start2()'> ${q} <div class='owny'> ${r} <button id='${by}' class='bis_num'></button> </div> </div> <div class='poll2' onclick='window.localStorage.setItem("msg_disp", "${pre_disp}"), window.localStorage.setItem("receiver", "${by}")'> <i class='fa fa-align-center'></i> </div> </div>`

            socket.emit("bis_friend", s)
            $(".bid_pad").append(s)

        }

        $(".chat_ody").append(content)

        document.getElementById("bis_scroll").remove()

        $(".chat_ody").append("<div id='bis_scroll'></div>")

        var v = $(".chat_ody").html()
        c2 = [];
        c2.push(v)

        document.getElementById("bis_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

        setTimeout(function() {

            var o = $(`#${by}.bis_num`).html()

            if (o !== ("" && null && undefined)) {

                o.trim()
                o++;
                $(`#${by}.bis_num`).html(o)

                $('.bis_num').css({
                    "background": "red"
                })

                $('.bis_dot').css({
                    "background": "#2f3f4f"
                })

            } else {

                if (o == ("" || null || undefined)) {

                    $(`#${by}.bis_num`).html("1")

                    $('.bis_num').css({
                        "background": "red"
                    })

                    $('.bis_dot').css({
                        "background": "#2f3f4f"
                    })

                }

            }

        },
            50);

    }

})

function check_bis_msg() {

    var A = window.localStorage.getItem("user_Id")

    var B = window.localStorage.getItem("pre_disp")

    var C = window.localStorage.getItem("receiver")

    var v = $(".paste9").html()

    if (v == "") {
        $(".paste9").load("BisMsg.html")
    }

    setTimeout(function() {

        var k = $(`.paste9 > #${A}_${C}_${B}.message`)

        if ((A && B) !== ("" && null && undefined)) {

            if (k.length > 0) {

                $(".chat_ody").append(k)
                $(".chat_ody").append("<div id='bis_scroll'></div>")
                var l = $(".chat_ody").html()
                c2.push(l)

                document.getElementById("bis_scroll").scrollIntoView()

            } else {

                var g = c2[0];

                if (g !== "") {

                    $("#bis_scroll").remove()

                    $(".chat_ody").html(g)

                    $(".chat_ody").append("<div id='bis_scroll'></div>")

                    document.getElementById("bis_scroll").scrollIntoView()

                    $(".bis_img_cont").css({
                        "max-width": "70vw", "height": "60vw", "min-width": "60vw"
                    })

                    $(".bis_msg_cont").css({
                        "padding": "1.5vw"
                    })

                    $(".play_pac2").css({
                        "width": "42%"
                    })

                    document.getElementById("bis_scroll").scrollIntoView()

                }

            }

        }

    },
        300);

}

$(document).ready(function() {

    $(".income").click(function() {

        var A = window.localStorage.getItem("trio")

        if (A !== "income") {

            if (A == "bis") {

                $(`.${A}_disp`).slideToggle(1)
                $(".bid_pad").css({
                    "display": "block"
                })

                $(`.${A}s`).css({
                    "border-bottom": "none"
                })

            }

            if (A == "expend") {

                $(".ads_disp").css({
                    "display": "none"
                })
                $(".bid_pad").css({
                    "display": "block"
                })

                $(`.${A}`).css({
                    "border-bottom": "none"
                })

            }

            $(`.income`).css({
                "border-bottom": "#ccc 0.25em solid"
            })

            window.localStorage.setItem("trio", "income")

        }

    })

    $(".biss").click(function() {

        var A = window.localStorage.getItem("trio")

        if (A !== "bis") {

            if (A == "income") {
                $(".bid_pad").slideToggle(1)
            }
            if (A == "expend") {
                $(".ads_disp").css({
                    "display": "none"
                })
            }
            $(`.bis_disp`).slideToggle(1)

            $(`.${A}`).css({
                "border-bottom": "none"
            })

            $(`.biss`).css({
                "border-bottom": "#ccc 0.25em solid"
            })

            window.localStorage.setItem("trio", "bis")

        }

    })

    $(".expend").click(function() {

        var A = window.localStorage.getItem("trio")

        if (A !== "expend") {

            if (A == "income") {
                $(".bid_pad").slideToggle(1)
                $(`.${A}`).css({
                    "border-bottom": "none"
                })
            }
            if (A == "bis") {
                $(`.${A}_disp`).slideToggle(1)
                $(`.${A}s`).css({
                    "border-bottom": "none"
                })
            }

            $(`.expend`).css({
                "border-bottom": "#ccc 0.25em solid"
            })

            $(".ads_disp").css({
                "display": "block"
            })

            window.localStorage.setItem("trio", "expend")

        }

    })

})

function bid_check() {

    var A = window.localStorage.getItem("user_Id")

    var B = $('.paste10').html()

    if (B == "") {
        $(".paste10").load(`BisFred.html #${A}_bis.friendy`)

        setTimeout(function() {

            B = $(".paste10").html()
            $(".bid_pad").html(B)

            $(".poll2").click(function() {

                $(function() {
                    $(".sett").dialog({
                        modal: true,
                        hide: {
                            effect: "blind",
                            duration: 100,
                        },
                        show: {
                            effect: "blind",
                            duration: 100,
                        }
                    })
                })

                $(".sett").css({
                    "background": "black"
                })

                $(".edy_clus").click(function() {

                    $(".ui-icon-closethick").click()
                    $(".Bview").html("<div id='bis_scroll'></div>")
                    $(".title_bar2").remove()

                    $(".bis_msgi_mine").css({
                        "max-width": "70%"
                    })

                    $(".bis_img_cont").css({
                        "max-width": "70vw", "height": "60vw", "min-width": "60vw"
                    })

                    $(".bis_msg_cont").css({
                        "padding": "1.5vw"
                    })

                    $(".play_pac2").css({
                        "width": "42%"
                    })

                })

                bolly()

            })

        }, 400);

    } else {

        if (B !== "") {

            $(".bid_pad").html(B)

            $(".poll2").click(function() {

                $(function() {
                    $(".sett").dialog({
                        modal: true,
                        hide: {
                            effect: "blind",
                            duration: 100,
                        },
                        show: {
                            effect: "blind",
                            duration: 100,
                        }
                    })
                })

                $(".sett").css({
                    "background": "black"
                })

                $(".edy_clus").click(function() {

                    $(".ui-icon-closethick").click()
                    $(".Bview").html("<div id='bis_scroll'></div>")
                    $(".title_bar2").remove()

                    $(".bis_msgi_mine").css({
                        "max-width": "70%"
                    })

                    $(".bis_img_cont").css({
                        "max-width": "70vw", "height": "60vw", "min-width": "60vw"
                    })

                    $(".bis_msg_cont").css({
                        "padding": "1.5vw"
                    })

                    $(".play_pac2").css({
                        "width": "42%"
                    })

                })

                bolly()

            })

        }

    }

}

bid_check()

function bis_start2() {

    var A = window.localStorage.getItem("msg_disp")

    var B = window.localStorage.getItem("receiver")

    if ((A && B) !== "") {

        window.localStorage.setItem("pre_disp", A)

        bis_start()
        $(`#${B}.bis_num`).remove()

    }

}

$(document).ready(function() {

    $("#frd_send").click(function() {

        var A = $("#frd_msg").html()

        var B = window.localStorage.getItem("user_Id")

        var C = window.localStorage.getItem("chat_id")

        $(`.paste16`).load(`FrdMsg.html #${B}_${C}.message`)

        setTimeout(function() {

            var y = $(`.paste16`).html()

            if (y == "") {

                if ((A && B && C) !== ("" && null && undefined)) {

                    var D = `<div id='${B}_${C}' class='message'> <div class='frd_msg_mine'>${A}</div> </div>`

                    var E = `<div id='${C}_${B}' class='message'> <div class='frd_msg_yours'>${A}</div> </div>`

                    socket.emit("frd_new", {
                        by: B, to: C, msg1: D, msg2: E, New: "yes", snip: A
                    })

                    $(".msg_bod").append(D)
                    document.getElementById("frd_scroll").remove()

                    $(".msg_bod").append("<div id='frd_scroll'></div>")

                    $("#frd_msg").html("")
                    var u = $(".msg_bod").html()
                    c = []
                    c.push(u)

                    document.getElementById("frd_scroll").scrollIntoView()

                    document.getElementById("not_sund").play()

                    $(".paste11").load("Inform.html")

                    setTimeout(function() {

                        var x = $(`#${C}.info > .phone`).html()
                        var rili = x.trim()

                        var z = $(`.paste11 > #${rili}.friend`).html()

                        var zs = `<div id='${B}' class='friend'>${z}</div>`

                        $("chat_disp").html(zs)

                        socket.emit("frd_addy", zs)

                    },
                        400);

                    window.localStorage.setItem("Frd_add",
                        "yes")

                }

            } else {

                if (y !== "") {

                    if ((A && B && C) !== ("" && null && undefined)) {

                        var D = `<div id='${B}_${C}' class='message'> <div class='frd_msg_mine'>${A}</div> </div>`

                        var E = `<div id='${C}_${B}' class='message'> <div class='frd_msg_yours'>${A}</div> </div>`

                        socket.emit("frd_new", {
                            by: B, to: C, msg1: D, msg2: E, New: "no", snip: A
                        })

                        $(".msg_bod").append(D)
                        document.getElementById("frd_scroll").remove()

                        $(".msg_bod").append("<div id='frd_scroll'></div>")

                        $("#frd_msg").html("")
                        var u = $(".msg_bod").html()
                        c = []
                        c.push(u)

                        document.getElementById("frd_scroll").scrollIntoView()

                        document.getElementById("not_sund").play()

                    }

                }

            }

        },
            500);

        setTimeout(function() {
            send_hidy()
        },
            500);

    })

})

socket.on(`${Idy}_frd_new`, ({
    msg,
    by,
    snip
}) => {

    if ((msg && by) !== ("" && null && undefined)) {

        $(".paste11").load("Inform.html")

        setTimeout(function() {

            var A = $(`#${by}.info > .phone`).html()
            A.trim()

            var B = $(`.paste11 > #${A}.friend`)

            $(".chat_disp").append(B)
            var o = $(`#${by}.msg_num`).html()

            if (o !== "") {
                o.trim()
                o++;
                $(`#${by}.recent`).html(snip + `<button id='${by}' class='msg_num'><b>${o}</b></button>`)

                $(".msg_num").css({
                    "background": "red"
                })

                $(".chat_dot").css({
                    "background": "#282828"
                })

            } else {

                if (o == "") {

                    $(`#${by}.recent`).html(snip + `<button id='${by}' class='msg_num'><b>1</b></button>`)

                    $(".msg_num").css({
                        "background": "red"
                    })

                    $(".chat_dot").css({
                        "background": "#282828"
                    })

                }

            }

            socket.emit("frd_addy", B)

        },
            400);

        $(".msg_bod").append(msg)
        document.getElementById("frd_scroll").remove()
        $(".msg_bod").append("<div id='frd_scroll'></div>")
        var u = $(".msg_bod").html()
        c = []
        c.push(u)

        document.getElementById("frd_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

    }

})

socket.on(`${Idy}_frd_reced`, ({
    msg,
    by,
    snip
}) => {

    if ((msg && by) !== ("" && null && undefined)) {

        $(".msg_bod").append(msg)
        var o = $(`#${by}.msg_num`).html()

        if (o !== "") {
            o.trim()
            o++;
            $(`#${by}.recent`).html(snip + `<button id='${by}' class='msg_num'><b>${o}</b></button>`)

            $(".msg_num").css({
                "background": "red"
            })

            $(".chat_dot").css({
                "background": "#282828"
            })

        } else {

            if (o == "") {

                $(`#${by}.recent`).html(snip + `<button id='${by}' class='msg_num'><b>1</b></button>`)

                $(".msg_num").css({
                    "background": "red"
                })

                $(".chat_dot").css({
                    "background": "#282828"
                })

            }

        }

        document.getElementById("frd_scroll").remove()
        $(".msg_bod").append("<div id='frd_scroll'></div>")

        var u = $(".msg_bod").html()
        c = []
        c.push(u)

        document.getElementById("frd_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

    }

})

function check_frd() {

    var A = window.localStorage.getItem("user_Id")

    var B = $(`.paste13 > #${A}.friend`)

    $(".chat_disp").append(B)

}

function check_frd_msg(meg) {

    var data = window.localStorage.getItem("user_Id")

    if (data !== "") {

        var A = window.localStorage.getItem("chat_id")

        var B = $(`.paste12 > #${data}_${A}.message`)

        if (B.length > 0) {

            $(".msg_bod").append(B)
            var u = $(".msg_bod").html()
            $(".msg_bod").append("<div id='frd_scroll'></div>")
            c = []
            c.push(u)

            document.getElementById("frd_scroll").scrollIntoView()

            $(".play_pac2").css({
                "width": "42%"
            })

        } else {

            var g = c[0]

            if (g !== "") {

                $(".msg_bod").html(g)

                $(".msg_bod").append("<div id='frd_scroll'></div>")

                document.getElementById("frd_scroll").scrollIntoView()

                $(".play_pac2").css({
                    "width": "42%"
                })

            }

        }

    }

}

$(document).ready(function() {

    $("#frd_vn_rec").click(function() {

        $("#frd_vn_stop").slideToggle(1)
        $("#frd_vn_rec").slideToggle(1)

        var constraint = {
            audio: true, video: false
        }

        const handleSuccess = function(stream) {

            var audioContext = new AudioContext()
            audioStream = stream;
            const input = audioContext.createMediaStreamSource(stream)
            rec = new Recorder(input, {
                numChannels: 1
            })
            rec.record()

            window.localStorage.setItem("recording", "yes")

        }

        navigator.mediaDevices.getUserMedia(constraint).then(handleSuccess)

    })

    $("#bis_vn_rec").click(function() {

        $("#bis_vn_rec").slideToggle(1)
        $("#bis_vn_stop").slideToggle(1)

        var constraint = {
            audio: true, video: false
        }

        const handleSuccess = function(stream) {

            var audioContext = new AudioContext()
            audioStream = stream;
            const input = audioContext.createMediaStreamSource(stream)
            rec = new Recorder(input, {
                numChannels: 1
            })
            rec.record()

            window.localStorage.setItem("recording2", "yes")

        }

        navigator.mediaDevices.getUserMedia(constraint).then(handleSuccess)

    })

    $("#frd_vn_stop").click(function() {

        rec.stop();
        audioStream.getAudioTracks()[0].stop();
        rec.exportWAV(uploadSoundData);

        $("#frd_vn_rec").slideToggle(1)
        $("#frd_vn_stop").slideToggle(1)

        window.localStorage.setItem("recording", "no")

    })

    $("#bis_vn_stop").click(function() {

        rec.stop();
        audioStream.getAudioTracks()[0].stop();
        rec.exportWAV(uploadSoundData2);

        $("#bis_vn_rec").slideToggle(1)
        $("#bis_vn_stop").slideToggle(1)

        window.localStorage.setItem("recording2", "no")

    })

})

function uploadSoundData(blob) {

    let ID = []
    for (I = 0; I < 5; I++) {
        var b = Math.floor(Math.random() * 5)
        ID.push(b)
    }

    var id = `${ID[0]}` + `${ID[1]}` + `${ID[2]}` + `${ID[3]}` + `${ID[4]}`

    var name = "flashwave_vn_rec" + new Date().getTime() + ".wav"

    var form = $("#rec1")[0]

    var formData = new FormData(form)

    var A = window.localStorage.getItem("user_Id")
    var B = window.localStorage.getItem("chat_id")

    var y = $(`.paste12 > #${A}_${B}.message`).html()

    if (y !== ("" && null && undefined)) {

        formData.append("fileName", name)
        formData.append("rec", blob)
        formData.append("by", A)
        formData.append("to", B)
        formData.append("audId", id)

        $.ajax({
            type: "post",
            enctype: "multipart/form-data",
            url: "http://127.0.0.1:8000/frd_vn",
            data: formData,
            processData: false,
            contentType: false,
            success: function(mata) {
                console.log(mata)
            },
        })

        socket.emit("vn_send", A)
        socket.emit("vn_reced", {
            by: A, to: B
        })

    } else {

        if (y == ("" || null || undefined)) {

            $(".paste14").load("Inform.html")

            setTimeout(function() {

                var t = $(`.paste14 > #${B}.info`).html()

                $(".paste15").html(t)

                var u = $(".paste15 > .phone").html()
                u.trim();

                var v = $(`.paste14 > #${u}.friend`).html()

                var w = `<div id='${A}' class='friend'>${v}</div>`

                $(".chat_disp").append(w)

                formData.append("fileName",
                    name)
                formData.append("rec",
                    blob)
                formData.append("by",
                    A)
                formData.append("to",
                    B)
                formData.append("New",
                    w)
                formData.append("audId",
                    id)

                $.ajax({
                    type: "post",
                    enctype: "multipart/form-data",
                    url: "http://127.0.0.1:8000/frd_vn",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(mata) {
                        console.log(mata)
                    },
                })

                socket.emit("vn_send",
                    A)
                socket.emit("vn_reced",
                    {
                        by: A,
                        to: B
                    })

            }, 400);

        }

    }

}

function uploadSoundData2(blob) {

    let ID = []
    for (I = 0; I < 5; I++) {
        var b = Math.floor(Math.random() * 5)
        ID.push(b)
    }

    var id = `${ID[0]}` + `${ID[1]}` + `${ID[2]}` + `${ID[3]}` + `${ID[4]}`

    var name = "flashwave_vn_rec" + new Date().getTime() + ".wav"

    var form = $("#rec2")[0]

    var formData = new FormData(form)

    var A = window.localStorage.getItem("pre_disp")
    var B = window.localStorage.getItem("receiver")
    var C = window.localStorage.getItem("user_Id")

    var y = $(`.paste9 > #${B}_${A}.message`).html()

    if (y !== ("" && null && undefined)) {

        formData.append("rec", blob)
        formData.append("receiver", B)
        formData.append("pre_disp", A)
        formData.append("nam", name)
        formData.append("audId", id)
        formData.append("user_Id", C)

        $.ajax({
            type: "post",
            enctype: "multipart/form-data",
            url: "http://127.0.0.1:8000/bis_vn",
            data: formData,
            processData: false,
            contentType: false,
            success: function(mata) {
                console.log(mata)
            },
        })

        socket.emit("vn_send2", C)
        socket.emit("vn_reced2", {
            by: C, to: B
        })

    } else {

        if (y == ("" || null || undefined)) {

            $(".paste17").load("Bissy.html")

            setTimeout(function() {

                var t = $(`.paste17 > #${B}.bis_profile`).html()

                $(".paste18").html(t)

                var u = $(".paste18 > .bis_nam").html()
                var v = $(".paste18 > bis_own").html()
                var w = $(".paste18 > prof_img").attr("src")

                u.trim()
                v.trim()

                var uvw = `<div id='${C}_bis' class='friendy'> <div class='icod'> <button class='imgi'> <img class='bimg' src='${w}' /> </button> </div> <div class='namy' onclick='window.localStorage.setItem("msg_disp", "${A}"), window.localStorage.setItem("receiver", "${B}"), bis_start2()'>${u} <div class='owny'>${v} <button id='${B}' class='bis_num'></button> </div> </div> <div class='poll2' onclick='window.localStorage.setItem("msg_disp", "${A}"), window.localStorage.setItem("receiver", "${B}")'></div> </div>`

                $(".bid_pad").append(uvw)

                formData.append("rec",
                    blob)
                formData.append("receiver",
                    B)
                formData.append("pre_disp",
                    A)
                formData.append("nam",
                    name)
                formData.append("audId",
                    id)
                formData.append("user_Id",
                    C)
                formData.append("New",
                    uvw)

                $.ajax({
                    type: "post",
                    enctype: "multipart/form-data",
                    url: "http://127.0.0.1:8000/bis_vn",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(mata) {
                        console.log(mata)
                    },
                })

                socket.emit("vn_send2",
                    C)
                socket.emit("vn_reced2",
                    {
                        by: C,
                        to: B
                    })

            }, 400);

        }

    }

}

var audPac = ""

function aud_play() {

    var A = window.localStorage.getItem("audId")

    if (A !== ("" && null && undefined)) {

        $(`#aud${A}.aud_play`).slideToggle(1)
        $(`#aud${A}.aud_pus`).slideToggle(1)

        if (audPac == "") {
            audPac = A;
        } else {
            if (audPac !== "") {
                document.getElementById(audPac).pause()
                $(`#aud${audPac}.aud_play`).slideToggle(1)
                $(`#aud${audPac}.aud_pus`).slideToggle(1)
            }
        }

        document.getElementById(A).play()

        var cur = $(`#${A}`)[0]
        var curt = 0;

        x = "aud" + A;

        var timeline = document.getElementById(x)

        function changeTimeUpdate() {

            var perChange = (100 * curt) / cur.duration;
            timeline.style.backgroundSize = `${perChange}% 100%`
            timeline.style.value = perChange

            curt = cur.currentTime

        }

        function handleInputChange(e) {

            let target = e.target;

            const min = target.min
            const max = target.max
            const val = target.value

            target.style.backgroundSize = (val * 100) / max + "% 100%"

            var time = (val / 100) * cur.duration
            cur.currentTime = time

        }

        cur.ontimeupdate = changeTimeUpdate

        timeline.addEventListener("input", handleInputChange)

    }

}

function audEnd() {

    var A = window.localStorage.getItem("audId")

    if (A !== ("" && null && undefined)) {

        $(`#aud${A}.aud_play`).slideToggle(1)
        $(`#aud${A}.aud_pus`).slideToggle(1)
        audPac = ""

    }

}

function aud_pus() {

    var A = window.localStorage.getItem("audId")

    if (A !== ("" && null && undefined)) {

        document.getElementById(A).pause()

        $(`#aud${A}.aud_play`).slideToggle(1)
        $(`#aud${A}.aud_pus`).slideToggle(1)

    }

}

socket.on(`${Idy}_vn_send`, (data) => {

    if (data !== ("" && null && undefined)) {

        $(".msg_bod").append(data)
        document.getElementById("frd_scroll").remove()

        $(".msg_bod").append("<div id='frd_scroll'></div>")

        var b = $(".msg_bod").html()
        c = []
        c.push(b)

        document.getElementById("frd_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

    }

})

socket.on(`${Idy}_vn_send2`, (data) => {

    if (data !== ("" && null && undefined)) {

        $(".chat_ody").append(data)
        document.getElementById("bis_scroll").remove()

        $(".chat_ody").append("<div id='bis_scroll'></div>")
        var b = $(".chat_ody").html()
        c2 = []
        c2.push(b)

        document.getElementById("bis_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

    }

})

socket.on(`${Idy}_vn_reced`, ({
    cont, byi
}) => {

    if (cont !== ("" && null && undefined)) {

        $(".msg_bod").append(cont)
        document.getElementById("frd_scroll").remove()

        $(".msg_bod").append("<div id='frd_scroll'></div>")

        var b = $(".msg_bod").html()
        c = []
        c.push(b)

        document.getElementById("frd_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

        var check = $(`.chat_disp > #${byi}.friend`).html()

        if (check == ("" || null || undefined)) {

            $(".paste14").load("Inform.html")

            setTimeout(function() {

                var t = $(`.paste14 > #${by}.info`).html()

                $(".paste15").html(t)

                var u = $(".paste15 > .phone").html()
                u.trim();

                var v = $(`#${u}.friend`).html()

                var w = `<div id='${A}' class='friend'>${v}</div>`

                $(".chat_disp").append(w)

                socket.emit("frd_addy", w)

                var snip = "<i class='fa fa-microphone'></i> voice note"

                var o = $(`#${byi}.msg_num`).html()
                o.trim()

                if (o !== "") {

                    $(`#${by}.recent`).html(snip + `<button id='${byi}' class='msg_num'><b>${o}</b></button>`)

                    $(".msg_num").css({
                        "background": "red"
                    })

                    $(".chat_dot").css({
                        "background": "#282828"
                    })

                } else {

                    if (o == "") {

                        $(`#${by}.recent`).html(snip + `<button id='${byi}' class='msg_num'><b>1</b></button>`)

                        $(".msg_num").css({
                            "background": "red"
                        })

                        $(".chat_dot").css({
                            "background": "#282828"
                        })

                    }

                }

            },
                500);

        }

    }

})

socket.on(`${Idy}_vn_reced2`, ({
    cont,
    byi,
    pre_disp
}) => {

    if (cont !== ("" && null && undefined)) {

        $(".chat_ody").append(cont)
        document.getElementById("bis_scroll").remove()

        $(".chat_ody").append("<div id='bis_scroll'></div>")
        var b = $(".chat_ody").html()
        c2 = []
        c2.push(b)

        document.getElementById("bis_scroll").scrollIntoView()

        document.getElementById("not_sund").play()

        var check = $(`.bid_pad > #${byi}_bis.friendy`).html()

        if (check == ("" || null || undefined)) {

            $(".paste19").load(`Inform.html #${byi}.info`)

            setTimeout(function() {

                var y = $(`.paste19 > #${byi}.info`).html()
                $(".paste20").html(y)

                var u = $(`.paste20 > .name`).html()
                var v = $(`.paste20 > .use`).html()

                u.trim()
                v.trim()

                var w = window.localStorage.getItem("user_Id")

                var s = `<div id='${w}_bis' class='friendy'> <div class='icod'> <button class='imgi'> <i class='fa fa-user'></i> </button> </div> <div class='namy' onclick='window.localStorage.setItem("msg_disp", "${pre_disp}"), window.localStorage.setItem("receiver", "${byi}"), bis_start2()'> ${u} <div class='owny'> ${v} <button id='${byi}' class='bis_num'></button> </div> </div> <div class='poll2' onclick='window.localStorage.setItem("msg_disp", "${pre_disp}"), window.localStorage.setItem("receiver", "${byi}")'> <i class='fa fa-align-center'></i> </div> </div>`

                socket.emit("bis_friend", s)
                $(".bid_pad").append(s)

                setTimeout(function() {

                    var o = $(`#${by}.bis_num`).html()

                    if (o !== ("" && null && undefined)) {

                        o.trim()
                        o++;
                        $(`#${by}.bis_num`).html(o)

                        $('.bis_num').css({
                            "background": "red"
                        })

                        $('.bis_dot').css({
                            "background": "#2f3f4f"
                        })

                    } else {

                        if (o == ("" || null || undefined)) {

                            $(`#${by}.bis_num`).html("1")

                            $('.bis_num').css({
                                "background": "red"
                            })

                            $('.bis_dot').css({
                                "background": "#2f3f4f"
                            })

                        }

                    }

                },
                    50);

            }, 400);

        } else {

            if (check !== ("" && null && undefined)) {

                setTimeout(function() {

                    var o = $(`#${by}.bis_num`).html()

                    if (o !== ("" && null && undefined)) {

                        o.trim()
                        o++;
                        $(`#${by}.bis_num`).html(o)

                        $('.bis_num').css({
                            "background": "red"
                        })

                        $('.bis_dot').css({
                            "background": "#2f3f4f"
                        })

                    } else {

                        if (o == ("" || null || undefined)) {

                            $(`#${by}.bis_num`).html("1")

                            $('.bis_num').css({
                                "background": "red"
                            })

                            $('.bis_dot').css({
                                "background": "#2f3f4f"
                            })

                        }

                    }

                },
                    50);

            }

        }

    }

})

function Polly() {

    $(function() {
        $(".edit1").dialog({
            modal: true,
            hide: {
                effect: "blind",
                duration: 100,
            },
            show: {
                effect: "blind",
                duration: 100,
            }
        })
    })

    $(".edit1").css({
        "background": "black"
    })

    $(".edy_clus").click(function() {
        $(".ui-icon-closethick").click()
        $(".Qview").html("<div id='frd_scroll2'></div>")
        $(".title_bar").remove()
    })

    var u = window.localStorage.getItem("chat_id")
    var r = window.localStorage.getItem("user_Id")

    if (u !== ("" && null && undefined)) {

        if (r !== ("" && null && undefined)) {

            $(".paste22").load(`Inform.html #${u}.info`)

            $(`.paste24`).load(`FrdMsg.html #${r}_${u}.message`)

            setTimeout(function() {

                var v = $(`.paste22 > #${u}.info`).html()

                $('.paste23').append(v)
                var w = $(`.paste23 > .use`).html()


                if (w !== ("" && null && undefined)) {

                    w.trim()

                    var x = `<div class='title_bar'> <b> ${w} </b> </div>`

                    $(".title").append(x)

                }

                var s = $(".paste24").html()

                if (s !== ("" && null && undefined)) {

                    $("#frd_scroll2").remove()
                    $(".Qview").append(s)

                    var xz = `<div class='intro'> <div class='introd'> This chat is between you and ${w}, send a message now and he/she will be added to your friend list. <div>Messaging as never been better without flashwave <i class='fa fa-smile-o'></i> <i class='fa fa-smile-o'></i> <i class='fa fa-smile-o'></i> <i class='fa fa-smile-o'></i> </div> </div> </div> ${s}`

                    c = []
                    c.push(xz)

                    $(".Qview").append("<div id='frd_scroll2'></div>")

                    document.getElementById("frd_scroll2").scrollIntoView()

                    $(".aud_play").css({
                        "background": "white", "color": "black"
                    })

                    $(".aud_pus").css({
                        "background": "white", "color": "black"
                    })

                    $(".play_pac2").css({
                        "width": "22%"
                    })

                }

            },
                400);

        }

    }

}

function bolly() {

    var A = window.localStorage.getItem("user_Id")
    var B = window.localStorage.getItem("receiver")
    var C = window.localStorage.getItem("msg_disp")

    if ((A && B && C) !== ("" && null && undefined)) {

        $(".paste21").load(`BisMsg.html #${A}_${B}_${C}.message`)

        setTimeout(function() {

            var D = $(".paste21").html()

            if (D !== ("" && null && undefined)) {

                $("#bis_scroll2").remove()
                $(".Bview").append(D)
                $(".Bview").append("<div id='bis_scroll2'></div>")

                document.getElementById("bis_scroll2").scrollIntoView()

                var u = $(`#${B}.bis_profile > .bis_nam`).html()

                if (u !== ("" && null && undefined)) {

                    u.trim()
                    var v = `<div class='title_bar2'> <b> ${u} </b> </div>`

                    $(".title2").append(v)

                    $(".bis_img_cont").css({
                        "max-width": "60vw", "height": "50vw", "min-width": "50vw"
                    })

                    $(".bis_msg_cont").css({
                        "padding": "1vw"
                    })

                    $(".bis_msgi_mine").css({
                        "max-width": "80%"
                    })

                    $(".bis_msgi_yours").css({
                        "max-width": "70%"
                    })

                    $(".aud_play").css({
                        "background": "white", "color": "black"
                    })

                    $(".aud_pus").css({
                        "background": "white", "color": "black"
                    })

                    $(".play_pac2").css({
                        "width": "22%"
                    })

                }

            }

        },
            400);

    }

}

function madsink(rad) {

    var A = window.localStorage.getItem("user_Id")

    var B = window.localStorage.getItem("creating")

    var C = window.localStorage.getItem("bis_count")

    for (I = 0; I < C; I++) {

        if (I == 0) {

            var D = $(`#friendy.friendy`).html()
            $(".paste25").html(D)

            var E = $(".paste25 > .namy2").html()
            var F = $(".paste25").find("img").attr("src")

            if (B == "ads") {
                ads_on(E, F, rad)
            }
            if (B == "link") {
                link_on(E, F, rad)
            }
            if (B == "manager") {
                man_on(E, F, rad)
            }

        }

        if (I > 0) {

            var D = $(`#friendy${I}.friendy`).html()
            $(".paste25").html(D)

            var E = $(".paste25 > .namy2").html()
            var F = $(".paste25").find("img").attr("src")

            if (B == "ads") {
                ads_on(E, F, rad)
            }
            if (B == "link") {
                link_on(E, F, rad)
            }
            if (B == "manager") {
                man_on(E, F, rad)
            }

        }

    }

}

function ads_on(req, res, data) {

    var A = `<div class='ads_cont'> <div class='ads_img_cont'> <img class='ads_img' src='${res}' onclick='ads_img_change()'/> </div> <div class='ads_nam_cont'> <div style='padding:1vw; border: #ccc 0.025em solid; border-radius: 1vw; height:7vw; font-size: 3.5vw; padding-top: 3vw; padding-left: 2vw' contentEditable='true'>${req}</div> <div class='ads_desc' contentEditable='true' data-ph='Write a description'></div> <div class='desc_info'>*Description helps people to know more about your business</div> </div> <div class='ads_btn'> <button class='ads_don'>Create</button> <button class='ads_can'>Cancel</button> </div> </div>`

    var B = window.localStorage.getItem("user_Id")

    $(".paste26").html(A)

    $(function() {
        $(".ads_cont").dialog({
            modal: true,
            hide: {
                effect: "blind",
                duration: 100,
            },
            show: {
                effect: "blind",
                duration: 100,
            }
        })
    })

    $(`.${data}`).blur()

    $('.ads_cont').css({
        "background": "#282828", "padding": "0.5vw", "height": "50vw", "margin": "0", "border-radius": "3vw"
    })

    $(".ads_can").click(function() {
        $(".ui-icon-closethick").click()
    })

    $(".ads_don").click(function() {

        var k = $(".ads_desc").html()

        if (k !== "") {

            var x = window.localStorage.getItem("ads_change")

            if (x !== "") {

                var l = `<div id='${B}_ads' class='ads'> <img class='ads_img' src='${x}' /> <div class='ads_com'> <div style='text-align:center; font-size:3.5vw'> <b>${req}</b> </div> ${k}</div> <div style='padding: 1vw; font-size: 3vw; font-family: Georgia; font-style: oblique; color: white; text-align: center'> This is how your ads will look like, confirm now to complete setup </div> <button class='ads_comfy'>Confirm</button> </div>`

                $(".paste26").html(l)

                $(".ui-icon-closethick").click()
                $(function() {
                    $(`#${B}_ads`).dialog({
                        modal: true,
                        hide: {
                            effect: "blind",
                            duration: 100,
                        },
                        show: {
                            effect: "blind",
                            duration: 100,
                        }
                    })
                })

                $(".ads").css({
                    "background": "#282828", "padding": "0.5vw", "border-radius": "3vw", "height": "40vw", "width": "40vw"
                })

            } else {

                if (x == "") {

                    var l = `<div id='${B}_ads' class='ads'> <img class='ads_img' src='${res}' /> <div class='ads_com'> <div style='text-align:center; font-size:3.5vw'> <b>${req}</b> </div> ${k}</div> <div style='padding: 1vw; font-size: 3vw; font-family: Georgia; font-style: oblique; color: white; text-align: center'> This is how your ads will look like, confirm now to complete setup </div> <button class='ads_comfy'>Confirm</button> </div>`

                    $(".paste26").html(l)

                    $(".ui-icon-closethick").click()
                    $(function() {
                        $(`#${B}_ads`).dialog({
                            modal: true,
                            hide: {
                                effect: "blind",
                                duration: 100,
                            },
                            show: {
                                effect: "blind",
                                duration: 100,
                            }
                        })
                    })

                    $(".ads").css({
                        "background": "#282828", "padding": "0.5vw", "border-radius": "3vw", "height": "40vw", "width": "40vw"
                    })

                }

            }

            $(".ads_comfy").click(function() {

                window.localStorage.setItem("ads_create", "yes")

                var q = window.localStorage.getItem("cards")
                if (q == "") {
                    window.localStorage.setItem("cards", 0)
                    q = 0
                }

                if (x !== "") {

                    var n = `<div id='${B}_${q}' class='ads'> <img class='ads_img' src='${x}' /> <div class='ads_com'> <div style='text-align:center; font-size:3.5vw'> <b>${req}</b> </div> ${k} </div> <div style='display:flex; border-top: #ccc 0.025em solid'> <button class='ads_del' onclick='window.localStorage.setItem("ads_del", "${B}_${q}"), ads_del()'> <i class='fa fa-trash'></i> Delete </button> <button class='ads_share' onclick='window.localStorage.setItem("ads_share", "${B}_${q}"), ads_share()'> <i class='fa fa-share'></i> Share </button> </div> </div>`

                    socket.emit("ads_create", n)
                    $(".ui-icon-closethick").click()
                    $(".ads_bod").append(n)
                    $(".hed_bar").slideToggle(1)
                    $(".cont").slideToggle(1)
                    $(".ads_ground").slideToggle(1)

                    Ads_sum()

                    window.localStorage.setItem("ads_change", "")
                    q++

                    window.localStorage.setItem("cards", q)

                } else {

                    if (x == "") {

                        var n = `<div id='${B}${q}' class='ads'> <img class='ads_img' src='${res}' /> <div class='ads_com'> <div style='text-align:center; font-size:3.5vw'> <b>${req}</b> </div> ${k} </div> <div style='display:flex; border-top: #ccc 0.025em solid'> <button class='ads_del'> <i class='fa fa-trash'></i> Delete </button> <button class='ads_share'> <i class='fa fa-share'></i> Share </button> </div> </div>`

                        socket.emit("ads_create", n)
                        $(".ui-icon-closethick").click()
                        $(".ads_bod").append(n)
                        $(".hed_bar").slideToggle(1)
                        $(".cont").slideToggle(1)
                        $(".ads_ground").slideToggle(1)

                        Ads_sum()
                        q++

                        window.localStorage.setItem("cards", q)

                    }

                }

            })

        } else {
            if (k == "") {
                $(".ads_desc").focus()
            }
        }

    })

}

function Ads_sum() {

    setTimeout(function() {
        $(".paste5").load("Bissy.html")
    },
        400);

}

function ads_img_change() {

    $("#ads_img_input").click()

}

var share_hod = []

function ads_share() {

    var A = window.localStorage.getItem("user_Id")

    var B = window.localStorage.getItem("ads_share")

    if ((A && B) !== "") {

        var c = $(`#${B}.ads > .ads_img`)
        var d = $(`#${B}.ads > .ads_com`)

        var e = $(".chat_disp").html()
        var Ed = $(".bid_pad").html()

        if (e !== "") {

            $(".paste27").html(`<div class='title3'> <button class="closy3"> <i class="fa fa-arrow-left"></i> </button> Send card to </div> <div style='overflow: auto; height: 80%; padding: 2vw'> ${Ed} ${e} </div> <div style='padding: 2vw'> <button class='now_share' disabled> <i class='fa fa-send'></i> SEND </button> </div>`)

            $(".paste27").css({
                "background": "#ABABAB"
            })

            $(".ads_ground").slideToggle(1)
            $(".paste27").slideToggle(1)

            $(".namy").click(function() {

                var f = window.localStorage.getItem("receiver")

                if (f !== A) {
                    share_hod.push(f)

                    console.log("push")
                }

            })

            $(".closy3").click(function() {

                $(".ads_ground").slideToggle(1)
                $(".paste27").slideToggle(1)

                share_hod = []
            })

        }

    }

}