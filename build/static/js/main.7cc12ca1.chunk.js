(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(7),c=t.n(l),o=t(1),i=t(2),u=t(4),s=t(3),p=(t(6),function(e){Object(u.a)(t,e);var a=Object(s.a)(t);function t(){return Object(o.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){var e=this.props,a=e.value,t=e.color,n=void 0===t?"black":t;return r.a.createElement("div",{style:{marginTop:"40px",width:a+"%",height:"20px",backgroundColor:n}})}}]),t}(r.a.Component)),h=function(e){Object(u.a)(t,e);var a=Object(s.a)(t);function t(){var e;return Object(o.a)(this,t),(e=a.call(this)).handleChangeBar1=function(a){var t=+a.target.value,n=100-t;e.setState({bar1:t,bar2:n})},e.handleChangeBar2=function(a){var t=+a.target.value,n=100-t;e.setState({bar1:n,bar2:t})},e.state={bar1:50,bar2:50},e}return Object(i.a)(t,[{key:"render",value:function(){var e=this.state,a=e.bar1,t=e.bar2;return r.a.createElement("div",null,r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Toggle Bars"),r.a.createElement("input",{type:"number",placeholder:"Barra 1",value:a,onChange:this.handleChangeBar1,min:"0",max:"100",step:"1"}),"\xa0",r.a.createElement("input",{type:"number",placeholder:"Barra 1",value:t,onChange:this.handleChangeBar2,min:"0",max:"100",step:"1"})),r.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}},r.a.createElement(p,{value:a,color:"red"}),r.a.createElement(p,{value:t,color:"green"})))}}]),t}(r.a.Component),m=document.getElementById("root");c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),m)},6:function(e,a,t){},8:function(e,a,t){e.exports=t(13)}},[[8,1,2]]]);
//# sourceMappingURL=main.7cc12ca1.chunk.js.map