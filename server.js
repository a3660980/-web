var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Menu.sqlite');
var bodyParser = require('body-parser');
var async = require("async");
var express = require('express'),
    employees = require('./routes/employees'),
    app = express();
var mysql = require("mysql");

var db = mysql.createConnection({
      host: 'db.mis.kuas.edu.tw',
      user: 's1103137224',
      password: 'root',
      database: 's1103137224',
});

app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 2 * 1024 * 1024 }));
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var Num = new Array("0","1","2","3","4","5","6","7","8","9");
for(var i=65;i<=90;i++){
    Num.push(String.fromCharCode(i));
}

app.get("/table",function(req,res){
    var h="<form action='/table' method='POST'>"+
            "<input type='hidden' name='storeID' value='4'>"+
            "<input type='text' name='tableNum'>"+
            "<input type='submit' value='開桌'>";
   res.send(h);
   res.end();
})

app.post('/table',function(req,res){
    var tableNum = req.body.tableNum;
    var storeID= req.body.storeID;
    console.log(tableNum+" " + storeID)
    var openTable = Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)];
    var a;
    Search(openTable,function(openTable){
        console.log("hello")
        
        db.query("INSERT INTO `Desk`(`openTable`, `storeID`, `tableNum`,`createtime`) VALUES (?,?,?,?)",[openTable,storeID,tableNum,new Date().getDate()],function(err,rows,fields){
            
           if(!err) {
               console.log("桌號："+tableNum+"已開桌，開桌碼："+openTable);
               res.send("桌號："+tableNum+"已開桌，開桌碼："+openTable);
           }
            
        })
        
    })
    
    
})


app.post('/menu',function(req,res){
    console.log(req.body)
    var menuArray=req.body;
    var menu=[];
    var itemid=[];
    insertArray(menuArray,itemid,menu,function(){
         insertMenu(itemid,menu,function() {
             //db.quert("Select ");
             console.log("suess");
         })
          
    })
   
    
});
function insertArray(menuArray,itemid,menu,callback) {
    var temp;
    for (var i =0 ; i < menuArray.length ; i++) {
        temp=menuArray[i].split("=");
        menu[myTrim(temp[0])]=temp[1];
        if(i>2){
            itemid.push(myTrim(temp[0]));
        }
        
    }
    callback();
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function insertMenu(itemid,menu,callback) {

    
    var i = 0;  
    async.whilst(  
    //条件  
    function() {  
        return i < itemid.length;   //true，則第二個函數會繼續執行，否則調出
    },  
    function(whileCb) { //循环的主体  
        db.query("INSERT INTO `Menu`( `quity`, `itemID`, `tableID`) VALUES (?,?,?)",[menu[itemid[i]],itemid[i],menu["tableID"]],function(err,rows,fields){
            if(err){
                console.log(err);
            }
           if(!err) {
               console.log("菜單新增成功");
                
           }
            
        }) 
        console.log(i);
        i++;  
        whileCb();  
    },  
    function(err) {         //here 如果條件不滿足，會發生異常  
        console.log("err is:" + err);  
        console.log("end,the i is:" + i); 
        setTimeout(function(){
            callback()},1000)
    }  
);  
    
    
    
    
    
};



app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
db.connect();
 var fl=false;
function Search(openTable,callback){
   
            db.query("SELECT openTable From Desk where openTable ='"+openTable+"'",function (error,result,fields){
                if(result[0] == undefined){
                    fl=true;
                    callback(openTable);
                    
                    
                }else{
                    openTable = Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)]+Num[parseInt(Math.random()*36)];
                    Search(openTable);
                    
                }
              
            }
            
           )
    
}