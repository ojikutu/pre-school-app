function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{KOxN:function(e,t,n){"use strict";n.r(t),n.d(t,"SchoolDetailsModule",(function(){return N}));var a=n("ofXK"),o=n("tyNb"),r=n("XNiG"),i=n("1G5W"),l=n("3Pt+"),s=n("MJdi"),d=n("tzug"),c=n("HAZY"),m=n("fXoL"),u=n("NVKa"),p=n("eC24"),f=n("oZhZ");function _(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"div",6),m["\u0275\u0275element"](1,"app-content-loader"),m["\u0275\u0275elementEnd"]())}function h(e,t){if(1&e&&(m["\u0275\u0275elementStart"](0,"button",27),m["\u0275\u0275text"](1,"Update"),m["\u0275\u0275elementEnd"]()),2&e){var n=m["\u0275\u0275nextContext"](2);m["\u0275\u0275property"]("disabled",!n.form.valid)}}function b(e,t){1&e&&(m["\u0275\u0275elementStart"](0,"button",28),m["\u0275\u0275element"](1,"span",29),m["\u0275\u0275text"](2," Updating Details... "),m["\u0275\u0275elementEnd"]())}function v(e,t){if(1&e){var n=m["\u0275\u0275getCurrentView"]();m["\u0275\u0275elementStart"](0,"div",7),m["\u0275\u0275elementStart"](1,"h3"),m["\u0275\u0275text"](2,"School Details"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"form",8),m["\u0275\u0275listener"]("validSubmit",(function(){return m["\u0275\u0275restoreView"](n),m["\u0275\u0275nextContext"]().submitForm()})),m["\u0275\u0275elementStart"](4,"div",9),m["\u0275\u0275elementStart"](5,"div",10),m["\u0275\u0275elementStart"](6,"div",11),m["\u0275\u0275elementStart"](7,"label",12),m["\u0275\u0275text"](8,"School Name"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](9,"input",13),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](10,"div",14),m["\u0275\u0275elementStart"](11,"div",10),m["\u0275\u0275elementStart"](12,"div",11),m["\u0275\u0275elementStart"](13,"label",15),m["\u0275\u0275text"](14,"Street"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](15,"input",16),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](16,"div",17),m["\u0275\u0275elementStart"](17,"div",11),m["\u0275\u0275elementStart"](18,"label",18),m["\u0275\u0275text"](19,"State"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](20,"input",19),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](21,"div",17),m["\u0275\u0275elementStart"](22,"div",11),m["\u0275\u0275elementStart"](23,"label",20),m["\u0275\u0275text"](24,"Zip Code"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](25,"input",21),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](26,"div",17),m["\u0275\u0275elementStart"](27,"div",11),m["\u0275\u0275elementStart"](28,"label",22),m["\u0275\u0275text"](29,"Country"),m["\u0275\u0275elementEnd"](),m["\u0275\u0275element"](30,"input",23),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](31,"div",24),m["\u0275\u0275template"](32,h,2,1,"button",25),m["\u0275\u0275template"](33,b,3,0,"button",26),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()}if(2&e){var a=m["\u0275\u0275nextContext"]();m["\u0275\u0275advance"](3),m["\u0275\u0275property"]("formGroup",a.form),m["\u0275\u0275advance"](29),m["\u0275\u0275property"]("ngIf",!a.formSubmitted),m["\u0275\u0275advance"](1),m["\u0275\u0275property"]("ngIf",a.formSubmitted)}}var S,g,y,C=[{path:"",component:(S=function(){function e(t,n,a,o,s){var d=this;_classCallCheck(this,e),this.classService=t,this.activatedRoute=n,this.router=a,this.notificationService=o,this.apiAuthenticationService=s,this.subheading="Settings",this.icon="pe-7s-display2 icon-gradient bg-mean-fruit",this.ngUnsubscribe$=new r.a,this.schoolDetails={_uid:null,_name:null,_address:{_country:null,_state:null,_zipCode:null,_street:null}},this.form=new l.FormGroup({_name:new l.FormControl("",l.Validators.required),_address:new l.FormGroup({_country:new l.FormControl(""),_state:new l.FormControl(""),_zipCode:new l.FormControl(""),_street:new l.FormControl("")})}),this.validateSchoolUid=function(){d.classService.schoolDetails(d.schoolUid).pipe(Object(i.a)(d.ngUnsubscribe$)).subscribe((function(e){200===e.statusCode&&e.data._details._recordsFound>0?(d.schoolDetails={_uid:e.data._data[0]._source._uid,_name:e.data._data[0]._source._name,_address:{_country:e.data._data[0]._source._address._country,_state:e.data._data[0]._source._address._state,_zipCode:e.data._data[0]._source._address._zipCode,_street:e.data._data[0]._source._address._street}},d.form.setValue({_name:e.data._data[0]._source._name,_address:{_country:e.data._data[0]._source._address._country,_state:e.data._data[0]._source._address._state,_zipCode:e.data._data[0]._source._address._zipCode,_street:e.data._data[0]._source._address._street}}),d.dataFetching=!0):(d.notificationService.error({_title:"Error Occurred.",_message:"No school profile found."}),d.router.navigate(["/app/school"]))}),(function(){d.notificationService.error({_title:"Error Occurred.",_message:"No school profile found."}),d.router.navigate(["/app/school"])}))}}return _createClass(e,[{key:"ngOnInit",value:function(){this.schoolUid=this.activatedRoute.snapshot.params.id,this.validateSchoolUid()}},{key:"submitForm",value:function(){var e=this;this.form.valid&&(this.formSubmitted=!0,this.form.value._uid=this.schoolDetails._uid,this.apiAuthenticationService.patch("school",this.form.value).pipe(Object(i.a)(this.ngUnsubscribe$)).subscribe((function(t){200===t.statusCode&&(e.notificationService.success({_title:"Operation Successful",_message:"Details updated successfully."}),e.schoolDetails._name=e.form.value._name,e.formSubmitted=!1)})))}}]),e}(),S.\u0275fac=function(e){return new(e||S)(m["\u0275\u0275directiveInject"](s.a),m["\u0275\u0275directiveInject"](o.a),m["\u0275\u0275directiveInject"](o.f),m["\u0275\u0275directiveInject"](d.a),m["\u0275\u0275directiveInject"](c.a))},S.\u0275cmp=m["\u0275\u0275defineComponent"]({type:S,selectors:[["app-school-details"]],decls:7,vars:5,consts:[[3,"heading","subheading","icon"],[1,"row"],[1,"col-lg-12","col-xl-12"],[1,"main-card","mb-3","card"],["class","h-sm d-flex justify-content-center align-items-center",4,"ngIf","ngIfElse"],["formDetails",""],[1,"h-sm","d-flex","justify-content-center","align-items-center"],[1,"p-5"],["novalidate","",1,"needs-validation",3,"formGroup","validSubmit"],[1,"form-row"],[1,"col-md-12"],[1,"position-relative","form-group"],["for","name"],["formControlName","_name","type","text","id","name","placeholder","School Name","required","",1,"form-control"],["formGroupName","_address",1,"form-row"],["for","street"],["formControlName","_street","type","text","id","street","placeholder","Street Address",1,"form-control"],[1,"col-md-4"],["for","state"],["id","state","formControlName","_state","type","text",1,"form-control"],["for","zipCode"],["formControlName","_zipCode","id","zipCode","type","text",1,"form-control"],["for","country"],["formControlName","_country","id","country","type","text",1,"form-control"],[1,"btn-actions-pane-right"],["type","submit","class","btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg",3,"disabled",4,"ngIf"],["class","btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg","type","button","disabled","",4,"ngIf"],["type","submit",1,"btn-wide","btn-pill","btn-shadow","btn-hover-shine","btn","btn-primary","btn-lg",3,"disabled"],["type","button","disabled","",1,"btn-wide","btn-pill","btn-shadow","btn-hover-shine","btn","btn-primary","btn-lg"],["role","status","aria-hidden","true",1,"spinner-grow","spinner-grow-sm"]],template:function(e,t){if(1&e&&(m["\u0275\u0275element"](0,"app-page-title",0),m["\u0275\u0275elementStart"](1,"div",1),m["\u0275\u0275elementStart"](2,"div",2),m["\u0275\u0275elementStart"](3,"div",3),m["\u0275\u0275template"](4,_,2,0,"div",4),m["\u0275\u0275template"](5,v,34,3,"ng-template",null,5,m["\u0275\u0275templateRefExtractor"]),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()),2&e){var n=m["\u0275\u0275reference"](6);m["\u0275\u0275property"]("heading",t.schoolDetails._name)("subheading",t.subheading)("icon",t.icon),m["\u0275\u0275advance"](4),m["\u0275\u0275property"]("ngIf",!t.dataFetching)("ngIfElse",n)}},directives:[u.a,a.NgIf,p.a,l["\u0275angular_packages_forms_forms_y"],l.NgControlStatusGroup,f.b,l.FormGroupDirective,f.a,l.DefaultValueAccessor,f.d,l.NgControlStatus,l.FormControlName,l.RequiredValidator,l.FormGroupName],styles:[""]}),S),data:{title:"School Management"}}],w=((g=function e(){_classCallCheck(this,e)}).\u0275mod=m["\u0275\u0275defineNgModule"]({type:g}),g.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(e){return new(e||g)},imports:[[o.j.forChild(C)],o.j]}),g),E=n("Pc/E"),x=n("TTnx"),N=((y=function e(){_classCallCheck(this,e)}).\u0275mod=m["\u0275\u0275defineNgModule"]({type:y}),y.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(e){return new(e||y)},imports:[[a.CommonModule,w,E.a,x.DashboardModule,f.c,l.ReactiveFormsModule]]}),y)}}]);