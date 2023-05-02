
let code_ids=[
    {
    "code_id":"1",
    "code":'var button=document.querySelector("button");\nbutton.onclick=function (){ alert("Hello World")}'
},
{
    "code_id":"2",
    "code":'console.log(50 + 50); //Addition operation on two numbers \nconsole.log(40 - 10); //Subtraction operation on two numbers \nvar number1 = 10;\nvar number2 = 20;\nconsole.log(number1 + number2);'
},
{
    "code_id":"3",
    "code":'var num = 10;\n// add 10 to the number \n num = num + 10; \nconsole.log("Add 10:", num);\n // subtract 5 from the number \nnum = num - 5; \nconsole.log("Subtract 5:", num);\n // multiply the number by 7\n num = num * 7; \nconsole.log("Multiply by 7:", num);\n // divide the number by 5 \nnum = num / 5;\nconsole.log("Divide by 5:", num);'
},
{
    "code_id":"4",
    "code":'var num=10;\n num+=1; \nconsole.log(num);\n num-=1;\nconsole.log(num);\nvar text1="Hey there, this is BitWise"; \nvar text2="Hey there, another string!" \nconsole.log(text1)\nconsole.log(text2)'
},
{
    "code_id":"5",
    "code":'console.log(101>100)\nconsole.log(101<100)\nconsole.log(10>=10)\nconsole.log(20<=10)'
},
{
    "code_id":"6",
    "code":'var nothing=null;\nconsole.log(nothing);'
},
{
    "code_id":"7",
    "code":'var sum = function(x, y){\nreturn x + y;\n}\nvar onePlusTwo = sum(1, 2);\nvar twoPlusTwenty = sum(2, 20);\nconsole.log(onePlusTwo, twoPlusTwenty);'
}


]
//domain specific language and Online judge
//

let urls=window.location.search;
let url=new URLSearchParams(urls);
let id=url.get("code_id");
let returning_code;

code_ids.find((e)=>{
    if(e["code_id"]==id){
        return returning_code=e;
    }
})
// console.log(returning_code)

compile_code(returning_code["code"])
function compile_code(code){

// Retrieve Elements
let executeCodeBtn = document.querySelector('.editor__run');
let resetCodeBtn = document.querySelector('.editor__reset');
let editor_console=document.querySelector('.editor__console-logs');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = code;
// let defaultCode='<h1>Hi Balaji</h1>'

let editorLib = {
    init() {
        // Configure Ace

        // Theme
        codeEditor.setTheme("ace/theme/monokai");

        // Set language
        codeEditor.session.setMode("ace/mode/java");

        // Set Options
        codeEditor.setOptions({
            // fontFamily: 'Inconsolata',
            fontSize: '12pt',
            // showInvisibles: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Get input from the code editor
    const userCode = codeEditor.getValue();
    // console.log(userCode)
    // editor_console.innerText=userCode;
    // Run the user code
    try {
        new Function(userCode)();
        // editor_console.innerText=result
    } catch (err) {
        console.error(err);
    }
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);
})

editorLib.init();
}