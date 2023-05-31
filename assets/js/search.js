let search=document.getElementById("search");
        search.addEventListener("keyup",(e)=>{
            // console.log(e.target.value.toLowerCase())
            let word=e.target.value.toLowerCase();
            let course=document.querySelectorAll(".course1-content");

            // console.log(course[1])
            course.forEach(element => {
                // console.log(element)
                let content=element.children[1].textContent.toLowerCase();
                // console.log(element.children[1].textContent)
                if(content.includes(word)){
                    // console.log("matched");
                    element.style.display="block";
                }
                else{
                    // console.log("none")
                    element.style.display="none";
                }
                
            });
        })