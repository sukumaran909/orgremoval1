import { inject, Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AppGlobalService } from '@baseapp/app-global.service';
import { combineLatest, Observable, Observer, of, Subject } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from '@baseapp/base.service';


@Injectable()
export class AuthenticationResolver implements Resolve<any> {

  public router = inject(Router);
  public auth = inject(AuthService);
  public appGlobalService = inject(AppGlobalService);
  public cookieService = inject(CookieService);
  public baseService = inject(BaseService);

 
  public authenticate(): Observable<any> {
    const latest = combineLatest([this.isUserLoggedIn(),this.auth.getUserInfo()])
    return latest;
  }

  getLoginMethod() {
    const currentUserSubject = new Observable((observer: any) => {
      this.baseService.get({ url: '/rest/login-providers/oauth-login-providers',handleError:false }).subscribe(
        (data: any) => {
          const url = data.login_urls[0];
          this.redirectToLogin(url).subscribe((res) => {
            observer.next(data);
            observer.complete();
          }, (error: any) => {
            observer.error(error);
            observer.complete();
          })
        },
        (error: any) => {
          observer.error(error);
          observer.complete();
        }
      );
    });

    return currentUserSubject;
  }


  
  redirectToLogin(url:any): Observable<boolean> {
    return Observable.create((obsr$: Observer<boolean>) => {
      window.location.href = `${window.location.origin}${url}`;
    })
  }


  isUserLoggedIn(): Observable<boolean> {
    const isUserLoggedIn = this.cookieService.get('RAPPL');
    return Observable.create((obsr$: Observer<boolean>) => {
      if (isUserLoggedIn == 'yes') {
        obsr$.next(true);
        obsr$.complete();
      }
      else {
        this.getLoginMethod().subscribe(()=>{
          obsr$.next(true);
          obsr$.complete();
        },(err:any)=>{
          obsr$.error('authentication failed');
          obsr$.complete();
        })
       
      }

    })
  }

  resolve() {
    return this.authenticate().pipe(map(res => {
      this.appGlobalService.write('currentUser', res[1]);
     this.auth.authSuccess();
    }),
      take(1),
      catchError((error) => {
        this.auth.authFail();
        // const isUserLoggedIn = this.cookieService.get('RAPPL');
        // if(isUserLoggedIn == 'yes' && !this.appGlobalService.get('currentUser')){
        //   let redirectUrl = window.location.hash;
        //   let loginUrl = '/login';
        //   if (redirectUrl.indexOf("login") == -1) {
        //     loginUrl += "?redirectUrl=" + encodeURIComponent(redirectUrl);
        //   }
        //   this.router.navigateByUrl(loginUrl);
        // }
        // else{
        //   let redirectUrl = window.location.hash;
        //   let loginUrl = '/login';
        //   if (redirectUrl.indexOf("login") == -1) {
        //     loginUrl += "?redirectUrl=" + encodeURIComponent(redirectUrl);
        //   }
        //   this.router.navigateByUrl(loginUrl);
        // }
        return of(false);
      }))
  }
}


