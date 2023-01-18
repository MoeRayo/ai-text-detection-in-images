(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{283:function(t,e,n){"use strict";n.r(e);n(79),n(46),n(47),n(31),n(15),n(32),n(28),n(135),n(38),n(29),n(80),n(33),n(48);function r(t){var e=t.getAll("photos").map((function(t){return(e=t,new Promise((function(t,n){var r=new FileReader,img=document.createElement("img");r.onload=function(){img.src=r.result,t(function(img){var canvas=document.createElement("canvas");return canvas.width=img.width,canvas.height=img.height,canvas.getContext("2d").drawImage(img,0,0),img.src}(img))},r.readAsDataURL(e)}))).then((function(img){return{id:img,originalName:t.name,fileName:t.name,url:img}}));var e}));return Promise.all(e)}n(63);var o={data:function(){return{uploadedFiles:[],uploadError:null,currentStatus:null,uploadFieldName:"photos",ocr:"adv_ocr",preset:"eupk2nrn",cloudName:"moerayo",detectedText:"",shareText:"Copy Text"}},computed:{isInitial:function(){return 0===this.currentStatus},isSaving:function(){return 1===this.currentStatus},isSuccess:function(){return 2===this.currentStatus},isFailed:function(){return 3===this.currentStatus}},methods:{reset:function(){this.currentStatus=0,this.uploadedFiles=[],this.uploadError=null},save:function(t){var e,n=this;this.currentStatus=1,r(t).then((e=2e3,function(t){return new Promise((function(n){return setTimeout((function(){return n(t)}),e)}))})).then((function(t){n.uploadedFiles=[].concat(t),n.currentStatus=2})).catch((function(t){n.uploadError=t.response,n.currentStatus=3}))},filesChange:function(t,e){var n=new FormData;e.length&&(Array.from(Array(e.length).keys()).map((function(r){n.append(t,e[r],e[r].name)})),this.save(n))},prepareFormData:function(){this.newFormData=new FormData,this.newFormData.append("upload_preset",this.preset),this.newFormData.append("file",this.uploadedFiles[0].url)},detectText:function(){var t=this;this.prepareFormData();var e={url:"https://api.cloudinary.com/v1_1/".concat(this.cloudName,"/image/upload"),method:"POST",data:this.newFormData};this.$axios(e).then((function(e){t.results=e.data;var n=e.data.info.ocr.adv_ocr.data[0].textAnnotations.map((function(t,i){return i>0&&t.description.replace(/[^0-9a-z]/gi,"")})).filter((function(t){return"string"==typeof t})).join(" ");t.detectedText=n})).catch((function(t){return t}))},copyText:function(){var t=this;navigator.clipboard.writeText(this.detectedText).then((function(){return t.shareText="Copied!"})).catch((function(t){return t}))}},mounted:function(){this.reset()}},l=n(61),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex flex-column flex-row-ns pa3 calisto bg-black-05 vh-100"},[n("div",{staticClass:"w-50-ns w-100 ph3"},[t.isInitial||t.isSaving?n("form",{attrs:{enctype:"multipart/form-data"}},[n("h2",[t._v("Upload Image")]),t._v(" "),n("div",{staticClass:"b--dashed bw1 b--light-purple pa3 hover-bg-black-10 bg-animate pointer relative h4"},[n("input",{staticClass:"input-file absolute w-100 h4 pointer o-0",attrs:{type:"file",accept:"image/*",name:t.uploadFieldName,disabled:t.isSaving},on:{change:function(e){t.filesChange(e.target.name,e.target.files),t.fileCount=e.target.files.length}}}),t._v(" "),t.isInitial?n("p",{staticClass:"tc f4"},[t._v("\n          Drag your image here to begin"),n("br"),t._v(" or click to browse\n        ")]):t._e(),t._v(" "),t.isSaving?n("p",{staticClass:"tc f4"},[t._v("\n          Uploading image...\n        ")]):t._e()])]):t._e(),t._v(" "),t.isSuccess?n("div",[n("h2",[t._v("Image upload is successful.")]),t._v(" "),n("button",{staticClass:"bg-light-purple pa3 mv4 link dim br2 pointer ba b--light-blue dib white",on:{click:function(e){return e.preventDefault(),t.reset()}}},[t._v("Upload again")]),t._v(" "),t._l(t.uploadedFiles,(function(t){return n("div",[n("img",{attrs:{src:t.url,alt:t.originalName}})])})),t._v(" "),n("button",{staticClass:"bg-light-blue pa3 mv4 link dim br2 pointer ba b--light-blue dib",on:{click:function(e){return e.preventDefault(),t.detectText.apply(null,arguments)}}},[t._v("Extract Text")])],2):t._e(),t._v(" "),t.isFailed?n("div",[n("h2",[t._v("Uploaded failed.")]),t._v(" "),n("button",{on:{click:function(e){return e.preventDefault(),t.reset()}}},[t._v("Try again")]),t._v(" "),n("pre",[t._v(t._s(t.uploadError))])]):t._e()]),t._v(" "),n("section",{staticClass:"w-40-l w-50-m w-100 ph3"},[n("h2",[t._v("Extracted Text")]),t._v(" "),n("div",{staticClass:"bg-light-blue br3 h-auto pa3 f4 lh-copy"},[t._v("\n      "+t._s(t.detectedText)+"\n    ")]),t._v(" "),n("button",{staticClass:"bg-black pa3 mv4 link dim br2 pointer ba b--black dib white",on:{click:t.copyText}},[t._v(t._s(t.shareText))])])])}),[],!1,null,null,null);e.default=component.exports}}]);