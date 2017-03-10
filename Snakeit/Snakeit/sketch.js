var s;
var width = window.innerWidth;
var height = window.innerHeight;
var snakes = [];
var spielfeld = [];
var feldsize = 5;
var zsp;
var frmrate;


var spielfeld = [];
var rows;
var colls;



function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    
    rows = round(width/feldsize);
    colls = round(height/feldsize);
    
    for (i=0;i<rows+5;i++) {
        spielfeld[i]=[];
        for (j=0;j<colls+5;j++) {
            spielfeld[i][j]=0;
        }
    }
    print(rows + " "+colls)
    print(spielfeld[0][0]);
    
    for (var i = 0; i< 4; i++){
        s = new Schlange(false,i+2);
        snakes.push(s);
    }
    
    p = new Schlange(true,1); 
    snakes.push(p);
}

function draw() {
    //print(spielfeld);
    //print(spielfeld[0][0]);
    
    /* for (var i = 0; i < rows ; i++){
        for (var j = 0; j< colls; j++){            
            if (spielfeld[i][j]==0){ 
                fill(255);
                stroke(0);
                rect(feldsize*i,feldsize*j,feldsize,feldsize);
            }
            
             if (spielfeld[i][j]==1){ 
                fill(255,0,0);
                
                rect(feldsize*i,feldsize*j,feldsize,feldsize);
            }
        }
    }*/
    
    
    snakes.forEach(function(entry) {
        entry.update();
        entry.kollision();
        entry.arrayfullen();
        entry.show();
    });
    frmrate += frameRate();
    if (frameCount%100 == 0) {
        //print(frmrate/100);
        frmrate = 0;}


    

    
}

function neuzeichnen() {
    
    background(255);    
    fill(255,0,0);
    snakes.forEach(function(a) {
        zsp = a;
        a.oldpos.forEach(function(entry) {
            fill(zsp.colorred,zsp.colorgreen,zsp.colorblue);
            noStroke();
            ellipse(entry.x,entry.y,zsp.size,zsp.size);
        });
    });
    
}

