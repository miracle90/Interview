var myWorker = new Worker("my_task.js");

// my_task.js中的代码 
var i = 0;
function timedCount(){
    i = i+1;
    postMessage(i);
    setTimeout(timedCount, 1000);
}
timedCount();
