function getJson(G,callback){
    var Result;
    $.getJSON("https://gn301046-gn306029.c9users.io/employees?itemType="+G, function(json){
        Result ="<table class='foodTable'><tr><td><h2>店名："+json[0].storeName+"</h2></td></tr><tr class='foodWrap frist'><td>餐點 FOOD</td><td>價錢 PRICE</td></tr>";
        for(var i=0;i<json.length;i++){
                Result += "<tr class='foodWrap' onClick='A(this)' id='"+json[i].id+"'>";
                Result += "<td class='foodName'>"+json[i].itemName+"</td>";
                Result += "<td class='foodPrice'>"+json[i].itemMoney+"</td>";
                Result += "</tr>";
        }
        Result += "</table>";
    }).done(function(){
        $("#V").html(Result);
    });
}

function A(obj){
    book(obj.id);
}


$( document ).ready(function() {
    var msg;
     $.getJSON("https://gn301046-gn306029.c9users.io/employees?itemType=品粥", function(json){
         msg = json[0].tableNum;
         $("#BBcode").html(json[0].openTable);
         $.cookie("tableNum",json[0].tableNum);
         $.cookie("tableID",json[0].tableID);
         $.cookie("openTable",json[0].openTable);
     }).done(function(){
    $("#BB").html(msg);
     });
    
});