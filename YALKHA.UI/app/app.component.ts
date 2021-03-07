import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

//import '../../app/shared/component-overrides';
//import { AppConfigService } from '../../app/core/app-config.service';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'YALKHA CRM';
    router: string;
    public IsVisible: boolean = true;
    constructor(private _router: Router) {
        this.router = _router.url;
        if (this.router == "/login") {
            this.IsVisible = true;
        }
    }

    ngOnInit() {

        // If there is no startup data received (maybe an error!)
        // navigate to error route
        //if (!this.configService.configLoaded) {
        //    this.router.navigate(['error'], { replaceUrl: true });
        //}
        // Update the AdminLTE layouts
        setTimeout(() => {
            $('body').layout('fix');
        }, 100);
    }
}