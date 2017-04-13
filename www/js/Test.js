

var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});



var SearchBar = React.createClass({
    
   
    Hello:function() {
        
         var Finally = React.createClass({
             YesBook:function(){
                    $.ajax({
                       url: "/menu",
                       type: 'POST',
                       contentType:'application/json',
                       data: JSON.stringify(document.cookie.split(";")),
                       dataType:'json'
                     });
                        alert("已送出");
                        //window.close();
                     
                   
                },
              NoBook:function(){
                alert("還沒選完就別亂按 87");
                document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                React.render(<HomePage/>, document.body);
            },
             render:function(){
                
                 return(
                    <div>
                    <h2>是否確定</h2>
                    <input type="button" id="Yes" onClick={this.YesBook} value="確認"></input>
                    <input type="button" id="No" onClick={this.NoBook} value="取消"></input>
                    </div>
                )
             }
         })
        React.render(<Finally />,document.body);
    },
    Click:function(event){
       getJson(event.target.value, function(Result){
             var View = React.createClass({
                 render:function(){
                     return(
                         <div>
                         {Result}
                         </div>
                    );
                 }
             });
        }) ;
    },
    render: function () {
        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">您的桌號 YOUR NUMBER: No.<span id="BB">7</span></h2>
                        <h3 className="section-subheading text-muted">桌次點餐驗證碼 Order Code: <span id="BBcode">H57C</span></h3>
                    </div>
                    
                    <hr></hr>
                    <div id="Test"></div>
                    <div className='foodMenu'>
                        <input type='hidden' name='url' value="https://gn301046-gn306029.c9users.io/item?pin=%E5%93%81%E7%B2%A5'" />
                        <button type='button' value="品粥" id="pin"  onClick={this.Click} ref="P">品粥</button>
                        <button type='button' value="嚐麵" id="pin" onClick={this.Click} ref="P">嚐麵</button>
                        <button type='button' value="私房小菜" id="pin" onClick={this.Click} ref="P">私房<br></br>小菜</button>
                        <button type="button" value="辛香拌麵" onClick={this.Click} name="pin">辛香<br></br>拌麵</button>
                        <button type="button" value="鮮味湯品" onClick={this.Click} name="pin">鮮味<br></br>湯品</button>
                    </div>
                    <div id="V" ></div>
                    <div id="Book"></div>
                    <div>
                        <ol id="List" className="foodOrder"></ol>
                        <div className="foodTotal">TOTAL <input type="text" disabled id="bill" value="0"/>元</div>
                        <input type='hidden' className="btn btn-lg btn-danger" id="currentbook" onClick={this.Hello} ref="P" value="確定訂購"></input>
                    </div>
                    
                </div>
            </div>
            
            
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
            </div>
        );
    }
});

React.render(<HomePage/>, document.body);