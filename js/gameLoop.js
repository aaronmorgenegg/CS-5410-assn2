let previousTime = performance.now();
let events = [];

function addEvent(){
    var name = document.getElementById("input-name").value;
    var interval = document.getElementById("input-interval").value;
    var count = document.getElementById("input-count").value;
    var print_time = 0;

    if(name!==undefined && interval!==undefined && count!==undefined) {
        events.push({"name": name, "interval": interval, "count": count, "print_time": print_time});
    }
}

function printEvent(event){
    var node = document.getElementById("events");
    node.innerHTML += "Event: " + event.name + "(" + event.count + " remaining)<br>";
    node.scrollTop = node.scrollHeight;
}

function processInput(elapsedTime){

}

function update(elapsedTime){
    for(var i = 0; i < events.length; i++){
        if(events[i].print_time > events[i].interval){
            events[i].print_time = 0;
            events[i].count -= 1;
            if(events[i].count<0){
                delete events[i];
            }
        } else {
            events[i].print_time += elapsedTime;
        }
    }
    events = events.filter(function(n){ return n !== undefined });
}

function render(elapsedTime){
    for(var i = 0; i < events.length; i++){
        if(events[i].print_time > events[i].interval){
            printEvent(events[i]);
        }
    }
}

function gameLoop(){
    let currentTime = performance.now();
    let elapsedTime = currentTime - previousTime;
    previousTime = currentTime;

    processInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);

    if(true){
        // Event-based model, makes a request to the browser to loop when its ready. Allows the browser to do other things
        requestAnimationFrame(gameLoop)
    }
}

gameLoop();