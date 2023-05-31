let checkbox = document.getElementsByClassName("radio");




checkbox[0].addEventListener("click", (e) => {
    if (checkbox[0].checked) {
        let user = JSON.parse(localStorage.getItem("profile_details"))

        let course_id = e.target.dataset.id
        let enrolled_data = {
            "user_name": user.username,
            "enrolled_course": course_id,
            "status": checkbox[0].checked
        }
        let arr = localStorage.getItem("bag_list") ? JSON.parse(localStorage.getItem("bag_list")) : [];
        arr.push(enrolled_data)
        localStorage.setItem("bag_list", JSON.stringify(arr));
    }

});
let arr = JSON.parse(localStorage.getItem("bag_list"));
let user = JSON.parse(localStorage.getItem("profile_details"))
arr.find((el) => {
    if (el["enrolled_course"] == checkbox[0].dataset.id && el["user_name"] == user.username) {
        checkbox[0].setAttribute("checked", "");
        checkbox[0].setAttribute("disabled", "")
    }
})


 


        // })