//za uputstvo
 var postavio = 0;
function understand(){
    if(postavio == 0){
        if(confirm("Igrac 1 spreman?"))
            postavio++;
    }
    else if(postavio == 1){
        if(confirm("Igrac 2 spreman?"))
            postavio++;
            window.open("skocko-podesavanja.html","_self");
    }
}


//za podesavanja
var i;

var kombinacija1 = [];
var kombinacija2 = [];

function initSettings(){
    document.getElementById("naslovTeskt").innerHTML = "Prvi igrac postavlja kombinaciju";
    i = 1;
    alert("Neka prvi igrac postavi kombinaciju");
    kombinacija1 = [];
    kombinacija2 = [];
}

function combinationInsert(){
    if(i == 1){
        if(kombinacija1.length < 4 ){
            alert("Unesite 4 simbola");
            return;
        }
        
        document.getElementById("naslovTeskt").innerHTML = "Drugi igrac postavlja kombinaciju";
        alert("Uspesno, neka drugi igrac postavi kombinaciju");
        localStorage.setItem("kombinacija1",kombinacija1.join(","));
        for(var k = 0;k<4 ; k++){
            document.getElementById("polje" + k).src = "skocko-dodatno/prazno.png";
        }
        i = 2;
    }
    else if(i == 2){
        if(kombinacija2.length < 4 ){
            alert("Unesite 4 simbola");
            return;
        }
        localStorage.setItem("kombinacija2",kombinacija2.join(","));
        window.open("skocko-igra.html","_self");
    }
}

function addElem(elem){
        if(i == 1){
            if(kombinacija1.length<4){
                polje = document.getElementById("polje" + kombinacija1.length);
                polje.src = "skocko-dodatno/" + elem + ".png" ;
                kombinacija1.push(elem);

            }
        }
        else if(i == 2){
            if(kombinacija2.length<4){
                polje = document.getElementById("polje" + kombinacija2.length);
                polje.src = "skocko-dodatno/" + elem + ".png" ;
                kombinacija2.push(elem);
            }
        }
    
}

function brisiIzKombinacije(mesto){
    var levi,desni;
    if(i == 1){
        if(kombinacija1.length< mesto + 1)
            return;
        for(var j = mesto;j<kombinacija1.length-1;j++){
            kombinacija1[j]=kombinacija1[j+1];
            levi = document.getElementById("polje"+j);
            k = j+1
            desni = document.getElementById("polje"+k);
            levi.src = desni.src;
        }
        desni = document.getElementById("polje"+ (kombinacija1.length-1));
        desni.src = "skocko-dodatno/prazno.png";
        kombinacija1.pop();

    }
    else if(i == 2){
        if(kombinacija2.length< mesto + 1)
            return;
        for(var j = mesto;j<kombinacija2.length-1;j++){
            kombinacija2[j]=kombinacija2[j+1];
            levi = document.getElementById("polje"+j);
            k = j+1
            desni = document.getElementById("polje"+k);
            levi.src = desni.src;
        }
        desni = document.getElementById("polje"+ (kombinacija2.length-1));
        desni.src = "skocko-dodatno/prazno.png";
        kombinacija2.pop();
    }
}


//za igru

var prvaKomb = []; //tacna kombinacija za prvog igraca
var drugaKomb = [];//tacna kombinacija za drugog igraca

var pokusajiPrvog;
var rezultatiPrvog;
var redPrvog;
var prviGotov;
var vremePrvog;

var pokusajiDrugog;
var rezultatiDrugog;
var redDrugog;
var drugiGotov;
var vremeDrugog;

var naRedu;
var gotovaIgra;
var igraPocela = 0

var handlerTimera;

function initGame(){
    p = localStorage.getItem("kombinacija2");
    localStorage.removeItem("kombinacija2");
    d = localStorage.getItem("kombinacija1");
    localStorage.removeItem("kombinacija1");
    if(p == null || d == null){
        alert("Unesite prvo kombinacije,vratite se na prethodni korak!");
        window.open("skocko-podesavanja.html","_self");
        return;
    }

    prvaKomb = p.split(",");
    drugaKomb = d.split(",");
    
    pokusajiPrvog = [ [],[],[],[],[],[],[] ];
    pokusajiDrugog = [ [],[],[],[],[],[],[] ];

    rezultatiPrvog = [ [],[],[],[],[],[],[] ];
    rezultatiDrugog = [ [],[],[],[],[],[],[] ];

    redPrvog = 0;
    redDrugog = 0;

    naRedu=1;
    gotovaIgra = 0;

    prviGotov = 0;
    drugiGotov = 0;

    vremePrvog = 60;
    vremeDrugog = 60;

    igraPocela = 0


    
    document.getElementById("naslovTeskt").innerText = "Na redu je igrac broj: 1";
    document.getElementById("tajmer").innerHTML = "Preostalo vreme: " + vremePrvog;
}

function startuj(){
    if(igraPocela == 1)
        return;
    igraPocela = 1;
    handlerTimera = setInterval(tick,1000);
}

function novaIgra(){
    if(confirm("Da li ste sigurni da zelite novu igru?") == 1){
        window.open("skocko-podesavanja.html","_self");
    }
}

function tick(){
    if(gotovaIgra == 1 || igraPocela == 0){
        return;
    }

    else if(naRedu == 1){
        
        vremePrvog--;
        document.getElementById("tajmer").innerHTML = "Preostalo vreme: " + vremePrvog;
        if(vremePrvog == 0){
            gotovaIgra = 1;
            clearInterval(handlerTimera);
            alert("Prvom igracu isteklo vreme, dobio igrac broj 2");
            for(var k = 0; k<4; k++){
                final = document.getElementById("final"+k);
                final.src = "skocko-dodatno/" + prvaKomb[k] + ".png";
            }
        }
        document.getElementById("tajmer").innerHTML ="Preostalo vreme: " + vremePrvog;
    }
    else if(naRedu == 2){

        vremeDrugog--;
        document.getElementById("tajmer").innerHTML = "Preostalo vreme: " + vremeDrugog;
        if(vremeDrugog == 0){
            gotovaIgra = 1;
            clearInterval(handlerTimera);
            alert("Drugom igracu isteklo vreme, dobio igrac broj 1");
            for(var k = 0; k<4; k++){
                final = document.getElementById("final"+k);
                final.src = "skocko-dodatno/" + drugaKomb[k] + ".png";
            }
        }
        document.getElementById("tajmer").innerHTML = "Preostalo vreme: " + vremeDrugog;
        
    }
}


function addElemGame(elem){//dodavanje elementa u red 
    if(gotovaIgra == 1 || igraPocela == 0){
        return;
    }
    if(naRedu == 1){
        if(prviGotov == 1)
            return;
        if(pokusajiPrvog[redPrvog].length<4){
            polje = document.getElementById("polje" + redPrvog + pokusajiPrvog[redPrvog].length);
            polje.src = "skocko-dodatno/" + elem + ".png" ;
            pokusajiPrvog[redPrvog].push(elem);

        }
    }
    else if(naRedu == 2){
        if(pokusajiDrugog[redDrugog].length<4){
            polje = document.getElementById("polje" + redDrugog + pokusajiDrugog[redDrugog].length);
            polje.src = "skocko-dodatno/" + elem + ".png" ;
            pokusajiDrugog[redDrugog].push(elem);

        }
    }
}
// karo karo pik pik     ||  karo karo karo karo || 1 || 2 
function proveriKombinaciju(pokusaj,kombinacija,nizRezultata){
    pomocni = [];
    novi = [];
    for(var v = 0; v<4;v++){
        pomocni.push(kombinacija[v]);
        novi.push(pokusaj[v]);
    }
    var tacni = 0;
    for(var v = 0; v< 4; v++){
        if(novi[v] == pomocni[v]){
            nizRezultata.push("crveno");
            tacni++;
            pomocni[v] = "1";
            novi[v] = "2"
        }
    }
    if(tacni == 4){
        return 1;
    }
    for(var v = 0;v<4;v++){
        for(var k = 0; k <4; k++){
            if(novi[v] == pomocni[k]){
                novi[v] = "2";
                pomocni[k] = "1";
                nizRezultata.push("zuto");
            }
        }
    }
    return 0;
}

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

function guessCombination(red){
    if(gotovaIgra == 1 || igraPocela == 0){
        return;
    }
    if(naRedu==1){
        if(prviGotov == 1)
            return;
        if(red != redPrvog)
            return;
        if(pokusajiPrvog[redPrvog].length==4){

            gotovaIgra = proveriKombinaciju(pokusajiPrvog[red],prvaKomb,rezultatiPrvog[red]);
            for(var k = 0; k <rezultatiPrvog[red].length ; k++){
                show = document.getElementById("show" + red + k);
                show.src = "skocko-dodatno/" + rezultatiPrvog[red][k] + "Polje.png";
            }
            if(gotovaIgra == 1){
                for(var k = 0; k<4; k++){
                    final = document.getElementById("final"+k);
                    final.src = "skocko-dodatno/" + prvaKomb[k] + ".png";
                }
                alert("Cestitamo, igrac 1 je pogodio kombinaciju!!!");
                return
                
            }
            if(drugiGotov == 1)
                return;
            naRedu = 2;
            document.getElementById("naslovTeskt").innerText = "Na redu je igrac broj: 2";
            document.getElementById("tajmer").innerHTML = "Preostalo vreme: " + vremeDrugog;
            for(var j =0; j <redPrvog;j++){
                for(var k = 0;k<4;k++){
                    polje = document.getElementById("polje"+j+k) ;
                    polje.src="skocko-dodatno/" + pokusajiDrugog[j][k] + ".png";
                }
                for(var k = 0; k < rezultatiDrugog[j].length;k++){
                    show = document.getElementById("show"+j+k);
                    show.src = "skocko-dodatno/" + rezultatiDrugog[j][k] + "Polje.png";
                }
                for(var k = rezultatiDrugog[j].length;k<4;k++){
                    show = document.getElementById("show"+j+k);
                    show.src = "skocko-dodatno/praznoPolje.png";
                }
                
            }
            for(var k = 0; k < 4; k++){
                polje = document.getElementById("polje"+redPrvog+k) ;
                polje.src="skocko-dodatno/prazno.png";

                show = document.getElementById("show"+redPrvog + k);
                show.src = "skocko-dodatno/praznoPolje.png";
            }

            redPrvog ++;
            if(redPrvog == 7){
                for(var k = 0; k<4; k++){
                    final = document.getElementById("final"+k);
                    final.src = "skocko-dodatno/" + prvaKomb[k] + ".png";
                }
                prviGotov= 1;
                for(var k = 0; k<4; k++){
                    final = document.getElementById("final"+k);
                    final.src = "skocko-dodatno/prazno.png";
                }
            }
        }
        else
            return;
    }
    else if(naRedu == 2){
        if(red != redDrugog)
            return;
        if(pokusajiDrugog[redDrugog].length==4){

            gotovaIgra = proveriKombinaciju(pokusajiDrugog[red],drugaKomb,rezultatiDrugog[red]);
            for(var k = 0; k < rezultatiDrugog[red].length ; k++){
                show = document.getElementById("show" + red + k);
                show.src = "skocko-dodatno/" + rezultatiDrugog[red][k] + "Polje.png";
            }
            if(gotovaIgra == 1){
                for(var k = 0; k<4; k++){
                    final = document.getElementById("final"+k);
                    final.src = "skocko-dodatno/" + drugaKomb[k] + ".png";
                }
                alert("Cestitamo, igrac 2 je pogodio kombinaciju!!!");
                return;
            }
            if(red == 6){
                alert("Nazalost,niko nije pobedio");
                gotovaIgra = 1;
                return;
            }
            if(prviGotov == 1)
                return;
            naRedu = 1;
            document.getElementById("naslovTeskt").innerText = "Na redu je igrac broj: 1";
            document.getElementById("tajmer").innerHTML = "Preostalo vreme: " + vremePrvog;
            for(var j =0; j <redPrvog;j++){
                for(var k = 0;k<4;k++){
                    polje = document.getElementById("polje"+j+k) ;
                    polje.src="skocko-dodatno/" + pokusajiPrvog[j][k] + ".png";
                }
                for(var k = 0; k < rezultatiPrvog[j].length;k++){
                    show = document.getElementById("show"+j+k);
                    show.src = "skocko-dodatno/" + rezultatiPrvog[j][k] + "Polje.png";
                }
                for(var k = rezultatiPrvog[j].length;k<4;k++){
                    show = document.getElementById("show"+j+k);
                    show.src = "skocko-dodatno/praznoPolje.png";
                }
                
            }
            for(var k = 0; k < 4; k++){
                polje = document.getElementById("polje"+redPrvog+k) ;
                polje.src="skocko-dodatno/prazno.png";

                show = document.getElementById("show"+redPrvog + k);
                show.src = "skocko-dodatno/praznoPolje.png";
            }

            redDrugog ++;
            if(redDrugog == 7){
                for(var k = 0; k<4; k++){
                    final = document.getElementById("final"+k);
                    final.src = "skocko-dodatno/" + drugaKomb[k] + ".png";
                }
                drugiGotov= 1;
                wait(5000);
                for(var k = 0; k<4; k++){
                    final = document.getElementById("final"+k);
                    final.src = "skocko-dodatno/prazno.png";
                }
                gotovaIgra = 1;
            }
        }
        else
            return;
    }
}

function brisiIzKombinacijeIgra(red,kolona){
    if(gotovaIgra == 1 || igraPocela == 0){
        return;
    }
    var levi,desni;
    if(naRedu == 1){
        if(prviGotov == 1)
            return;
        if(red != redPrvog){
            return;
        }
        //a 
        if(pokusajiPrvog[red].length< kolona + 1)
            return;
        for(var j = kolona;j<pokusajiPrvog[red].length-1;j++){
            pokusajiPrvog[red][j]=pokusajiPrvog[red][j+1];
            levi = document.getElementById("polje" + red + j);
            k = j+1
            desni = document.getElementById("polje"+ red + k);
            levi.src = desni.src;
        }
        desni = document.getElementById("polje" + red + (pokusajiPrvog[red].length-1));
        desni.src = "skocko-dodatno/prazno.png";
        pokusajiPrvog[red].pop();
    }
    else if(naRedu == 2){
        if(red != redDrugog){
            return;
        }
        if(pokusajiDrugog[red].length< kolona + 1)
            return;
        for(var j = kolona;j<pokusajiDrugog[red].length-1;j++){
            pokusajiDrugog[red][j]=pokusajiDrugog[red][j+1];
            levi = document.getElementById("polje" + red + j);
            k = j+1
            desni = document.getElementById("polje"+ red + k);
            levi.src = desni.src;
        }
        desni = document.getElementById("polje" + red + (pokusajiDrugog[red].length-1));
        desni.src = "skocko-dodatno/prazno.png";
        pokusajiDrugog[red].pop();

    }
}