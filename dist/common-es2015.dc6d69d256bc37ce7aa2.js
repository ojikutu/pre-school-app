(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{Fmiz:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var s=n("fXoL"),i=n("3Pt+"),a=n("XNiG"),r=n("1G5W"),o=n("HAZY"),l=n("tzug"),c=n("1kSV"),m=n("oZhZ"),d=n("ofXK");function u(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"button",11),s["\u0275\u0275text"](1,"Submit"),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275nextContext"]();s["\u0275\u0275property"]("disabled",!e.classForm.valid)}}function b(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"button",12),s["\u0275\u0275element"](1,"span",13),s["\u0275\u0275text"](2," Processing... "),s["\u0275\u0275elementEnd"]())}let h=(()=>{class e{constructor(e,t,n){this.apiAuthenticationService=e,this.notificationService=t,this.modalService=n,this.createdClass=new s.EventEmitter,this.formSubmitted=!1,this.ngUnsubscribe$=new a.a,this.classForm=new i.FormGroup({_name:new i.FormControl("",i.Validators.required),_teacher_email:new i.FormControl("")}),this.ngOnDestroy=()=>{this.ngUnsubscribe$.next(),this.ngUnsubscribe$.complete()}}ngOnInit(){}submitForm(){this.classForm.valid&&(this.formSubmitted=!0,this.classForm.value._school_uid=this.schoolUid._uid,this.apiAuthenticationService.create("class",this.classForm.value).pipe(Object(r.a)(this.ngUnsubscribe$)).subscribe(e=>{201===e.statusCode&&(this.notificationService.success({_title:"Operation successfully.",_message:"New class created successfully."}),this.createdClass.emit(e.data),this.classForm.value._teacher_email&&setTimeout(()=>{this.apiAuthenticationService.create("teacher",{_email:this.classForm.value._teacher_email,_class_uid:e.data._uid,_school_uid:this.schoolUid._uid}).pipe(Object(r.a)(this.ngUnsubscribe$)).subscribe(e=>{201===e.statusCode&&(this.notificationService.success({_title:"Email Invite.",_message:"Email invite sent to "+this.classForm.value._teacher_email}),this.classForm.reset(),this.modalService.dismissAll())})},5e3),this.classForm.value._teacher_email||(this.classForm.reset(),this.modalService.dismissAll()))},e=>console.log(e)),this.formSubmitted=!1)}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](o.a),s["\u0275\u0275directiveInject"](l.a),s["\u0275\u0275directiveInject"](c.g))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-create-class"]],inputs:{schoolUid:"schoolUid"},outputs:{createdClass:"createdClass"},decls:17,vars:4,consts:[["novalidate","",1,"needs-validation",3,"formGroup","validSubmit"],[1,"form-row"],[1,"col-md-12","mb-12","form-group"],["for","name"],[1,"text-danger"],["formControlName","_name","type","text","id","name","placeholder","Class Name","required","",1,"form-control"],["for","teacher"],["formControlName","_teacher_email","type","text","id","teacher","placeholder","Teacher Email",1,"form-control"],[1,"btn-actions-pane-right"],["type","submit","class","btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg",3,"disabled",4,"ngIf"],["class","btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg","type","button","disabled","",4,"ngIf"],["type","submit",1,"btn-wide","btn-pill","btn-shadow","btn-hover-shine","btn","btn-primary","btn-lg",3,"disabled"],["type","button","disabled","",1,"btn-wide","btn-pill","btn-shadow","btn-hover-shine","btn","btn-primary","btn-lg"],["role","status","aria-hidden","true",1,"spinner-grow","spinner-grow-sm"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"h5"),s["\u0275\u0275text"](1),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](2,"form",0),s["\u0275\u0275listener"]("validSubmit",(function(){return t.submitForm()})),s["\u0275\u0275elementStart"](3,"div",1),s["\u0275\u0275elementStart"](4,"div",2),s["\u0275\u0275elementStart"](5,"label",3),s["\u0275\u0275text"](6,"Class Name"),s["\u0275\u0275elementStart"](7,"span",4),s["\u0275\u0275text"](8,"*"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](9,"input",5),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"div",2),s["\u0275\u0275elementStart"](11,"label",6),s["\u0275\u0275text"](12,"Invite Teacher"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275element"](13,"input",7),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](14,"div",8),s["\u0275\u0275template"](15,u,2,1,"button",9),s["\u0275\u0275template"](16,b,3,0,"button",10),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](1),s["\u0275\u0275textInterpolate1"]("School Name - ",t.schoolUid._name,""),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("formGroup",t.classForm),s["\u0275\u0275advance"](13),s["\u0275\u0275property"]("ngIf",!t.formSubmitted),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",t.formSubmitted))},directives:[i["\u0275angular_packages_forms_forms_y"],i.NgControlStatusGroup,i.FormGroupDirective,m.b,m.a,i.DefaultValueAccessor,m.d,i.NgControlStatus,i.FormControlName,i.RequiredValidator,d.NgIf],styles:[""]}),e})()},eC24:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var s=n("fXoL");let i=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-content-loader"]],decls:5,vars:0,consts:[[1,"loader"],[1,"ball-scale-multiple"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",0),s["\u0275\u0275elementStart"](1,"div",1),s["\u0275\u0275element"](2,"div"),s["\u0275\u0275element"](3,"div"),s["\u0275\u0275element"](4,"div"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]())},styles:[""]}),e})()}}]);