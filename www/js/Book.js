function book(id){
    var Result ="";
    $.getJSON("https://gn301046-gn306029.c9users.io/employees?id="+id, function(json){
        if(json[0].itemOptions===""){
        var Name = json[0].itemName;
        var Money = json[0].itemMoney;
        Result +="<table><tr><td><h2>菜名："+json[0].itemName+"</h2></td></tr>";
        Result +="<tr><td>價錢：<input id='price' type='text' disabled value='"+json[0].itemMoney+"'/></td>";
        if(typeof($.cookie(id))=="undefined") {
            Result +="<tr><td>數量：</td></tr><tr><td><input type='number' id='Q' value=1 onchange='sum()' min='1'/></td></tr>";
            Result +="<tr><td>小計：<input id='total' type='text' value='"+json[0].itemMoney+"' disabled /></td></tr>";
            Result +="<tr><td><button class='btn btn-info' id='current' onclick='num("+id+"," + "\"" + json[0].itemType +"\""+","+"\""+Name+"\""+","+"\""+Money+"\""+")'>確認</button></td><td><button class='btn btn-info' id='cancel' onclick='cancel("+"\""+json[0].itemType+"\""+")'>取消</button></td></tr>";
        }else{
            Result +="<tr><td>數量：</td></tr><tr><td><input type='number' id='Q' value='"+$.cookie(id)+"' onchange='sum()' min='1'/></td></tr>";
            Result +="<tr><td>小計：<input id='total' type='text' value='"+json[0].itemMoney+"' disabled /></td></tr>";
            Result +="<tr><td><button class='btn btn-info' id='current' onclick='num2("+id+"," + "\"" + json[0].itemType +"\""+","+"\""+Name+"\""+","+"\""+Money+"\""+","+"\""+$.cookie(id)+"\""+")'>確認</button></td><td><button class='btn btn-info' id='cancel' onclick='cancel("+"\""+json[0].itemType+"\""+")'>取消</button></td></tr>";
        }
       
        Result += "</table>";
        }else{
            
        }
    }).done(function(){
        //callback(Result);
        $("#V").html(Result);
        
    });    
   
}

function FindID(id,callback){
    var Json;
    $.getJSON("https://gn301046-gn306029.c9users.io/employees?id="+id, function(json){
        Json = json;
    }).done(function(){
        callback(Json[0]);
    });
}


function sum(){
    var price = parseInt($("#price").val().substr(0, $("#price").val().length-1));
    var q=parseInt($("#Q").val());
    $("#total").val(price*q+"元");
    
}
document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
function num(id,G,Name,Money){
    $("#currentbook").attr("type","button");
    var Name,Money,Num,cook,flag=0;
    Num = parseInt($("#Q").val());
    console.log(Name+" "+Money+" "+Num+" "+id);
    Add(Name,Money,Num,id);
    getJson(G);
}
function num2(id,G,Name,Money,oldCookie){
    var Name,Money,Num,cook;
    $("#bill").val(parseInt($("#bill").val())-oldCookie*parseInt(Money.substr(0, Money.length-1)));
    Num = parseInt($("#Q").val());
    console.log(Name+" "+Money+" "+Num+" "+id);
    Add2(Name,Money,Num,id);
    getJson(G);
}
function Add2(Name,Money,Num,cook){
            $.cookie(cook,parseInt($("#Q").val()));
            $("#L"+cook).html(Name+" 單價"+Money+" 數量"+Num+" 小計"+(parseInt(Money.substr(0, Money.length-1))*Num)+" <button id='Less' onclick='less(this,"+cook+",\""+Money+"\""+","+"\""+Num+"\""+")'>取消</button>");
            var SUM = (parseInt(Money.substr(0, Money.length-1))*Num);
            var UP = parseInt($("#bill").val());
            $("#bill").val(SUM+UP);
}
function Add(Name,Money,Num,cook){
            $.cookie(cook,parseInt($("#Q").val()));
            $("#List").append("<li id='L"+cook+"'>"+Name+" 單價"+Money+" 數量"+Num+" 小計"+(parseInt(Money.substr(0, Money.length-1))*Num)+" <button id='Less' onclick='less(this,"+cook+",\""+Money+"\""+","+"\""+Num+"\""+")'>取消</button>"+'</li>');
            var SUM = (parseInt(Money.substr(0, Money.length-1))*Num);
            var UP = parseInt($("#bill").val());
            $("#bill").val(SUM+UP);
          
        
    
}


function cancel(G){
    getJson(G);
}

function less(obj,cook,Money,Num){
    console.log(cook+" "+Money+" "+Num);
    $.cookie(cook,'',{ expires: -1 });
    $(obj).parent().remove();
    $("#bill").val(parseInt($("#bill").val())-(parseInt(Money.substr(0, Money.length-1))*Num));
    
    if(document.cookie.length==0){
        $("#currentbook").attr("type","hidden");
    }
}