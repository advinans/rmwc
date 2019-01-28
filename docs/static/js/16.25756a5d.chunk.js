(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{188:function(e,a,t){"use strict";t.d(a,"a",function(){return p});var n=t(5),s=t(6),c=t(7),l=t(3),r=t(8),o=t(2),m=t(0),i=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(c.a)(this,Object(l.a)(a).call(this,e))).simplifyType=t.simplifyType.bind(Object(o.a)(Object(o.a)(t))),t}return Object(r.a)(a,e),Object(s.a)(a,[{key:"simplifyType",value:function(e){var a=this;if(!e)return"undefined";if("value"in e)return e.value?"'".concat(e.value,"'"):"";if("declaration"in e)return"__type"===e.declaration.name&&e.declaration.children?"{".concat(e.declaration.children.map(function(e){return"".concat(e.name,": ").concat(a.simplifyType(e.type))}).join(", "),"}"):"";if(e.type&&"array"===e.type)return"".concat(this.simplifyType(e.elementType),"[]");if("elementType"in e)return this.simplifyType(e.elementType);if(e.name&&["any","string","number","boolean"].includes(e.name))return e.name;if(e.name&&"__type"===e.name&&"reference"===e.type)return"{}";if("reference"===e.type&&e.name){var t=e.typeArguments?"<".concat(e.typeArguments.map(function(e){return a.simplifyType(e)}).join(", "),">"):"";return"".concat(e.name).concat(t)}if("union"===e.type&&e.types&&e.types.length<=3){var n=e.types.map(function(e){return e.name}).join("");if(n.includes("true")&&n.includes("false"))return"boolean"}if("union"===e.type&&e.types&&e.types.some(function(e){return!!e.declaration})){var s=e.types.find(function(e){return!!e.declaration});if(s&&s.declaration.signatures){var c=s.declaration.signatures[0];if("__call"===c.name){var l=c.type&&c.type.name,r=c.parameters.map(function(e){return"".concat(e.name,": ").concat(a.simplifyType(e.type))});return"(".concat(r.join(", "),") => ").concat(l)}}}return"union"===e.type&&e.types?e.types.filter(function(e){return"undefined"!==e.name}).map(this.simplifyType).join(" | "):"undefined"}},{key:"getComponentDef",value:function(e){var a=this,t=this.props.docs[e],n=this.props.docs[e+"Props"],s={name:e,description:t&&t.comment&&t.comment.shortText||"",props:[]};return n&&n.children&&(s.props=n.children.map(function(e){var t=a.simplifyType(e.type);return{name:e.name,description:e.comment&&e.comment.shortText||"",required:!e.flags.isOptional,type:t.includes(" | ")&&e.flags.isOptional&&!t.startsWith("(")?"(".concat(t,")"):t}}).filter(function(e){return!e.description.toLowerCase().includes("deprecated")})),s}},{key:"render",value:function(){var e=this.props.displayName,a=this.getComponentDef(e);return m.createElement("div",{className:"document-component"},m.createElement("h2",null,a.name),m.createElement("p",null,a.description),!!a.props.length&&m.createElement("div",null,m.createElement("h3",null,"Props"),m.createElement("table",null,m.createElement("thead",null,m.createElement("tr",null,m.createElement("th",null,"Name"),m.createElement("th",null,"Type"),m.createElement("th",null,"Description"))),m.createElement("tbody",null,a.props.map(function(e){return m.createElement("tr",{key:e.name},m.createElement("td",null,m.createElement("code",null,e.name)),m.createElement("td",null,m.createElement("code",null,!e.required&&m.createElement("span",{className:"optional"},"?"),e.type)),m.createElement("td",null,e.description))})))))}}]),a}(m.Component),p=function(e){function a(e){var t;Object(n.a)(this,a),(t=Object(c.a)(this,Object(l.a)(a).call(this,e))).docs={};var s=e.src.default?e.src.default.children:[];return t.docs=s.reduce(function(e,a){return a.children&&a.children.forEach(function(a){a.flags.isExported&&(e[a.name]=a)}),e},{}),console.log(t.docs),t}return Object(r.a)(a,e),Object(s.a)(a,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){var e=this;return this.props.components.map(function(a){return m.createElement(i,{key:a,displayName:a,docs:e.docs})})}}]),a}(m.Component)},199:function(e){e.exports={id:0,name:"@rmwc/elevation",kind:0,flags:{},children:[{id:1,name:'"index"',kind:1,kindString:"External module",flags:{isExported:!0},originalName:"/Users/jamesmfriedman/Sites/rmwc/src/elevation/index.tsx",children:[{id:2,name:"ElevationProps",kind:256,kindString:"Interface",flags:{isExported:!0},children:[{id:4,name:"transition",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Allows for smooth transitions between elevations when the z value changes."},sources:[{fileName:"index.tsx",line:9,character:12}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"false"},{type:"intrinsic",name:"true"}]}},{id:5,name:"wrap",kind:1024,kindString:"Property",flags:{isExported:!0,isOptional:!0},comment:{shortText:"Allows the elevation classes to be merged onto the child component instead of creating an new DOM node."},sources:[{fileName:"index.tsx",line:11,character:6}],type:{type:"union",types:[{type:"intrinsic",name:"undefined"},{type:"intrinsic",name:"false"},{type:"intrinsic",name:"true"}]}},{id:3,name:"z",kind:1024,kindString:"Property",flags:{isExported:!0},comment:{shortText:"A number from 0 - 24 for different levels of elevation"},sources:[{fileName:"index.tsx",line:7,character:3}],type:{type:"union",types:[{type:"intrinsic",name:"number"},{type:"intrinsic",name:"string"}]}}],groups:[{title:"Properties",kind:1024,children:[4,5,3]}],sources:[{fileName:"index.tsx",line:5,character:31}]},{id:6,name:"Elevation",kind:32,kindString:"Variable",flags:{isExported:!0,isConst:!0},comment:{shortText:"The Elevation Component"},sources:[{fileName:"index.tsx",line:15,character:22}],type:{type:"reference",name:"ForwardRefExoticComponent",typeArguments:[{type:"intersection",types:[{type:"reflection",declaration:{id:7,name:"__type",kind:65536,kindString:"Type literal",flags:{}}},{type:"reference",name:"RefAttributes",typeArguments:[{type:"intrinsic",name:"any"}]}]}]},defaultValue:" componentFactory<ElevationProps>({\n  displayName: 'Elevation',\n  defaultProps: {\n    z: 0,\n    transition: false\n  },\n  classNames: (props: ElevationProps) => [\n    `mdc-elevation--z${props.z}`,\n    { 'mdc-elevation-transition': props.transition }\n  ],\n  consumeProps: ['z', 'transition'],\n  render: (props, ref, Tag) => {\n    const { wrap, ...rest } = props;\n    if (wrap) {\n      return wrapChild({ ...rest, ref });\n    }\n\n    return <Tag {...rest} ref={ref} />;\n  }\n})"}],groups:[{title:"Interfaces",kind:256,children:[2]},{title:"Variables",kind:32,children:[6]}],sources:[{fileName:"index.tsx",line:1,character:0}]}],groups:[{title:"External modules",kind:1,children:[1]}]}},235:function(e,a,t){"use strict";t.r(a),t.d(a,"attributes",function(){return d}),t.d(a,"default",function(){return k});var n=t(31),s=t(5),c=t(6),l=t(7),r=t(3),o=t(8),m=t(0),i=t.n(m),p=t(78),u=t(188),E=(t(199),t.t(199,1)),d={},k=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(l.a)(this,Object(r.a)(a).call(this,e))).state={},t}return Object(o.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h1",null,"Elevation"),i.a.createElement("blockquote",null,i.a.createElement("p",null,"Objects in material design possess similar qualities to objects in the physical world.")),i.a.createElement("ul",null,i.a.createElement("li",null,"Module ",i.a.createElement("strong",null,"@rmwc/elevation")),i.a.createElement("li",null,"Import styles:",i.a.createElement("ul",null,i.a.createElement("li",null,"import ",i.a.createElement("strong",null,"'@material/elevation/dist/mdc.elevation.css'"),";"))),i.a.createElement("li",null,"MDC Docs: ",i.a.createElement("a",{href:"https://material.io/develop/web/components/elevation/"},"https://material.io/develop/web/components/elevation/"))),i.a.createElement("div",{className:"example render-with-code"},i.a.createElement("div",{className:"run"},Object(n.a)(Array(25)).map(function(e,a){return i.a.createElement(p.a,{z:a,key:a},a,"dp")}),i.a.createElement(p.a,{z:this.state.elevation||0,transition:!0,onMouseOver:function(){return e.setState({elevation:24})},onMouseOut:function(){return e.setState({elevation:0})}},"Hover Me ",this.state.elevation||0,"dp")),i.a.createElement("div",{className:"source"},i.a.createElement("pre",{className:"language-jsx"},i.a.createElement("code",{className:"language-jsx"},i.a.createElement("span",{className:"token keyword"},"import")," ",i.a.createElement("span",{className:"token punctuation"},"{")," Elevation ",i.a.createElement("span",{className:"token punctuation"},"}")," ",i.a.createElement("span",{className:"token keyword"},"from")," ",i.a.createElement("span",{className:"token string"},"'@rmwc/elevation'"),i.a.createElement("span",{className:"token punctuation"},";"),"\n","\n",i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token comment"},"/* Showing the 25 different levels of elevation */"),i.a.createElement("span",{className:"token punctuation"},"}"),"\n",i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token punctuation"},"["),i.a.createElement("span",{className:"token operator"},"..."),i.a.createElement("span",{className:"token function"},"Array"),i.a.createElement("span",{className:"token punctuation"},"("),i.a.createElement("span",{className:"token number"},"25"),i.a.createElement("span",{className:"token punctuation"},")"),i.a.createElement("span",{className:"token punctuation"},"]"),i.a.createElement("span",{className:"token punctuation"},"."),i.a.createElement("span",{className:"token function"},"map"),i.a.createElement("span",{className:"token punctuation"},"("),i.a.createElement("span",{className:"token punctuation"},"("),"val",i.a.createElement("span",{className:"token punctuation"},",")," i",i.a.createElement("span",{className:"token punctuation"},")")," ",i.a.createElement("span",{className:"token operator"},"="),i.a.createElement("span",{className:"token operator"},">")," ",i.a.createElement("span",{className:"token punctuation"},"("),"\n","  ",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"<"),"Elevation")," ",i.a.createElement("span",{className:"token attr-name"},"z"),i.a.createElement("span",{className:"token script language-javascript"},i.a.createElement("span",{className:"token punctuation"},"="),i.a.createElement("span",{className:"token punctuation"},"{"),"i",i.a.createElement("span",{className:"token punctuation"},"}"))," ",i.a.createElement("span",{className:"token attr-name"},"key"),i.a.createElement("span",{className:"token script language-javascript"},i.a.createElement("span",{className:"token punctuation"},"="),i.a.createElement("span",{className:"token punctuation"},"{"),"i",i.a.createElement("span",{className:"token punctuation"},"}")),i.a.createElement("span",{className:"token punctuation"},">")),i.a.createElement("span",{className:"token punctuation"},"{"),"i",i.a.createElement("span",{className:"token punctuation"},"}"),"dp",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"</"),"Elevation"),i.a.createElement("span",{className:"token punctuation"},">")),"\n",i.a.createElement("span",{className:"token punctuation"},")"),i.a.createElement("span",{className:"token punctuation"},")"),i.a.createElement("span",{className:"token punctuation"},"}"),"\n","\n",i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token comment"},"/* Showing the transition prop */"),i.a.createElement("span",{className:"token punctuation"},"}"),"\n",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"<"),"Elevation"),"\n","  ",i.a.createElement("span",{className:"token attr-name"},"z"),i.a.createElement("span",{className:"token script language-javascript"},i.a.createElement("span",{className:"token punctuation"},"="),i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token keyword"},"this"),i.a.createElement("span",{className:"token punctuation"},"."),"state",i.a.createElement("span",{className:"token punctuation"},"."),"elevation ",i.a.createElement("span",{className:"token operator"},"||")," ",i.a.createElement("span",{className:"token number"},"0"),i.a.createElement("span",{className:"token punctuation"},"}")),"\n","  ",i.a.createElement("span",{className:"token attr-name"},"transition"),"\n","  ",i.a.createElement("span",{className:"token attr-name"},"onMouseOver"),i.a.createElement("span",{className:"token script language-javascript"},i.a.createElement("span",{className:"token punctuation"},"="),i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token punctuation"},"("),i.a.createElement("span",{className:"token punctuation"},")")," ",i.a.createElement("span",{className:"token operator"},"="),i.a.createElement("span",{className:"token operator"},">")," ",i.a.createElement("span",{className:"token keyword"},"this"),i.a.createElement("span",{className:"token punctuation"},"."),i.a.createElement("span",{className:"token function"},"setState"),i.a.createElement("span",{className:"token punctuation"},"("),i.a.createElement("span",{className:"token punctuation"},"{"),"elevation",i.a.createElement("span",{className:"token punctuation"},":")," ",i.a.createElement("span",{className:"token number"},"24"),i.a.createElement("span",{className:"token punctuation"},"}"),i.a.createElement("span",{className:"token punctuation"},")"),i.a.createElement("span",{className:"token punctuation"},"}")),"\n","  ",i.a.createElement("span",{className:"token attr-name"},"onMouseOut"),i.a.createElement("span",{className:"token script language-javascript"},i.a.createElement("span",{className:"token punctuation"},"="),i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token punctuation"},"("),i.a.createElement("span",{className:"token punctuation"},")")," ",i.a.createElement("span",{className:"token operator"},"="),i.a.createElement("span",{className:"token operator"},">")," ",i.a.createElement("span",{className:"token keyword"},"this"),i.a.createElement("span",{className:"token punctuation"},"."),i.a.createElement("span",{className:"token function"},"setState"),i.a.createElement("span",{className:"token punctuation"},"("),i.a.createElement("span",{className:"token punctuation"},"{"),"elevation",i.a.createElement("span",{className:"token punctuation"},":")," ",i.a.createElement("span",{className:"token number"},"0"),i.a.createElement("span",{className:"token punctuation"},"}"),i.a.createElement("span",{className:"token punctuation"},")"),i.a.createElement("span",{className:"token punctuation"},"}")),"\n",i.a.createElement("span",{className:"token punctuation"},">")),"\n","  Hover Me ",i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token keyword"},"this"),i.a.createElement("span",{className:"token punctuation"},"."),"state",i.a.createElement("span",{className:"token punctuation"},"."),"elevation ",i.a.createElement("span",{className:"token operator"},"||")," ",i.a.createElement("span",{className:"token number"},"0"),i.a.createElement("span",{className:"token punctuation"},"}"),"dp","\n",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"</"),"Elevation"),i.a.createElement("span",{className:"token punctuation"},">")),"\n")))),i.a.createElement("h2",null,"Wrapping Children"),i.a.createElement("p",null,"You can avoid adding extra DOM nodes by using the ",i.a.createElement("code",null,"wrap")," prop on elevation. This will apply the classes directly to the child component. Additionally, Elevation is simply a  ",i.a.createElement("code",null,"className"),", so you can achieve the same effect by adding ",i.a.createElement("code",null,'className="mdc-elevation--z15"'),"."),i.a.createElement("div",{className:"example render-with-code"},i.a.createElement("div",{className:"run"},i.a.createElement(p.a,{z:21,wrap:!0},i.a.createElement("i",null,"Wrapped!"))),i.a.createElement("div",{className:"source"},i.a.createElement("pre",{className:"language-jsx"},i.a.createElement("code",{className:"language-jsx"},i.a.createElement("span",{className:"token keyword"},"import")," ",i.a.createElement("span",{className:"token punctuation"},"{")," Elevation ",i.a.createElement("span",{className:"token punctuation"},"}")," ",i.a.createElement("span",{className:"token keyword"},"from")," ",i.a.createElement("span",{className:"token string"},"'@rmwc/elevation'"),i.a.createElement("span",{className:"token punctuation"},";"),"\n","\n",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"<"),"Elevation")," ",i.a.createElement("span",{className:"token attr-name"},"z"),i.a.createElement("span",{className:"token script language-javascript"},i.a.createElement("span",{className:"token punctuation"},"="),i.a.createElement("span",{className:"token punctuation"},"{"),i.a.createElement("span",{className:"token number"},"21"),i.a.createElement("span",{className:"token punctuation"},"}"))," ",i.a.createElement("span",{className:"token attr-name"},"wrap"),i.a.createElement("span",{className:"token punctuation"},">")),"\n","  ",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"<"),"i"),i.a.createElement("span",{className:"token punctuation"},">")),"Wrapped",i.a.createElement("span",{className:"token operator"},"!"),i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"</"),"i"),i.a.createElement("span",{className:"token punctuation"},">")),"\n",i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token tag"},i.a.createElement("span",{className:"token punctuation"},"</"),"Elevation"),i.a.createElement("span",{className:"token punctuation"},">")),"\n")))),i.a.createElement("div",{className:"example render-only"},i.a.createElement("div",{className:"run"},i.a.createElement(u.a,{src:E,components:["Elevation"]}))))}}]),a}(i.a.Component)}}]);
//# sourceMappingURL=16.25756a5d.chunk.js.map