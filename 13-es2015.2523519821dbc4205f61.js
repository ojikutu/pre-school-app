(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{DBDh:function(e,t,n){"use strict";n.r(t),n.d(t,"AssignedClassModule",(function(){return y}));var a=n("ofXK"),i=n("tyNb"),s=n("XNiG"),o=n("1G5W"),r=n("HAZY"),d=n("wHSu"),l=n("fXoL"),c=n("NVKa"),m=n("eC24"),u=n("njyG"),p=n("6NWb"),g=n("1kSV");function b(e,t){1&e&&(l["\u0275\u0275elementStart"](0,"div",6),l["\u0275\u0275element"](1,"app-content-loader"),l["\u0275\u0275elementEnd"]())}const h=function(e){return["/app/classes/students",e]};function f(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"tr"),l["\u0275\u0275elementStart"](1,"td"),l["\u0275\u0275text"](2),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](3,"td"),l["\u0275\u0275elementStart"](4,"div",10),l["\u0275\u0275elementStart"](5,"div",11),l["\u0275\u0275elementStart"](6,"div",12),l["\u0275\u0275elementStart"](7,"div",13),l["\u0275\u0275elementStart"](8,"a",14),l["\u0275\u0275text"](9),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](10,"div",15),l["\u0275\u0275elementStart"](11,"div",16),l["\u0275\u0275text"](12),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](13,"td"),l["\u0275\u0275elementStart"](14,"div",10),l["\u0275\u0275elementStart"](15,"div",11),l["\u0275\u0275elementStart"](16,"div",17),l["\u0275\u0275elementStart"](17,"div",18),l["\u0275\u0275element"](18,"fa-icon",19),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=t.index,a=l["\u0275\u0275nextContext"](2);l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](n+1),l["\u0275\u0275advance"](6),l["\u0275\u0275property"]("routerLink",l["\u0275\u0275pureFunction1"](6,h,e._source._uid)),l["\u0275\u0275advance"](1),l["\u0275\u0275textInterpolate1"](" ",e._source._name," "),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate1"](" ",e._source._school_name," "),l["\u0275\u0275advance"](6),l["\u0275\u0275property"]("routerLink",l["\u0275\u0275pureFunction1"](8,h,e._source._uid))("icon",a.faUser)}}function v(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div",7),l["\u0275\u0275elementStart"](1,"table",8),l["\u0275\u0275elementStart"](2,"thead"),l["\u0275\u0275elementStart"](3,"tr"),l["\u0275\u0275elementStart"](4,"th"),l["\u0275\u0275text"](5,"#"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](6,"th"),l["\u0275\u0275text"](7,"Class Details"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](8,"th"),l["\u0275\u0275text"](9," - "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](10,"tbody"),l["\u0275\u0275template"](11,f,19,10,"tr",9),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()),2&e){const e=l["\u0275\u0275nextContext"]();l["\u0275\u0275advance"](11),l["\u0275\u0275property"]("ngForOf",e.classesFetched)}}const S=[{path:"",component:(()=>{class e{constructor(e){this.apiAuthenticationService=e,this.contentLoaded=!1,this.ngUnsubscribe$=new s.a,this.heading="Classes",this.subheading="Assigned Classes",this.icon="pe-7s-display2 icon-gradient bg-mean-fruit",this.buttonMessage="Dashboard",this.buttonIcon=d.a,this.buttonDestination="/app/landing",this.faUser=d.B,this.ngOnDestroy=()=>{this.ngUnsubscribe$.next(),this.ngUnsubscribe$.complete()}}ngOnInit(){this.apiAuthenticationService.fetch("class",{_records:1e3}).pipe(Object(o.a)(this.ngUnsubscribe$)).subscribe(e=>{this.classesFetched=e.data._data}),this.contentLoaded=!0}}return e.\u0275fac=function(t){return new(t||e)(l["\u0275\u0275directiveInject"](r.a))},e.\u0275cmp=l["\u0275\u0275defineComponent"]({type:e,selectors:[["app-assigned-class"]],decls:7,vars:8,consts:[[3,"heading","subheading","icon","buttonMessage","buttonIcon","buttonDestination"],[1,"row"],[1,"col-lg-12","col-xl-12"],[1,"main-card","mb-3","card"],["class","h-sm d-flex justify-content-center align-items-center",4,"ngIf","ngIfElse"],["assignedClasses",""],[1,"h-sm","d-flex","justify-content-center","align-items-center"],[1,"p-5","table-responsive"],["datatable","",1,"padding-top-5","align-middle","mb-0","table","table-borderless","table-striped","table-hover"],[4,"ngFor","ngForOf"],[1,"widget-content","p-0"],[1,"widget-content-wrapper"],[1,"widget-content-left"],[1,"widget-heading"],[3,"routerLink"],[1,"widget-subheading","opacity-10"],[1,"pr-2"],[1,"widget-content-right","mr-3"],[1,"widget-content-right"],["placement","top","ngbTooltip","View Students","size","lg",3,"routerLink","icon"]],template:function(e,t){if(1&e&&(l["\u0275\u0275element"](0,"app-page-title",0),l["\u0275\u0275elementStart"](1,"div",1),l["\u0275\u0275elementStart"](2,"div",2),l["\u0275\u0275elementStart"](3,"div",3),l["\u0275\u0275template"](4,b,2,0,"div",4),l["\u0275\u0275template"](5,v,12,1,"ng-template",null,5,l["\u0275\u0275templateRefExtractor"]),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()),2&e){const e=l["\u0275\u0275reference"](6);l["\u0275\u0275property"]("heading",t.heading)("subheading",t.subheading)("icon",t.icon)("buttonMessage",t.buttonMessage)("buttonIcon",t.buttonIcon)("buttonDestination",t.buttonDestination),l["\u0275\u0275advance"](4),l["\u0275\u0275property"]("ngIf",!t.contentLoaded)("ngIfElse",e)}},directives:[c.a,a.NgIf,m.a,u.a,a.NgForOf,i.h,p.a,g.k,i.g],styles:[""]}),e})(),data:{title:"Assigned Classes"}}];let E=(()=>{class e{}return e.\u0275mod=l["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=l["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.i.forChild(S)],i.i]}),e})();var w=n("Pc/E"),x=n("TTnx");let y=(()=>{class e{}return e.\u0275mod=l["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=l["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.CommonModule,E,w.a,x.DashboardModule,u.b,p.b,g.l]]}),e})()}}]);