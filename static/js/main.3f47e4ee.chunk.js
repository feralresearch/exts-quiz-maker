(this["webpackJsonpexts-quizmaker"]=this["webpackJsonpexts-quizmaker"]||[]).push([[0],{24:function(e,t,n){e.exports={container:"Collapsable_container__3yksG",title:"Collapsable_title__3aKDL",collapsed:"Collapsable_collapsed__2adVV",uncollapsed:"Collapsable_uncollapsed__2ihT4"}},64:function(e,t,n){},65:function(e,t,n){},68:function(e){e.exports=JSON.parse('{"fileName":"new-quiz.md","data":[{"type":"SingleChoiceQuizz","permanentId":"quiz-singlechoicequizz-0","json":{"description_md":"NEW QUESTION","success_message_md":null,"answers_attributes":[{"permanent_id":"answer-0","text_md":"NEW ANSWER","hint_md":""}]}}]}')},7:function(e,t,n){e.exports={container:"Home_container__1s89M",innerContainer:"Home_innerContainer__KPFe8",questionList:"Home_questionList__3GBLv",input:"Home_input__2oFaL",navigation:"Home_navigation__1-Q99",button:"Home_button__2fSRs",title:"Home_title__1RtlI",questionBlock:"Home_questionBlock__3BNZF",answerBlock:"Home_answerBlock__2jUv7"}},96:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=(n(64),n(56)),c=n(3),o=(n(65),n(32)),s=n(14),l=n(13),d=n(7),u=n.n(d),p=n(31),m=n(105),f=n(1),j=Object(m.a)((function(e){return e.accepts}),{drop:function(e,t){e.onDrop&&e.onDrop(e,t)}},(function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver(),canDrop:t.canDrop()}}))((function(e){var t=e.children,n=e.style,a=e.canDrop,i=e.isOver,r=e.connectDropTarget,c=Object(s.a)({active:{opacity:.75},inactive:{}},n),o=a&&i;return r(Object(f.jsx)("div",{style:o?c.active:c.inactive,children:t}))})),b="MultipleChoiceQuizz",O="SingleChoiceQuizz",v="QUESTION",h="ANSWER",x={description_md:"Description",success_message_md:"Success Message",text_md:"Text",hint_md:"Hint",type:"Quiz Type",MultipleChoiceQuizz:"Multiple Choice",SingleChoiceQuizz:"Single Choice"},g=n(68),y={loadQuizDataFrom:function(e,t){var n=new FileReader;n.onload=function(e){var n=e.target.result.replace(/(\r\n|\n|\r)/gm,""),a=n.replace(/(data-json=['|"]).*?}]}(['|"])/gm,""),i=n.match(/(?<=json=['|"]).*?}]}(?=['|"])/gm);if(!i)return window.alert("I don't know how to deal with this - is it valid quiz content?"),null;var r=(new DOMParser).parseFromString(a,"text/html"),c=[];Array.from(r.getElementsByTagName("div")).forEach((function(e,t){var n=i[t].replaceAll("&quot;",'"').replaceAll("'","&apos;");c.push({type:e.dataset.type,permanentId:e.dataset.permanentId,json:JSON.parse(n)})})),t(c)},n.onerror=function(e){console.error(e)},n.readAsText(e,"UTF-8")},saveQuizDataTo:function(e){var t=e.fileName,n=e.data,a=e.legacyFormat,i=void 0!==a&&a,r="";n.forEach((function(e){var t=JSON.stringify(e.json).replaceAll("'","&apos;");r+="<div\n data-type='".concat(e.type,"'\n")+"data-permanent-id='".concat(e.permanentId,"'\n")+"data-json='".concat(t,"'>\n")+"</div>\n"})),i&&(r=(r=r.replace(/(\r\n|\n|\r)/gm,"")).replaceAll("'",'"')),function(e,t,n){var a=new Blob([t],{type:n});if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(a,e);else{var i=document.createElement("a"),r=URL.createObjectURL(a);i.href=r,i.download=e,document.body.appendChild(i),i.click(),setTimeout((function(){document.body.removeChild(i),window.URL.revokeObjectURL(r)}),0)}}(t||"new_quiz.md",r)},_findAnswer:function(e,t,n){var a=e.data.indexOf(e.data.find((function(e){return e.permanentId===t}))),i=e.data[a].json.answers_attributes.indexOf(e.data[a].json.answers_attributes.find((function(e){return e.permanent_id===n})));return{parentIndex:a,index:i,answer:e.data[a].json.answers_attributes[i]}},_create:function(){return JSON.parse(JSON.stringify(g))},_fixIds:function(e){if(0!==e.data.length){var t=e.data[0].permanentId.split("-");return t.splice(-1,1),t=t.join("-"),e.data.forEach((function(e,n){e.permanentId="".concat(t,"-").concat(n),e.json.answers_attributes.forEach((function(e,t){e.permanent_id="answer-".concat(t)}))})),e}},merge:function(e,t){var n=Object(s.a)({},e);if("allowMultiple"===t.name){var a=e.data.indexOf(e.data.find((function(e){return e.permanentId===t.id})));e.data[a].type=t.value?b:O,e.data[a].type===b?e.data[a].permanentId=e.data[a].permanentId.replace("single","multiple"):e.data[a].permanentId=e.data[a].permanentId.replace("multiple","single")}else if(t.parentId){y._findAnswer(n,t.parentId,t.id).answer[t.name]=t.value}else{var i=e.data.indexOf(e.data.find((function(e){return e.permanentId===t.id})));n.data[i].json[t.name]=t.value}return n},delete:function(e,t){var n=Object(s.a)({},e);if(t.parentId){var a=y._findAnswer(n,t.parentId,t.id);n.data[a.parentIndex].json.answers_attributes.splice(a.index,1)}else{var i=e.data.indexOf(e.data.find((function(e){return e.permanentId===t.id})));n.data.splice(i,1)}return y._fixIds(n)},add:function(e,t){if(!e)return y._create();var n=Object(s.a)({},e);if(t.parentId){JSON.parse(JSON.stringify(g));var a=JSON.parse(JSON.stringify(g.data[0].json.answers_attributes[0])),i=e.data.indexOf(e.data.find((function(e){return e.permanentId===t.parentId})));n.data[i].json.answers_attributes.unshift(a)}else{var r=JSON.parse(JSON.stringify(g.data[0]));n.data.unshift(r)}return y._fixIds(n)}},w=y,_=n(103),I=n(104),C=n(33),k={container:{display:"flex",flexDirection:"column",marginBottom:"1rem"},label:{fontSize:".8rem"},display:{fontWeight:200,display:"flex",alignItems:"center",color:"grey",border:"1px solid #eeeeee",fontSize:"1rem",width:"100%",minHeight:"2rem",lineHeight:"1rem",padding:".2rem",background:"white"},inputFocused:{display:"none",fontSize:"1rem",width:"100%",minHeight:"4rem",color:"red"}},N=function(e){var t=e.id,n=e.name,i=e.value,r=e.onChange,c=e.parentId,o=Object(a.useState)(!1),s=Object(l.a)(o,2),d=s[0],u=s[1],p=Object(a.useRef)(null),m=Object(a.useRef)(null);return p.current&&(d?(p.current.style.display="block",m.current.style.display="none",p.current.focus()):(p.current.style.display="none",m.current.style.display="flex",p.current.blur())),Object(f.jsxs)("div",{style:k.container,children:[Object(f.jsx)("div",{style:k.label,children:x[n]?x[n]:n}),Object(f.jsxs)("div",{style:k.content,children:[Object(f.jsx)("textarea",{ref:p,onClick:function(){return u(!0)},onBlur:function(){return u(!1)},"data-permanent-id":t,"data-parent-id":c,onChange:function(e){r({parentId:c,id:t,value:e.target.value,name:n,originalEvent:e})},name:n,value:i,style:k.inputFocused}),Object(f.jsx)("div",{ref:m,onClick:function(){u(!0)},style:k.display,children:Object(f.jsx)(C.a,{children:i})})]})]},t)},S=function(e){var t=e.id,n=e.parentId,a=e.name,i=e.onChange,r=e.value,c=e.options,o=void 0===c?["YES","NO"]:c;return Object(f.jsx)("div",{style:{color:r?o.color[0]:o.color[1]},onClick:function(e){return i({parentId:n,id:t,name:a,value:!r,originalEvent:e})},children:r?o.display[0]:o.display[1]})},z=function(e){var t=e.parentId,n=e.data,a=(e.onAdd,e.onDelete),i=e.onChange,r=e.moveAnswer,c=e.findAnswer,o=c(n.permanent_id).index,s=Object(_.a)((function(){return{type:h,item:{permanent_id:n.permanent_id,originalIndex:o},collect:function(e){return{isDragging:e.isDragging()}}}}),[n,o,r]),d=Object(l.a)(s,2),u=d[0].isDragging,p=d[1],m=Object(I.a)((function(){return{accept:h,hover:function(e){var t=e.permanent_id;if(t!==n.permanent_id){var a=c(n.permanent_id).index;r(t,a)}}}}),[c,r]),j=Object(l.a)(m,2)[1],b=u?.1:1;return Object(f.jsxs)("div",{ref:function(e){return p(j(e))},style:{border:"1px dashed lightgray",padding:"0.5rem 1rem",marginBottom:".5rem",backgroundColor:"white",cursor:"move",opacity:b},children:[Object(f.jsxs)("div",{style:{textAlign:"right",display:"flex",alignItems:"center"},children:[Object(f.jsx)("div",{style:{flexGrow:1}}),Object(f.jsx)("div",{style:{marginRight:"1rem"},children:Object(f.jsx)(S,{parentId:t,id:n.permanent_id,name:"correct",value:n.correct,onChange:i,options:{display:["CORRECT","INCORRECT"],color:["darkgreen","red"]}})}),Object(f.jsx)("div",{children:Object(f.jsx)("input",{value:"Delete",type:"button",onClick:function(){return a({action:"delete",item:"answer",parentId:t,id:n.permanent_id})}})})]}),Object(f.jsx)("div",{children:Object(f.jsx)(N,{id:n.permanent_id,parentId:t,name:"text_md",value:n.text_md?n.text_md:"",onChange:i})}),Object(f.jsx)("div",{children:Object(f.jsx)(N,{id:n.permanent_id,parentId:t,name:"hint_md",value:n.hint_md?n.hint_md:"",onChange:i})})]})},D=n(52),A=n(53),E=n(60),L=n(59),q=n(24),T=n.n(q),R=function(e){Object(E.a)(n,e);var t=Object(L.a)(n);function n(e){var a;return Object(D.a)(this,n),(a=t.call(this,e)).toggleState=function(){a.setState({isOpen:!a.state.isOpen})},a.titleClick=function(){a.props.clickableTitle&&a.toggleState()},a.state={isOpen:a.props.isOpen},a}return Object(A.a)(n,[{key:"render",value:function(){return Object(f.jsxs)("div",{style:Object(s.a)({},this.props.style),className:T.a.container,children:[Object(f.jsxs)("div",{onClick:this.titleClick,className:T.a.title,children:[Object(f.jsx)("i",{onClick:this.toggleState,style:{fontSize:"1rem",marginRight:"0.5rem",marginLeft:"0.5rem",opacity:"0.5",whiteSpace:"nowrap"},className:this.state.isOpen?"fas fa-chevron-circle-down":"fas fa-chevron-circle-right"}),this.props.title]}),Object(f.jsx)("div",{className:this.state.isOpen?T.a.uncollapsed:T.a.collapsed,children:this.props.children})]})}}]),n}(a.Component),B=R;R.defaultProps={isOpen:!1,clickableTitle:!0};var Q=Object(a.memo)((function(e){var t=e.data,n=e.onDelete,i=e.onAdd,r=e.onChange,c=e.moveQuizItem,s=e.findQuizItem,d=e.onUpdateData,p=s(t.permanentId).index,m=function(e){var n=!e.value,a=t.json.answers_attributes.filter((function(e){return e.correct})).length;n&&a>1?window.alert("You have requested to convert from a multiple-select to a single-select question, but you have more than one answer marked 'correct'. Fix the answers first."):r(e)},j=Object(a.useCallback)((function(e){var n=t.json.answers_attributes.find((function(t){return t.permanent_id===e}));if(n)return{answer:n,index:t.json.answers_attributes.indexOf(n)};console.error("findAnswer: Cannot find ".concat(e))}),[t]),O=Object(a.useCallback)((function(e,n){var a=j(e).index,i=Object(o.a)(t.json.answers_attributes);i.splice(a,0,i.splice(n,1)[0]),d({parentId:t.permanentId,data:i})}),[j,d,t]),h=Object(_.a)((function(){return{type:v,item:{permanentId:t.permanentId,originalIndex:p},collect:function(e){return{isDragging:e.isDragging()}}}}),[t,p,c]),x=Object(l.a)(h,2),g=x[0].isDragging,y=x[1],w=Object(I.a)((function(){return{accept:v,hover:function(e){var n=e.permanentId;if(n!==t.permanentId){var a=s(t.permanentId).index;c(n,a)}}}}),[s,c]),k=Object(l.a)(w,2)[1],D=[];Object.keys(t.json).forEach((function(e){if("answers_attributes"===e){var a=t.type===b;D.push(Object(f.jsx)("div",{children:"Answers"},"title")),D.push(Object(f.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(f.jsx)("div",{style:{flexGrow:1},children:Object(f.jsx)(S,{id:t.permanentId,name:"allowMultiple",value:a,onChange:m,options:{display:["ALLOW MULTIPLE: YES","ALLOW MULTIPLE: NO"],color:["black","black"]}})}),Object(f.jsx)("div",{children:Object(f.jsx)("input",{value:"Add",type:"button",onClick:function(){return i({action:"add",item:"answer",parentId:t.permanentId})}})})]},"".concat(t.permanentId,"_type"))),t.json.answers_attributes.forEach((function(e){D.push(Object(f.jsx)(z,{moveAnswer:O,findAnswer:j,parentId:t.permanentId,data:e,onChange:r,onDelete:n,onAdd:i,allowMultiple:a},e.permanent_id))}))}else D.push(Object(f.jsx)("div",{children:Object(f.jsx)(N,{id:t.permanentId,name:e,onChange:r,value:t.json[e]?t.json[e]:""})},"".concat(e,"_").concat(t.permanentId)))}));var A=g?.5:1;return Object(f.jsx)("div",{ref:function(e){return y(k(e))},className:u.a.questionBlock,style:{opacity:A},children:Object(f.jsx)(B,{title:Object(f.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"},children:[Object(f.jsx)("div",{children:Object(f.jsx)(C.a,{children:t.json.description_md})}),Object(f.jsx)("div",{style:{flexGrow:1}}),Object(f.jsx)("div",{children:Object(f.jsx)("input",{value:"Delete",type:"button",onClick:function(e){e.stopPropagation(),n({action:"delete",item:"question",id:t.permanentId})}})})]}),children:Object(f.jsx)("div",{className:u.a.answerBlock,children:D})})})})),F=p.b.FILE,J=["text/markdown"],M=Object(a.memo)((function(){var e=Object(a.useState)(),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useCallback)((function(e){window.confirm("Clear current quiz? (you should save first)")&&(r(null),sessionStorage.removeItem("quizData"))}),[]),d=Object(a.useCallback)((function(e){r(e),sessionStorage.setItem("quizData",JSON.stringify(e))}),[]),p=Object(a.useCallback)((function(e){d(w.merge(n,e))}),[n,d]),m=Object(a.useCallback)((function(e){d(w.add(n,e))}),[n,d]),b=Object(a.useCallback)((function(e){window.confirm("Do you really want to delete?")&&d(w.delete(n,e))}),[n,d]),O=Object(a.useCallback)((function(e){var t=Object(s.a)({},n);t.data[n.data.indexOf(n.data.find((function(t){return t.permanentId===e.parentId})))].json.answers_attributes=e.data,d(t)}),[n,d]),h=Object(a.useMemo)((function(){return[F]}),[]),x=Object(a.useCallback)((function(e){e||console.error("findQuizItem: Cannot find undefined");var t=n.data.filter((function(t){return"".concat(t.permanentId)===e}))[0];return{quizItem:t,index:n.data.indexOf(t)}}),[n]),g=Object(a.useCallback)((function(e,t){var a=x(e).index,i=Object(o.a)(n.data);i.splice(a,0,i.splice(t,1)[0]),d({fileName:n.fileName,data:i})}),[x,n,d]),y=Object(I.a)((function(){return{accept:v}})),_=Object(l.a)(y,2)[1];return Object(a.useEffect)((function(){try{var e=JSON.parse(sessionStorage.getItem("quizData"));e&&(console.warn("Loading saved data"),d(e))}catch(t){}}),[d]),Object(f.jsx)(j,{accepts:h,onDrop:function(e,t){!t||n&&!window.confirm("Replace current quiz?")||(t.getItem().files.length>1&&console.warn("ALLOWMULTIPLE IS FALSE: Accepting only first file"),[t.getItem().files[0]].forEach((function(e){if(!J.includes(e.type))return console.warn("REJECT: ".concat(e.type,". Allowed: ").concat(JSON.stringify(J))),null;w.loadQuizDataFrom(e,(function(t){d({fileName:e.name,data:t})}))})))},children:n&&Object(f.jsxs)(i.a.Fragment,{children:[Object(f.jsxs)("div",{className:u.a.navigation,children:[Object(f.jsx)("div",{className:u.a.title,children:n.fileName}),Object(f.jsx)("div",{style:{flexGrow:1}}),Object(f.jsx)("div",{className:u.a.button,children:Object(f.jsx)("input",{onClick:function(){return w.saveQuizDataTo({fileName:n.fileName,data:n.data,legacyFormat:!0})},value:"save: exts format",type:"button"})}),Object(f.jsx)("div",{className:u.a.button,children:Object(f.jsx)("input",{onClick:function(){return w.saveQuizDataTo({fileName:n.fileName,data:n.data,legacyFormat:!1})},value:"save",type:"button"})}),Object(f.jsx)("div",{className:u.a.button,children:Object(f.jsx)("input",{onClick:function(){return c()},value:"clear",type:"button"})})]}),Object(f.jsxs)("div",{className:u.a.container,children:[Object(f.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(f.jsx)("div",{style:{flexGrow:1}}),Object(f.jsx)("div",{children:Object(f.jsx)("input",{value:"Add",type:"button",onClick:function(e){e.stopPropagation(),m({action:"add",item:"question"})}})})]}),Object(f.jsx)("div",{className:u.a.innerContainer,children:Object(f.jsx)("div",{style:{marginBottom:"2rem",fontWeight:900,fontSize:"3rem"},children:Object(f.jsx)("div",{className:u.a.questionList,children:Object(f.jsx)("div",{ref:_,style:{fontSize:"1rem"},children:n.data.map((function(e){return Object(f.jsx)(Q,{onUpdateData:O,data:e,onChange:p,onAdd:m,onDelete:b,moveQuizItem:g,findQuizItem:x},e.permanentId.replace("single","").replace("multiple",""))}))})})},n.fileName)})]})]})||Object(f.jsx)("div",{className:u.a.container,children:Object(f.jsx)("div",{className:u.a.innerContainer,children:Object(f.jsxs)("div",{style:{textAlign:"center",fontSize:"1rem",margin:"auto",border:"1px solid black",background:"white",padding:"4rem"},children:["Drop a quiz .md file here to get started or"," ",Object(f.jsx)("div",{style:{textDecoration:"underline"},onClick:function(e){e.stopPropagation(),m({action:"add",item:"question"})},children:"Create New"})]})})})})})),H=n(57),U=n(58);var W=function(){return Object(f.jsxs)("div",{style:P.container,children:[Object(f.jsx)("div",{style:{width:"10rem",flexGrow:"1"},children:"Quiz Maker"}),Object(f.jsx)("div",{style:P.infoBlock})]})},P={container:{color:"#d30a09",fontFamily:"Mulish",textTransform:"uppercase",backgroundColor:"white",position:"fixed",width:"100%",textAlign:"left",padding:"1rem",display:"flex",flexDirection:"row",fontSize:"1.5rem",alignItems:"center",borderTop:".2rem solid #d30a09",borderBottom:".01rem solid #dee2e6"},infoLabel:{fontWeight:200,marginRight:".5rem"},infoBlock:{textAlign:"right",flexDirection:"column",width:"12rem",fontSize:"0.5rem",fontWeight:900},infoRow:{display:"flex",flexDirection:"row",marginRight:"2rem"},error:{color:"orange",fontSize:".9rem",display:"flex",flexDirection:"row",marginRight:"2rem"}},G=n(55),Y=n(18);G.a.add(Y.c,Y.b,Y.f,Y.a,Y.e,Y.d);var K=function(){return Object(f.jsx)(r.a,{children:Object(f.jsx)(H.a,{options:U.a,children:Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(W,{}),Object(f.jsx)(c.c,{children:Object(f.jsx)(c.a,{path:"/",component:M})})]})})})},V=n(30);n.n(V).a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(K,{})}),document.getElementById("root"))}},[[96,1,2]]]);
//# sourceMappingURL=main.3f47e4ee.chunk.js.map