import { Component, Directive, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppLayoutBaseService } from '@baseapp/app-layout/app-layout.service.base';

@Directive({

})
export class LogoutBaseComponent {
  logo:string =""
  public bs =inject(AppLayoutBaseService);
  public router = inject(Router);
  

login(){
  this.router.navigateByUrl('/');
  // this.router.navigateByUrl('/')
}

onInit(){
  const data = this.bs.getTopBarCofiguration();
  let appLogoObj: any = (data.left.find((t: { element: string; }) => t.element === "logo"));
  if (appLogoObj?.urlIconFileName) {
    this.logo = `assets/images/` + appLogoObj.urlIconFileName;
  } else {
    this.logo = `assets/images/` + appLogoObj.logoFileName;
  }
  // this.logo = `assets/images/` + ele.logoFileName;
}



}
