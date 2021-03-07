import { Component, OnInit, Inject } from '@angular/core';

//import { APP_CONFIG, AppConfig } from "../../core/app.config";

@Component({
    selector: 'app-footer',
    templateUrl: `./footer.component.html`,
})
export class FooterComponent {
    //constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {

    //}
    version = "1.0";//this.appConfig.version;
    year = (new Date()).getFullYear();
}
