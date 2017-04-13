
var Result = new Object();
var ResultName=new Array("id","storeName","itemType","itemName","itemMoney","itemOptions");
var mysql = require("mysql");

var db = mysql.createConnection({
      host: 'db.mis.kuas.edu.tw',
      user: 's1103137224',
      password: 'root',
      database: 's1103137224',
});
db.connect();
var async = require("async");
exports.findAll = function (req, res, next) {
    
    var tableNum = 2;
    var openTable = "H4H95";
    var msg;
    var name = req.query.itemType;
    console.log(name)
    var id = req.query.id;
    if(typeof name !="undefined"){
        async.waterfall([
    	function(callback){
    	    //var sql = "SELECT storeName,delivery,itemName,itemMoney,itemType,id,itemOptions,A.storeID,openTable,tableNum FROM Contacts A LEFT JOIN Desk B on A.storeID=B.storeID where B.tableNum=\'2\' and B.openTable=\'H4H95\' and itemType=\'品粥\' and storeName LIKE \'麵麵粥道%\' group by itemName";
    	   var SQL = "SELECT storeName,delivery,itemName,itemMoney,itemType,id,itemOptions,A.storeID,openTable,tableNum,tableID FROM Contacts A LEFT JOIN Desk B on A.storeID=B.storeID  where B.tableNum='"+tableNum+"' and B.openTable='"+openTable+"' and itemType='"+name+"' and storeName LIKE '麵麵粥道%' group by itemName;";
    	   db.query(SQL,function(err, rows) {
    	      
               callback(null, rows);
               
            });
    	}
    	],function(err,result){
    	    res.send(result);
    	}
    );
    }
    if(typeof id !="undefined"){
        async.waterfall([
    	function(callback){
    	    var SQL = "SELECT storeName,delivery,itemName,itemMoney,itemType,id,itemOptions FROM Contacts where id='"+id+"';";
    	   db.query(SQL,function(err, rows) {
               callback(null, rows);
            });
    	}
    	],function(err,result){
    	    res.send(result);
    	}
    );
    }
   
};

exports.findById = function (req, res, next) {
    
    	
};