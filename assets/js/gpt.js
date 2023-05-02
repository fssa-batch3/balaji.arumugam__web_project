 // define md object, and extent function (which is a dummy function)
 const md = { yaml:{}, before: function (str) {return str}, after: function (str) {return str} }

 // function for REGEXP to convert html tag. ie. <TAG> => &lt;TAG*gt;  
 md.formatTag = function (html) { return html.replace(/</g,'&lt;').replace(/\>/g,'&gt;'); }

 //===== format code-block, highlight remarks/keywords for code/sql
 md.formatCode = function (match, title, block) {
   // convert tag <> to &lt; &gt; tab to 3 space, support marker using ^^^
   block = block.replace(/</g,'&lt;').replace(/\>/g,'&gt;')
   block = block.replace(/\t/g,'   ').replace(/\^\^\^(.+?)\^\^\^/g, '<mark>$1</mark>')
   
   // highlight comment and keyword based on title := none | sql | code
   if (title.toLowerCase(title) == 'sql') {
     block = block.replace(/^\-\-(.*)/gm,'<rem>--$1</rem>').replace(/\s\-\-(.*)/gm,' <rem>--$1</rem>')   
     block = block.replace(/(\s?)(function|procedure|return|if|then|else|end|loop|while|or|and|case|when)(\s)/gim,'$1<b>$2</b>$3')
     block = block.replace(/(\s?)(select|update|delete|insert|create|from|where|group by|having|set)(\s)/gim,'$1<b>$2</b>$3')
   } else if ((title||'none')!=='none') {
     block = block.replace(/^\/\/(.*)/gm,'<rem>//$1</rem>').replace(/\s\/\/(.*)/gm,' <rem>//$1</rem>')   
     block = block.replace(/(\s?)(function|procedure|return|if|then|else|end|loop|while|or|and|case|when)(\s)/gim,'$1<b>$2</b>$3')
     block = block.replace(/(\s?)(var|let|const|for|next|do|while|loop|continue|break|switch|try|catch|finally)(\s)/gim,'$1<b>$2</b>$3')
   }
   return '<pre title="' + title + '"><button onclick="md.clipboard(this)">copy</button><code>'  + block + '</code></pre>'
 }
 
 //===== parse markdown string into HTML string (exclude code-block)
 md.parser = function( mdstr ) {
 
   // apply yaml variables
   for (var name in this.yaml) mdstr = mdstr.replace( new RegExp('\{\{\\s*'+name+'\\s*\}\}', 'gm'), this.yaml[name] )
   
   // table syntax
   mdstr = mdstr.replace(/\n(.+?)\n.*?\-\-\s?\|\s?\-\-.*?\n([\s\S]*?)\n\s*?\n/g, function (m,p1,p2) {
       var thead = p1.replace(/^\|(.+)/gm,'$1').replace(/(.+)\|$/gm,'$1').replace(/\|/g,'<th>')
       var tbody = p2.replace(/^\|(.+)/gm,'$1').replace(/(.+)\|$/gm,'$1')
       tbody = tbody.replace(/(.+)/gm,'<tr><td>$1</td></tr>').replace(/\|/g,'<td>')
       return '\n<table>\n<thead>\n<th>' + thead + '\n</thead>\n<tbody>' + tbody + '\n</tbody></table>\n\n' 
   } )   

   // horizontal rule => <hr> 
   mdstr = mdstr.replace(/^-{3,}|^\_{3,}|^\*{3,}$/gm, '<hr>').replace(/\n\n<hr\>/g, '\n<br><hr>')

   // header => <h1>..<h5> 
   mdstr = mdstr.replace(/^##### (.*?)\s*#*$/gm, '<h5>$1</h5>')
             .replace(/^#### (.*?)\s*#*$/gm, '<h4>$1</h4>')
             .replace(/^### (.*?)\s*#*$/gm, '<h3>$1</h3>')
             .replace(/^## (.*?)\s*#*$/gm, '<h2>$1</h2>')
             .replace(/^# (.*?)\s*#*$/gm, '<h1>$1</h1>')
             .replace(/^<h(\d)\>(.*?)\s*{(.*)}\s*<\/h\d\>$/gm, '<h$1 id="$3">$2</h$1>')
       
   // inline code-block: `code-block` => <code>code-block</code>    
   mdstr = mdstr.replace(/``(.*?)``/gm, function(m,p){ return '<code>' + md.formatTag(p).replace(/`/g,'&#96;') + '</code>'} ) 
   mdstr = mdstr.replace(/`(.*?)`/gm, '<code>$1</code>' )
       
   // blockquote, max 2 levels => <blockquote>{text}</blockquote>
   mdstr = mdstr.replace(/^\>\> (.*$)/gm, '<blockquote><blockquote>$1</blockquote></blockquote>')
   mdstr = mdstr.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
   mdstr = mdstr.replace(/<\/blockquote\>\n<blockquote\>/g, '\n<br>' )
   mdstr = mdstr.replace(/<\/blockquote\>\n<br\><blockquote\>/g, '\n<br>' )
                 
   // image syntax: ![title](url) => <img alt="title" src="url" />          
   mdstr = mdstr.replace(/!\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<img alt="$1" src="$2" $3 />')
   mdstr = mdstr.replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" width="90%" />')
                 
   // links syntax: [title "title"](url) => <a href="url" title="title">text</a>          
   mdstr = mdstr.replace(/\[(.*?)\]\((.*?) "new"\)/gm, '<a href="$2" target=_new>$1</a>')
   mdstr = mdstr.replace(/\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<a href="$2" title="$3">$1</a>')
   mdstr = mdstr.replace(/([<\s])(https?\:\/\/.*?)([\s\>])/gm, '$1<a href="$2">$2</a>$3')
   mdstr = mdstr.replace(/\[(.*?)\]\(\)/gm, '<a href="$1">$1</a>')
   mdstr = mdstr.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
                 
   // unordered/ordered list, max 2 levels  => <ul><li>..</li></ul>, <ol><li>..</li></ol>
   mdstr = mdstr.replace(/^[\*+-][ .](.*)/gm, '<ul><li>$1</li></ul>' )
   mdstr = mdstr.replace(/^\d\d?[ .](.*)/gm, '<ol><li>$1</li></ol>' )
   mdstr = mdstr.replace(/^\s{2,6}[\*+-][ .](.*)/gm, '<ul><ul><li>$1</li></ul></ul>' )
   mdstr = mdstr.replace(/^\s{2,6}\d[ .](.*)/gm, '<ul><ol><li>$1</li></ol></ul>' )
   mdstr = mdstr.replace(/<\/[ou]l\>\n\n?<[ou]l\>/g, '\n' )
   mdstr = mdstr.replace(/<\/[ou]l\>\n<[ou]l\>/g, '\n' )
                 
   // text decoration: bold, italic, underline, strikethrough, highlight                
   mdstr = mdstr.replace(/\*\*\*(\w.*?[^\\])\*\*\*/gm, '<b><em>$1</em></b>')
   mdstr = mdstr.replace(/\*\*(\w.*?[^\\])\*\*/gm, '<b>$1</b>')
   mdstr = mdstr.replace(/\*(\w.*?[^\\])\*/gm, '<em>$1</em>')
   mdstr = mdstr.replace(/___(\w.*?[^\\])___/gm, '<b><em>$1</em></b>')
   mdstr = mdstr.replace(/__(\w.*?[^\\])__/gm, '<u>$1</u>')
   // mdstr = mdstr.replace(/_(\w.*?[^\\])_/gm, '<u>$1</u>')  // NOT support!! 
   mdstr = mdstr.replace(/\^\^\^(.+?)\^\^\^/gm, '<mark>$1</mark>')
   mdstr = mdstr.replace(/\^\^(\w.*?)\^\^/gm, '<ins>$1</ins>')
   mdstr = mdstr.replace(/~~(\w.*?)~~/gm, '<del>$1</del>')
                 
   // line break and paragraph => <br/> <p>                
   mdstr = mdstr.replace(/  \n/g, '\n<br/>').replace(/\n\s*\n/g, '\n<p>\n')
       
   // indent as code-block          
   mdstr = mdstr.replace(/^ {4,10}(.*)/gm, function(m,p) { return '<pre><code>' + md.formatTag(p) + '</code></pre>'} )
   mdstr = mdstr.replace(/^\t(.*)/gm, function(m,p) { return '<pre><code>' + md.formatTag(p) + '</code></pre>'} )
   mdstr = mdstr.replace(/<\/code\><\/pre\>\n<pre\><code\>/g, '\n' )

   // Escaping Characters                
   return mdstr.replace(/\\([`_~\*\+\-\.\^\\\<\>\(\)\[\]])/gm, '$1' )
 }

 //===== parse markdown string into HTML content (cater code-block)
 md.html = function (mdText) { 
   // replace \r\n to \n, and handle front matter for simple YAML
   mdText = mdText.replace(/\r\n/g, '\n').replace( /^---+\s*\n([\s\S]*?)\n---+\s*\n/, md.formatYAML )
   // handle code-block.
   mdText = mdText.replace(/\n~~~/g,'\n```').replace(/\n``` *(.*?)\n([\s\S]*?)\n``` *\n/g, md.formatCode)
   
   // split by "<code>", skip for code-block and process normal text
   var pos1=0, pos2=0, mdHTML = ''
   while ( (pos1 = mdText.indexOf('<code>')) >= 0 ) {
     pos2 = mdText.indexOf('</code>', pos1 )
     mdHTML += md.after( md.parser( md.before( mdText.substr(0,pos1) ) ) )
     mdHTML += mdText.substr(pos1, (pos2>0? pos2-pos1+7 : mdtext.length) )
     mdText = mdText.substr( pos2 + 7 )
   }

   return '<div class="markdown">' + mdHTML + md.after( md.parser( md.before(mdText) ) ) + '</div>'
 }
 
 md.clipboard = (e) => {
   navigator.clipboard.writeText( e.parentNode.innerText.replace('copy\n','') )
   e.innerText = 'copied'
 }

const chat = (id) => window.document.getElementById(id);

// Set the API endpoint URL
chat.endPoint  = "https://api.openai.com/v1/chat/completions";
chat.model = "gpt-3.5-turbo"
chat.body  = { model: chat.model, temperature: 0.8 }
chat.history = []

// stream result from openai
chat.stream = function (prompt) {

 chat.body.stream = true 
 chat.body.messages = [ { role: "user", content: prompt} ]
 chat.headers = { "Authorization": `Bearer ${chat.apiKey}`, "Content-Type": "application/json" }
 chat.result = ''
 chat.controller = new AbortController();
 const signal = chat.controller.signal
  
 for (let i=chat.history.length-1; i>=0&&i>(chat.history.length-3); i--) {
   chat.body.messages.unshift( { role:'assistant', content: chat.history[i].result } );
   chat.body.messages.unshift( { role:'user', content: chat.history[i].prompt } );
 }
 
 fetch( chat.endPoint, { method:'POST', headers: chat.headers, body: JSON.stringify(chat.body), signal } )
 .then( response => { 
 
   if (!response.ok) {
       if (response.status == 401) throw new Error('401 Unauthorized, invalide API Key');
       throw new Error('failed to get data, error status '+response.status)
   }
   
   const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
   
   reader.read().then( function processText({ done, value }) {
   
     if (done) return chat.oncomplete(chat.result);
     
     const lines = (chat.value=value).split('\n');

     for (let i in lines) {
       if (lines[i].length === 0) continue;     // ignore empty message
       if (lines[i].startsWith(':')) continue;  // ignore comment message
       if (lines[i] === 'data: [DONE]') return chat.oncomplete(chat.result); // end of message
       
       chat.json = JSON.parse(lines[i].substring(6));
       if (chat.json.choices) {
         chat.result += (chat.json.choices[0].delta.content||'') 
       }	 
     }

     chat.onmessage(chat.result)
     return reader.read().then(processText);
      
   } )
   
 } ).catch( error => chat.onerror(error) );
 
}

// default error handle
chat.onerror = (error) => { alert(error);  };

// display result when receiving message
chat.onmessage = function (text) {
  // chat("message").innerHTML = 'receiving messages..'
 chat("receiving").innerHTML = md.html(text + '<br><br>');
}

// show whole conversation when message completed
chat.oncomplete = (text) => {
 let html1='', html2=''
//   chat("message").innerHTML = `(model: ${chat.model})`
 chat.history.push( { prompt: chat.prompt, result: chat.result } )
 
 for (let i=0; i<chat.history.length; i++) {
    html1 += '<h4 class=prompt id=prompt'+i+' ondblclick="chat.clipboard('+i+')" title="doubleclick to copy">' 
    html1 += chat.history[i].prompt + '</h4>\n' + chat.history[i].result + '\n\n'
   //  html2 += '<li onclick="location=this.title" title="#prompt' + i + '">' + chat.history[i].prompt
 }
 
 
 chat("list").innerHTML = md.html(html1) + '<br></div>'
//   chat("list").innerHTML = html2
 chat("right").scrollTop = chat("right").scrollHeight;
//  chat("btnSend").innerHTML = '<b>S</b>end'
 
 if (document.body.clientWidth > 800) {
   chat('prompt').select();
   chat('prompt').focus();
 } else {
   chat('prompt').value = ''
 }  
}


// submit prompt
chat.submit = () => {
 // if (chat("btnSend").innerText === 'Stop..') {
 //   chat.abort()
 //   chat("btnSend").innerText = 'Send'
 // } else {
   chat.stream( chat.prompt = chat('prompt').value )
   chat("list").innerHTML += '<h4 class=prompt>' + chat.prompt + '</h4>\n<div id=receiving>Receiving....</div>'
   chat("right").scrollTop = chat("right").scrollHeight;
   // chat("btnSend").innerText = 'Stop..'
 // }  
}

// prompt for API key if not found in localStorage
window.onload = () => {
 //chat.apiKey = localStorage.getItem('OPENAI_API_KEY');
//   chat.apiKey = 'sk-cfw9UshZFRZflMOW78P2wKMiIzi32IoGCGaxMTgOsZmrn8OG'
chat.apiKey='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';
 chat.endPoint = 'https://chat.pingshan.uk/v1/chat/completions';
// chat.endPoint='https://api.openai.com/v1/chat/completions';
 
//   if (!chat.apiKey || chat.apiKey.length < 10 ) {
//      chat.apiKey = prompt("Please input Secret API key (will store in local.storage)", "sk-");
//      localStorage.setItem('OPENAI_API_KEY', chat.apiKey)
//   }
 chat.prompts = chat('list').innerHTML
 // chat.showPrompts()
 // chat('prompt').focus();
}

// add submit hot-key of ctrl-enter
document.addEventListener('keydown', function(event) {
 if ( event.key==='Enter' && (chat.hotkey!='ctrl'||event.ctrlKey)) {
   // if (chat("btnSend").innerText === 'Send') { 
     event.preventDefault(); chat.submit(); 
   // }
 }  
});