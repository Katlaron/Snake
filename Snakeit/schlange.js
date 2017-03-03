
function Schlange(spieler,index) {
    this.spieler = spieler;
    this.index = index;
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
    this.lastpos = this.pos.copy();
    //this.lastcol = 0;
    
    
    this.kollision= function(){              
        if ((this.pos.x<this.size/2)||(this.pos.x>width-this.size/2)
                ||(this.pos.y<this.size/2)||(this.pos.y>height-this.size/2)){
            this.death();
        }
        
        if(spielfeld[round(this.pos.x/feldsize)][round(this.pos.y/feldsize)] != 0 ){
            this.death();
        }
        
        
        /*zsp = this;                                               // alte Kolliesion mit allen Punkten der Schlangen
        snakes.forEach(function(entry) {
            for( var i = 0 ; i < entry.oldpos.length - 10; i+= 1){
                if (entry.oldpos[i].dist(zsp.pos)< zsp.size ) { 
                    zsp.death();                
                }
            }
        });*/
    }
    
    this.death = function() {
                this.pos.x= random(width/10, width*9/10); 
                this.pos.y= random(height/10, height*9/10);
                this.angle = random (360);
                //this.colorred = random(255);
                //this.colorgreen = random(255);
                //this.colorblue = random(255);
                this.oldpos = [];
                for (var i = 0; i < rows ; i++){
                    for (var j = 0; j< colls; j++){            
                        if(spielfeld[i][j]==this.index){
                            spielfeld[i][j]=0;
                        }
                    }
                }
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
            /*this.omega += random(-1,1);       // zufallsbewegung
            if (this.omega>4){this.omega=4;}
            if (this.omega<-4){this.omega=-4;}
            this.angle += this.omega;*/
    
            var bestr = 0;
            var bestphi = 0;
            for(var phi = 0; phi < 360; phi += 45){
                var xr = round(cos(radians(phi)));
                var yr = round(sin(radians(phi)));
                var highrad = richtung(round(this.pos.x/feldsize),round(this.pos.y/feldsize),xr,yr,1); 
                if (bestr<highrad){
                    bestr = highrad; 
                    bestphi = phi ;    
                }       
            }
            
            
//            this.omega = round(bestphi - this.angle);
//            if (this.omega>=180){this.omega = -1*(this.omega-180)}
//            if (this.omega<=-180){this.omega = -1*(this.omega+180)}
//            print("omega "+this.omega+ " phi"+this.angle);
            
            //var dif = 
            
            if (this.omega>4){this.omega=4;}
            if (this.omega<-4){this.omega=-4;} 
            this.angle += this.omega;
            
            //this.tastatur();
                
            
        }
            
        this.pos.x += this.speed*cos(radians(this.angle));
        this.pos.y += this.speed*sin(radians(this.angle));
        this.oldpos.push(this.pos.copy());

    }
    

    
    this.arrayfullen = function(){       

        if (!((round(this.lastpos.x/feldsize) == round(this.pos.x/feldsize) )&&(round(this.lastpos.y/feldsize) == round(this.pos.y/feldsize)))){               
             spielfeld[round(this.lastpos.x/feldsize)][round(this.lastpos.y/feldsize)] = this.index;
             
             var xlow;
             var xhigh;
             var ylow;
             var yhigh;
             
             if ((this.angle>0)&&(this.angle<180)){
                xlow = this.lastpos.x + this.size/2*cos(radians(this.angle+90))
                xhigh = this.lastpos.x + this.size/2*cos(radians(this.angle-90))
                ylow = this.lastpos.y + this.size/2*sin(radians(this.angle-90))
                yhigh = this.lastpos.y + this.size/2*sin(radians(this.angle+90))                 
             } else {
                xhigh = this.lastpos.x + this.size/2*cos(radians(this.angle+90))
                xlow = this.lastpos.x + this.size/2*cos(radians(this.angle-90))
                yhigh = this.lastpos.y + this.size/2*sin(radians(this.angle-90))
                ylow = this.lastpos.y + this.size/2*sin(radians(this.angle+90))  
             }
             spielfeld[round(xlow/feldsize)][round(yhigh/feldsize)] = this.index;
             spielfeld[round(xhigh/feldsize)][round(ylow/feldsize)] = this.index;
             
         }
        
        this.lastpos = this.pos.copy();
        
    }
    
    this.tastatur = function (){
        if (keyIsDown(LEFT_ARROW))
            this.angle-=4;

        if (keyIsDown(RIGHT_ARROW))
            this.angle+=4;
    }
    
}


function richtung(x,y,xr,yr,d){
    this.d = d;
    
    if((x+xr*d>0)&&(x+xr*d<rows)&&(y+yr*d>0)&&(y+yr*d<colls)){
        if ((spielfeld[x+xr*d][y+yr*d]==0)||this.d<5){
            this.d= richtung(x,y,xr,yr,d+1);    
        }
    }
    
    return this.d; 
}