var express = require('express'); 
var app = express(); 
var socketIO = require('socket.io'); 
var path = require('path'); 
var server = app.listen(8080, function() {
    console.log('server started'); 
}); 
var fs = require('fs'); 
var io = require('socket.io').listen(server); 
app.use(express.static(path.join(__dirname, 'public'))); 
io.on('connection', function(socket) {
    var filePath = __dirname + '/data.json'; 
    var filePath = filePath.replace('\\', '\\'); 
    var objects = JSON.parse(fs.readFileSync(__dirname + '/public/data.json', 'utf8')); 
    socket.emit('stocks',  {'stocks':objects.stocks}); 

    objects.stocks.forEach(function (element,index) {
        setTimeout(function () {
            if(index%2 == 0 || index == 0)
                objects.stocks[index].currentStock = parseInt(objects.stocks[index].currentStock) - (index * 10); 
            else
                objects.stocks[index].currentStock = parseInt(objects.stocks[index].currentStock) + (index * 10); 
            socket.emit('stocks',  {'stocks':objects.stocks}); 
            index = index === objects.stocks.length ? 0 : index;
        }, index * 2500); 
    }); 
    
    socket.on('custom', function(data) {
        console.log(data); 
    }); 
}); 

