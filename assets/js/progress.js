 // When the user scrolls the page, execute myFunction
 let prog;
 let course=document.querySelector(".body-container");
 let sub=document.querySelector(".progress-container");
 let user = JSON.parse(localStorage.getItem("profile_details")) 
 let check

 // console.log(course)
 let progress_percent;
 window.onscroll = function () { myFunction() };

 function myFunction() {
     let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
     let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
     // if(winScroll<0){
     //     console.log("scrolling down")
     // }
     let scrolled = (winScroll / height) * 100;
     // console.log(scrolled)
     progress_percent=Math.floor(scrolled)
     console.log(progress_percent)
     
     document.getElementById("myBar").style.width = scrolled + "%";
     // return prog=progress_percent;
     // let progress={
     //     "user":user.username,
     //     "percentage":progress_percent,
     //     "course_name":course.dataset.id,
     //     "sub-module":sub.dataset.id
     // }


     let arr = localStorage.getItem("course_progress") ? JSON.parse(localStorage.getItem("course_progress")) : [];
console.log(arr);
if (JSON.parse(localStorage.getItem("course_progress"))) {

arr.find(e => {
 if (e["user"] == user.username && e["sub-module"]==sub.dataset.id && e["course_name"]==course.dataset.id) {
//    e["percentage"] = progress_percent;
//    e["course_name"] =course.dataset.id;
//    e["sub-module"]=sub.dataset.id
   return check=e;

//    localStorage.setItem("course_progress", JSON.stringify(arr))
// console.log(e)
 }
//  else {
//      let progress={
//          "user":user.username,
//          "percentage":progress_percent,
//          "course_name":course.dataset.id,
//          "sub-module":sub.dataset.id
//      }
//    arr.push(progress)
//    console.log("2")
//    localStorage.setItem("course_progress", JSON.stringify(arr))
   // console.log("else")

//  }
})
if(check){
    check["percentage"] = progress_percent;
    // check["course_name"] =course.dataset.id;
    // check["sub-module"]=sub.dataset.id
    localStorage.setItem("course_progress", JSON.stringify(arr))
}
else{
    let progress={
        "user":user.username,
        "percentage":progress_percent,
        "course_name":course.dataset.id,
        "sub-module":sub.dataset.id
    }
  arr.push(progress)
  console.log("2")
  localStorage.setItem("course_progress", JSON.stringify(arr))
}
   

} else {
 let progress={
         "user":user.username,
         "percentage":progress_percent,
         "course_name":course.dataset.id,
         "sub-module":sub.dataset.id
     }
arr.push(progress)
console.log("1")
localStorage.setItem("course_progress", JSON.stringify(arr))

}
     // if(progress_percent == 100){
     //     // console.log(progress_percent)
     //     alert("You reached the end")
     // }
     // console.log(progress)
     // localStorage.setItem("course_progress", JSON.stringify(progress));
     // let arr = localStorage.getItem("course_progress_original") ? JSON.parse(localStorage.getItem("course_progress_original")) : [];
 // let arr=[];
 // let course_prog=JSON.parse(localStorage.getItem("course_progress"));
 // arr.push(course_prog)
 // localStorage.setItem("course_progress_original",JSON.stringify(arr))
 // return prog=progress;           
 // console.log(arr)
 }
 // console.log(arr)
 

 
 // arr.push(progress)
 // localStorage.setItem("course_progress", JSON.stringify(prog));
