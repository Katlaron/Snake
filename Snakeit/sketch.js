var s;
var width = window.innerWidth;
var height = window.innerHeight;
var snakes = [];
var zsp;
var frmrate;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    
    for (var i = 0; i< 1; i++){
        s = new Schlange(false);
        snakes.push(s);
    }
    
    //p = new Schlange(true); 
    //snakes.push(p);
}

function draw() {
    snakes.forEach(function(entry) {
        entry.update();
        entry.kollision();
        entry.show();
    });
    frmrate += frameRate();
    if (frameCount%100 == 0) {
        print(frmrate/100);
        frmrate = 0;}
    
    
    
}



function Schlange(spieler) {
    this.spieler = spieler;
    this.pos = createVector(random(width/10, width*9/10),random(height/10, height*9/10));
    this.oldpos = [];
    this.speed = 3;
    this.angle = random(360);
    this.omega = 0;
    this.size = 15;
    //this.color = random(255+255*255+255*255*255);
    this.colorred = random(255);
    this.colorgreen = random(255);
    this.colorblue = random(255);
    
    this.kollision= function(){
        
        
        if ((this.pos.x<this.size/2)||(this.pos.x>width-this.size/2)
                ||(this.pos.y<this.size/2)||(this.pos.y>height-this.size/2)){
            this.death();
        }
        
        zsp = this;
        snakes.forEach(function(entry) {
            for( var i = 0 ; i < entry.oldpos.length - 10; i+= 1){
                if (entry.oldpos[i].dist(zsp.pos)< zsp.size ) { 
                    zsp.death();                
                }
            }
        });
    }
    
    this.death = function() {
                //print("Death");
                this.pos.x= random(width/10, width*9/10); 
                this.pos.y= random(height/10, height*9/10);
                this.angle = random (360);
                //this.colorred = random(255);
                //this.colorgreen = random(255);
                //this.colorblue = random(255);
                this.oldpos = [];        
                neuzeichnen();
                
                
    }
    
    this.show = function() {
            //fill(255,0,0);
        fill(this.colorred,this.colorgreen,this.colorblue)    
        noStroke();
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        
    }
    

    
    this.update = function (){
        
        if(this.spieler){
            this.tastatur();
        } else {
            this.omega += random(-1,1);       // zufallsbewegung
            if (this.omega>4){this.omega=4;}
            if (this.omega<-4){this.omega=-4;}
            this.angle += this.omega;
            /*var bestphi = 0;
            var bestr = 0;
            var lowestr = 500;
            var best = 0;
            
            for (var phi = 0; phi < 360; phi+= 360 ){
                best = 0;
                for (var r = this.size ; r < 500; r += this.size){
                    bestr = 0;
                    lowestr = 500;                    
                    var x =  this.pos.x + r*cos(radians(phi));
                    var y =  this.pos.y + r*sin(radians(phi));
                    var vec = createVector(x,y);
                    snakes.forEach(function(entry) {
                        for( var i = 0 ; i < entry.oldpos.length - 10; i+= 1){
                            if (entry.oldpos[i].dist(vec)< entry.size ) { 
                                if (lowestr > r) { lowestr = r;} ;    
                                print("hit");
                            }
                        }                      
                    });
                    if (bestr< lowestr){bestr = lowestr; }
                    print(r +" und "+lowestr);
                    
                }
                if (best<bestr){
                    best= bestr;
                    
                    bestphi = phi;
                }
          
            }
            //print(bestphi);
            this.tastatur();*/
            
        }
            
        this.pos.x += this.speed*cos(radians(this.angle));
        this.pos.y += this.speed*sin(radians(this.angle));
        //if (frameCount%10==0) {this.oldpos.push(this.pos.copy());}
        this.oldpos.push(this.pos.copy());
        
    }
    
    this.tastatur = function (){
        if (keyIsDown(LEFT_ARROW))
            this.angle-=4;

        if (keyIsDown(RIGHT_ARROW))
            this.angle+=4;
    }
    
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

