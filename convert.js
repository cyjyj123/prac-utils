const fs=require("fs");
const { argv } = require("process");

const filename=argv[argv.indexOf("-f")+1];
const src=fs.readFileSync(filename).toString().split("\r\n");

const [course,chapter,title,authors,licenses]=[...src[0].split(",")]
let output={course,title};

if(chapter!=""){
    output.chapter=chapter;
}

if(authors!="" && authors!=undefined){
    output.authors=authors.split(";");
}

if(licenses!="" && licenses!=undefined){
    output.licenses=licenses.split(";");
}

let questions=[];
for(let i=1;i<src.length;i++){
    const [type,question,explain,answer,...options]=src[i].split(",");

    const que={type,question,explain};
    if(type=="choice"){
        que.answer=parseInt(answer);
        que.options=options;
    }else if(type=="mchoice"){
        que.answer=answer.split(";").map(v=>parseInt(v))
        que.options=options;
    }else if(type=="blank"){
        que.answer=answer;
    }else{}  

    questions.push(que);
}

output.questions=questions;

const outfilename=filename.replace(/\.csv$/,"")+".json";
fs.writeFileSync(outfilename,JSON.stringify(output))




