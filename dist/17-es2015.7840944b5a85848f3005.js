(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{KOxN:function(e,t,n){"use strict";n.r(t),n.d(t,"SchoolDetailsModule",(function(){return E}));var o=n("ofXK"),r=n("tyNb"),a=n("XNiG"),i=n("1G5W"),s=n("3Pt+"),l=n("MJdi"),d=n("tzug"),m=n("HAZY"),c=n("fXoL"),u=n("NVKa"),p=n("eC24"),h=n("oZhZ");function f(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"div",6),c["\u0275\u0275element"](1,"app-content-loader"),c["\u0275\u0275elementEnd"]())}function _(e,t){if(1&e&&(c["\u0275\u0275elementStart"](0,"button",27),c["\u0275\u0275text"](1,"Update"),c["\u0275\u0275elementEnd"]()),2&e){const e=c["\u0275\u0275nextContext"](2);c["\u0275\u0275property"]("disabled",!e.form.valid)}}function b(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"button",28),c["\u0275\u0275element"](1,"span",29),c["\u0275\u0275text"](2," Updating Details... "),c["\u0275\u0275elementEnd"]())}function v(e,t){if(1&e){const e=c["\u0275\u0275getCurrentView"]();c["\u0275\u0275elementStart"](0,"div",7),c["\u0275\u0275elementStart"](1,"h3"),c["\u0275\u0275text"](2,"School Details"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](3,"form",8),c["\u0275\u0275listener"]("validSubmit",(function(){return c["\u0275\u0275restoreView"](e),c["\u0275\u0275nextContext"]().submitForm()})),c["\u0275\u0275elementStart"](4,"div",9),c["\u0275\u0275elementStart"](5,"div",10),c["\u0275\u0275elementStart"](6,"div",11),c["\u0275\u0275elementStart"](7,"label",12),c["\u0275\u0275text"](8,"School Name"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275element"](9,"input",13),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](10,"div",14),c["\u0275\u0275elementStart"](11,"div",10),c["\u0275\u0275elementStart"](12,"div",11),c["\u0275\u0275elementStart"](13,"label",15),c["\u0275\u0275text"](14,"Street"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275element"](15,"input",16),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](16,"div",17),c["\u0275\u0275elementStart"](17,"div",11),c["\u0275\u0275elementStart"](18,"label",18),c["\u0275\u0275text"](19,"State"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275element"](20,"input",19),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](21,"div",17),c["\u0275\u0275elementStart"](22,"div",11),c["\u0275\u0275elementStart"](23,"label",20),c["\u0275\u0275text"](24,"Zip Code"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275element"](25,"input",21),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](26,"div",17),c["\u0275\u0275elementStart"](27,"div",11),c["\u0275\u0275elementStart"](28,"label",22),c["\u0275\u0275text"](29,"Country"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275element"](30,"input",23),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](31,"div",24),c["\u0275\u0275template"](32,_,2,1,"button",25),c["\u0275\u0275template"](33,b,3,0,"button",26),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()}if(2&e){const e=c["\u0275\u0275nextContext"]();c["\u0275\u0275advance"](3),c["\u0275\u0275property"]("formGroup",e.form),c["\u0275\u0275advance"](29),c["\u0275\u0275property"]("ngIf",!e.formSubmitted),c["\u0275\u0275advance"](1),c["\u0275\u0275property"]("ngIf",e.formSubmitted)}}const S=[{path:"",component:(()=>{class e{constructor(e,t,n,o,r){this.classService=e,this.activatedRoute=t,this.router=n,this.notificationService=o,this.apiAuthenticationService=r,this.subheading="Settings",this.icon="pe-7s-display2 icon-gradient bg-mean-fruit",this.ngUnsubscribe$=new a.a,this.schoolDetails={_uid:null,_name:null,_address:{_country:null,_state:null,_zipCode:null,_street:null}},this.form=new s.FormGroup({_name:new s.FormControl("",s.Validators.required),_address:new s.FormGroup({_country:new s.FormControl(""),_state:new s.FormControl(""),_zipCode:new s.FormControl(""),_street:new s.FormControl("")})}),this.validateSchoolUid=()=>{this.classService.schoolDetails(this.schoolUid).pipe(Object(i.a)(this.ngUnsubscribe$)).subscribe(e=>{200===e.statusCode&&e.data._details._recordsFound>0?(this.schoolDetails={_uid:e.data._data[0]._source._uid,_name:e.data._data[0]._source._name,_address:{_country:e.data._data[0]._source._address._country,_state:e.data._data[0]._source._address._state,_zipCode:e.data._data[0]._source._address._zipCode,_street:e.data._data[0]._source._address._street}},this.form.setValue({_name:e.data._data[0]._source._name,_address:{_country:e.data._data[0]._source._address._country,_state:e.data._data[0]._source._address._state,_zipCode:e.data._data[0]._source._address._zipCode,_street:e.data._data[0]._source._address._street}}),this.dataFetching=!0):(this.notificationService.error({_title:"Error Occurred.",_message:"No school profile found."}),this.router.navigate(["/app/school"]))},()=>{this.notificationService.error({_title:"Error Occurred.",_message:"No school profile found."}),this.router.navigate(["/app/school"])})}}ngOnInit(){this.schoolUid=this.activatedRoute.snapshot.params.id,this.validateSchoolUid()}submitForm(){this.form.valid&&(this.formSubmitted=!0,this.form.value._uid=this.schoolDetails._uid,this.apiAuthenticationService.patch("school",this.form.value).pipe(Object(i.a)(this.ngUnsubscribe$)).subscribe(e=>{200===e.statusCode&&(this.notificationService.success({_title:"Operation Successful",_message:"Details updated successfully."}),this.schoolDetails._name=this.form.value._name,this.formSubmitted=!1)}))}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](l.a),c["\u0275\u0275directiveInject"](r.a),c["\u0275\u0275directiveInject"](r.f),c["\u0275\u0275directiveInject"](d.a),c["\u0275\u0275directiveInject"](m.a))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-school-details"]],decls:7,vars:5,consts:[[3,"heading","subheading","icon"],[1,"row"],[1,"col-lg-12","col-xl-12"],[1,"main-card","mb-3","card"],["class","h-sm d-flex justify-content-center align-items-center",4,"ngIf","ngIfElse"],["formDetails",""],[1,"h-sm","d-flex","justify-content-center","align-items-center"],[1,"p-5"],["novalidate","",1,"needs-validation",3,"formGroup","validSubmit"],[1,"form-row"],[1,"col-md-12"],[1,"position-relative","form-group"],["for","name"],["formControlName","_name","type","text","id","name","placeholder","School Name","required","",1,"form-control"],["formGroupName","_address",1,"form-row"],["for","street"],["formControlName","_street","type","text","id","street","placeholder","Street Address",1,"form-control"],[1,"col-md-4"],["for","state"],["id","state","formControlName","_state","type","text",1,"form-control"],["for","zipCode"],["formControlName","_zipCode","id","zipCode","type","text",1,"form-control"],["for","country"],["formControlName","_country","id","country","type","text",1,"form-control"],[1,"btn-actions-pane-right"],["type","submit","class","btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg",3,"disabled",4,"ngIf"],["class","btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg","type","button","disabled","",4,"ngIf"],["type","submit",1,"btn-wide","btn-pill","btn-shadow","btn-hover-shine","btn","btn-primary","btn-lg",3,"disabled"],["type","button","disabled","",1,"btn-wide","btn-pill","btn-shadow","btn-hover-shine","btn","btn-primary","btn-lg"],["role","status","aria-hidden","true",1,"spinner-grow","spinner-grow-sm"]],template:function(e,t){if(1&e&&(c["\u0275\u0275element"](0,"app-page-title",0),c["\u0275\u0275elementStart"](1,"div",1),c["\u0275\u0275elementStart"](2,"div",2),c["\u0275\u0275elementStart"](3,"div",3),c["\u0275\u0275template"](4,f,2,0,"div",4),c["\u0275\u0275template"](5,v,34,3,"ng-template",null,5,c["\u0275\u0275templateRefExtractor"]),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e){const e=c["\u0275\u0275reference"](6);c["\u0275\u0275property"]("heading",t.schoolDetails._name)("subheading",t.subheading)("icon",t.icon),c["\u0275\u0275advance"](4),c["\u0275\u0275property"]("ngIf",!t.dataFetching)("ngIfElse",e)}},directives:[u.a,o.NgIf,p.a,s["\u0275angular_packages_forms_forms_y"],s.NgControlStatusGroup,h.b,s.FormGroupDirective,h.a,s.DefaultValueAccessor,h.d,s.NgControlStatus,s.FormControlName,s.RequiredValidator,s.FormGroupName],styles:[""]}),e})(),data:{title:"School Management"}}];let g=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.j.forChild(S)],r.j]}),e})();var y=n("Pc/E"),C=n("TTnx");let E=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.CommonModule,g,y.a,C.DashboardModule,h.c,s.ReactiveFormsModule]]}),e})()}}]);