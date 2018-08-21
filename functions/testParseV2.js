var json = '{"messages":[{ "id": "false_59899056676-1383596674@g.us_F473D0865998F35FB0946199720EAEA4","body": "JOURNEYON", "fromMe": false, "author": "59898050704@c.us"}]}';

var json2 = '{"messages":[{ "id": "false_59899056676-1383596674@g.us_F473D0865998F35FB0946199720EAEA4","body": "love", "fromMe": false, "author": "59898050704@c.us"}]}';

var json3 = '{"messages":[{ "id": "false_59899056676-1383596674@g.us_F473D0865998F35FB0946199720EAEA4","body": "stop", "fromMe": false, "author": "59898050704@c.us"}]}';


const obj = JSON.parse(json2);
const msj = obj.messages[0].body;

console.log(msj);

function beginning(msj){
    if  (msj == "JOURNEYON") {
        console.log("the experience will start now");
    }
    else if (msj == "STOP" || msj == "stop"){
        console.log("end of the experience");
    }
    else{
        console.log("hi");
        }
    }