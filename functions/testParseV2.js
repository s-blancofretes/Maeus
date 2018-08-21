var json = '{"messages":[{ "id": "false_59899056676-1383596674@g.us_F473D0865998F35FB0946199720EAEA4","body": "JOURNEYON", "fromMe": false, "author": "59898050704@c.us"}]}';

var json2 = '{"messages":[{ "id": "false_59899056676-1383596674@g.us_F473D0865998F35FB0946199720EAEA4","body": "love", "fromMe": false, "author": "59898050704@c.us"}]}';

var json3 = '{"messages":[{ "id": "false_59899056676-1383596674@g.us_F473D0865998F35FB0946199720EAEA4","body": "stop", "fromMe": false, "author": "59898050704@c.us"}]}';


const obj = JSON.parse(json2); //convertimos el JSON en js object 
const msj = obj.messages[0].body; //conseguimos el body del objeto
const numb = obj.messages[0].author; //conseguimos el autor/numero de telefono


console.log(msj); //verificamos el msj y el numb
console.log(numb);


function beginning(a, b){
    if  (a == "JOURNEYON") { //si el msj es journeyon
        
        var regex = "@"; //xq necesitamos el numero que se encuentra antes de @
        console.log("the experience will start now");
        const indexString = b.search(regex); //busca en que index se encuentra el @
        console.log(indexString); //printea el index, para verificacion
        const cellNum = b.substring (0,indexString);// crea un substring desde el index 0 hasta el que obtuvimos anteriormente
        console.log(cellNum); //printea el numero


    }
    else if (a == "STOP" || a == "stop"){ //si es stop o STOP 
        console.log("end of the experience");
    }
    else{
        console.log("hi"); //si no manda las otras palabras hay que definir que hacemos
        }
    }


/*var paragraph ="59898050704@c.us";

// any character that is not a word character or whitespace
var regex = "@";

const indexString = paragraph.search(regex);
console.log(indexString);
// expected output: 44
const cellNum = paragraph.substring (0,11);
console.log(cellNum);*/ 