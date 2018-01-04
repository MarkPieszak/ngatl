import { Component, ViewContainerRef } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as utils from 'tns-core-modules/utils/utils';
import * as socialShare from 'nativescript-social-share';
import { compose as composeEmail, available as emailAvailable } from 'nativescript-email';

// app
import { ModalActions, LogService, WindowService } from '@ngatl/core';
import { NSAppService } from '../../core/services/ns-app.service';

@Component({
  moduleId: module.id,
  selector: 'ngatl-ns-conduct',
  templateUrl: 'conduct.component.html'
})
export class ConductComponent {

  constructor(
    private store: Store<any>, 
    private log: LogService,
    private translate: TranslateService,
    private vcRef: ViewContainerRef,
    private win: WindowService,
    private appService: NSAppService,
  ) {}

  public emailUs() {
    emailAvailable().then((avail) => {
      if (avail) {
        composeEmail({
          to: ['info@ng-atl.org'],
        }).then(_ => {
          
        }, (err) => {
          this.win.alert(this.translate.instant('general.error'));
        });
      }
    });
  }

  public openWeb(url: string) {
    this.appService.openWebView({
      vcRef: this.vcRef,
      context: {
        url,
        title: this.translate.instant('general.conduct.title')
      }
    })
  }
}
