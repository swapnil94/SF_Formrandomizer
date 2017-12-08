function loadScript( url, callback ) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  script.id = "sffr_js";
  if(script.readyState) {  //IE
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName( "head" )[0].appendChild( script );
}

function myfun(){
    labelMap = {}
    $(".pbBody").children().find("label").each((index, elem)=>{ labelMap[$(elem).attr("for")] = $(elem).text() });
    $(".pbBody").children().find("input[type=text],textarea").each((index, elem) =>{
        //text fields
        e = $(elem);
        if(e.val() == null || e.val() == ""){
            if(e.parent().attr("class") == "lookupInput"){
                //Skip lookup field
            }else if(labelMap[e.attr("id")].toLowerCase().includes("email")){
                //Email field
                e.val("test@email.com");
            }else if(labelMap[e.attr("id")].toLowerCase().includes("phone") || labelMap[e.attr("id")].toLowerCase().includes("mobile")){
                //Phone/Mobile Number field
                e.val(Math.round(Math.random()*10000000));
            }else if(labelMap[e.attr("id")].toLowerCase().includes("number")){
                //Number field
                e.val(Math.round(Math.random()*1000));
            }else if(labelMap[e.attr("id")].toLowerCase().includes("%")){
                //Percent field
                e.val(Math.round(Math.random()*100));
            }else if(e.parent().attr("class").includes("dateInput")){
                //Date field
                e.next().find("a").each((i1,e1)=>{ e1.click(); });
            }else{
                e.val("test"+Math.round(Math.random()*1000));
            }
        }
    })

    $(".pbBody").children().find("input[type=checkbox]").each((index, elem) => {
        //checkbox
        if(index%2 == 0 && !elem.checked){
            elem.checked = true;
        }
    })
    
    $("optgroup").each((i,e)=>{if(i%2 == 0){
        //Multi select picklist
        $(e).children()[0].selected = true;
        $(e).parent().trigger("dblclick");
    }});
  
    $(".pbBody").children().find("select").each((index, elem) => {
        //picklist
        e = $(elem);
        if(e.css("display") == "none" || e.attr("multiple") || e.attr("size") > 1){
        }else{
            e.find(":nth-child(2)").prop("selected", true);
        }
    })
    $("#sffr_main, #sffr_js").remove();
}

// call the function...
loadScript("https://code.jquery.com/jquery-3.2.1.min.js", myfun);
