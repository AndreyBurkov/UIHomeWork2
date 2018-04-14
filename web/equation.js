
var a;
var b;
var c;
var d;
var x1;
var x2;

function calculate(id1, id2, id3) {
    a = document.getElementById(id1).value;
    b = document.getElementById(id2).value;
    c = document.getElementById(id3).value;
    if (a == '0') a = 0;
    if (b == '0') b = 0;
    if (c == '0') c = 0;
    if(!isNumeric(a)) {
        alert('Коэффициент \'a\' должен быть числом');
        return;
    }
    if(!isNumeric(b)) {
        alert('Коэффициент \'b\' должен быть числом');
        return;
    }
    if(!isNumeric(c)) {
        alert('Коэффициент \'c\' должен быть числом');
        return;
    }
    sendToServer();
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function addRow(id) {
    var tbody = document.getElementById(id).getElementsByTagName("tbody")[0];
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(a));
    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(b));
    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(c));
    var td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(x1));
    var td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(x2));
    var td6 = document.createElement("td");
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "delete");
    btn.setAttribute("onclick", "deleteRow(this)");
    td6.appendChild(btn);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    tbody.appendChild(row);
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
}

/*
   Возвращает новый XMLHttpRequest объект или false, если браузер его не поддерживает
 */
function newXMLHttpRequest() {
    var xmlreq = false;
    if (window.XMLHttpRequest) {
        xmlreq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            try {
                xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                alert("Cann't to create XMLHttpRequest!");
            }
        }
    }
    return xmlreq;
}

function sendToServer() {
    var req = newXMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200)
        {
            var obj = JSON.parse(this.responseText);
            var element = document.getElementById('myresult');
            if (obj.message != "OK") {
                element.innerHTML = obj.message;
                return;
            }
            x1 = obj.x1;
            x2 = obj.x2;
            if (x1 == x2) {
                element.innerHTML = 'x = ' + x1;
            } else {
                element.innerHTML = 'x1 = ' + x1 + ';   x2 = ' + x2;
            }
            addRow("myTable");
        }
    };

    req.open("get", "/serv?a=" + a + "&b=" + b + "&c=" + c, false);

    req.send();
}
