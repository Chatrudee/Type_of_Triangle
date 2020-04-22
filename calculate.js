function calculate() {
    var x = document.getElementById("wtype")
    var tmp = []
    var i, a, b, c, m="", n="", o="", p=""
    var br
    for (i = 0; i < x.length; i++) {
        tmp.push(Number(x.elements[i].value))
    }
    tmp.sort(function(aa,bb){return aa-bb})
    console.log(tmp)

    for (i = 0; i < 3; i++) {
        if ((Number(tmp[i])*1000)%10 == 5){
            tmp[i]+=0.001
        }
    }

    a = Number(Number(tmp[0]).toFixed(2))
    b = Number(Number(tmp[1]).toFixed(2))
    c = Number(Number(tmp[2]).toFixed(2))

    //String number in canvas
    n = String(a)
    for (i=0;i<n.length;i++){
        m+=n[i]
        if(i % 6==0 && i != 0){
            m += "\n"
        }
    }

    n = ""
    o = String(b)
    for (i=0;i<o.length;i++){
        n+=o[i]
        if(i % 6==0 && i != 0){
            n += "\n"
        }
    }

    o = ""
    p = String(c)
    for (i=0;i<p.length;i++){
        o+=p[i]
        if(i % 6==0 && i != 0){
            o += "\n"
        }
    }

    var line1=m.split("\n"), line2=n.split("\n"), line3=o.split("\n")
    // draw canvas
    var t = document.getElementById("trian")
    var tri = t.getContext("2d")

    tri.beginPath()
    tri.rect(0,0,300,300)
    tri.fillStyle="white"
    tri.fill()

    // INPUT CHECK
    inputCheck(tri,a,b,c,line1,line2,line3)

}

function inputCheck(tri,a,b,c,l1,l2,l3) {

    // input ไม่เป็นตัวเลข
    /*if (a%1 != 0 || b%1 != 0 || c%1 != 0){
        alert(str(a) +' '+ str(b) +' '+ str(c))
        document.getElementById("cal").innerHTML = "ERROR!!"
    }

    // ใส่ค่า 0 หรือไม่ใส่ค่า
    else */if (a == 0 || b == 0 || c == 0 || a == null || b == null || c == null) {
        alert("Values shouldn't be 0 or Null")
        document.getElementById("cal").innerHTML = "ERROR!!"
    }
    // มากกว่า 16 ตัวอักษร
    // มากกว่า 4 bytes
    else if (a > 2147483647 || b > 2147483647 || c > 2147483647){
        alert("Values more than 4 bytes")
        document.getElementById("cal").innerHTML = "ERROR!!"
    }
    // ด้านที่ยาวที่สุดยาวเกินอีกสองด้านบวกกัน
    else if (a + b <= c || b + c <= a || a + c <= b) {
        alert("Wrong Values")
        document.getElementById("cal").innerHTML = "ERROR!!"
    }
    // 3 ด้านเท่ากัน
    else if (a === b && b === c) {
        document.getElementById("cal").innerHTML = "Equilateral triangle"
        equi(tri,l1,l2,l3)
    }
    // เท่ากัน 2 ด้าน
    else if (a === b || b === c) {
        document.getElementById("cal").innerHTML = "Isosceles triangle"
        if (a == b) iso(tri,l1,l2,l3)
        else iso(tri,l2,l3,l1)
    }
    // พีทาโกรัส
    else if ((parseFloat(a*a, 4)+ parseFloat(b*b, 4)).toFixed(4) == parseFloat(c*c, 4).toFixed(4)) {
        console.log(a,b,c,(a*a + b*b).toFixed(4), c*c)
        document.getElementById("cal").innerHTML = "Right triangle"
        right(tri,l1,l2,l3)
    }
    else {
        console.log(a,b,c,(a*a + b*b).toFixed(4), c*c)
        document.getElementById("cal").innerHTML = "Scalene triangle"
        scale(tri,l1,l2,l3)
    }
}

function equi(tri,a,b,c) {

    tri.beginPath()
    tri.moveTo(9, 200)
    tri.lineTo(150, 0)
    tri.lineTo(292, 200)
    tri.lineTo(9, 200)
    tri.stroke()
    // limit 6
    tri.font = "20px cordiaUPC"
    tri.textAlign = "left"
    for (var i = 0; i<a.length; i++) tri.strokeText(a[i], 5, 100 + (i*20) );
    tri.textAlign = "right"
    for (var i = 0; i<b.length; i++) tri.strokeText(b[i], 295, 100 + (i*20) );
    tri.textAlign = "center"
    for (var i = 0; i<c.length; i++) tri.strokeText(c[i], 150, 250 + (i*20) );
}

function iso(tri,a,b,c) {

    tri.beginPath()
    tri.moveTo(50, 200)
    tri.lineTo(150, 0)
    tri.lineTo(250, 200)
    tri.lineTo(50, 200)
    tri.stroke()
    // limit 9
    tri.font = "20px cordiaUPC"
    tri.textAlign = "left"
    for (var i = 0; i<a.length; i++) tri.strokeText(a[i], 5, 100 + (i*20) );
    tri.textAlign = "right"
    for (var i = 0; i<b.length; i++) tri.strokeText(b[i], 295, 100 + (i*20) );
    tri.textAlign = "center"
    for (var i = 0; i<c.length; i++) tri.strokeText(c[i], 150, 250 + (i*20) );
}

function right(tri,a,b,c) {

    tri.beginPath()
    tri.moveTo(100, 0)
    tri.lineTo(300, 150)
    tri.lineTo(100, 150)
    tri.lineTo(100, 0)
    tri.stroke()
    // limit 9
    tri.font = "20px cordiaUPC"
    tri.textAlign = "left"
    for (var i = 0; i<a.length; i++) tri.strokeText(a[i], 5, 80 + (i*20) );
    tri.textAlign = "center"
    for (var i = 0; i<b.length; i++) tri.strokeText(b[i], 150, 220 + (i*20) );
    tri.textAlign = "right"
    for (var i = 0; i<c.length; i++) tri.strokeText(c[i], 295, 60 + (i*20) );
}

function scale(tri,a,b,c) {

    tri.beginPath()
    tri.moveTo(80, 150)
    tri.lineTo(130, 50)
    tri.lineTo(280, 150)
    tri.lineTo(80, 150)
    tri.stroke()
    // limit 8
    tri.font = "20px cordiaUPC"
    tri.textAlign = "left"
    for (var i = 0; i<a.length; i++) tri.strokeText(a[i], 5, 100 + (i*20) );
    tri.textAlign = "right"
    for (var i = 0; i<b.length; i++) tri.strokeText(b[i], 295, 100 + (i*20) );
    tri.textAlign = "center"
    for (var i = 0; i<c.length; i++) tri.strokeText(c[i], 150, 220 + (i*20) );
}