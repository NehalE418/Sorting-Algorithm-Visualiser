var height = 600 ,width = 800,margin=100;
var array = [6,5,4,3,2];
var bar_width = width/array.length, bar_height = height/array.length, bar_margin = margin/array.length;


function draw_bar(height){
    var bar = document.createElement('div');
    bar.setAttribute("class","bar");
    bar.setAttribute("style",`height:${height*bar_height}px;width:${bar_width}px;background-color:#0000FF`);
    bar.style.left = (bar_width*(array.length-1) + bar_margin*array.length) +'px';
    document.getElementById("canvas").appendChild(bar);
}

function addbar(number_of_bars){
    let height = Math.floor((Math.random()*number_of_bars)+1);
    array.push(height);
    draw_bar(height);
}
function clear_array(){
    array = [];
    const mynode = document.getElementById("canvas");
    while(mynode.firstChild){
        mynode.removeChild(mynode.lastChild);
    }
}


function insertion_sort(){
    var timeout_array = []; 
    for(var i=0;i<array.length;i++){
        for(var j=0;j<array.length -i-1;j++){
            if(array[j]>array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]];
                timeout_array.push(j,j+1);
            }
        } 
    }
    j=0;
    var new_index = [];
    for(i=0;i<array.length;i++){
        new_index.push(i);
    }
    var bars = document.getElementsByClassName("bar");
    var tim = 2000;
    var id = setInterval(frame, tim/array.length);
    function frame(){
        if(j>=timeout_array.length){
            clearInterval(id);
        }
        else{
            let x =timeout_array[j],y=timeout_array[j+1];
            let pos1 = (bar_width*x + bar_margin*(x+1));
            let pos2 = (bar_width*y + bar_margin*(y+1));
            // console.log( pos1+' '+pos2);
            // let pos =0;
            // let id1 = setInterval(frame1, 20);
            // function frame1() {
            //     if(pos==1){
            //         clearInterval(id1);
            //     }
            //     else{
            //         pos++;
            //         bars[new_index[x]].style.left = (pos2) +'px';
            //         bars[new_index[y]].style.left = (pos1) +'px';
            //     }
            // }
            bars[new_index[x]].style.left = (pos2) +'px';
            bars[new_index[y]].style.left = (pos1) +'px';
            [new_index[x],new_index[y]] = [new_index[y],new_index[x]];
            j+=2;
        }
    }
}

function generate_new_array(){
    var number_of_bars = document.getElementById("array_size").value;
    clear_array();
    bar_width = width/number_of_bars, 
    bar_height = height/number_of_bars, 
    bar_margin = margin/number_of_bars;
    for(let i=0;i<number_of_bars;i++) addbar(number_of_bars);
}