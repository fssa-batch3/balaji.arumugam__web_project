let btns=document.querySelectorAll("button");
       
        btns.forEach((e)=>{
            // console.log(e.parentElement)
            e.parentElement.setAttribute("href","JS-3.html?code_id="+e.dataset.id)
        })