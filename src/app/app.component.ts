import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        })
     }

     checkRouterEvent(event: Event): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        } 
        
        if (event instanceof NavigationEnd || 
            event instanceof NavigationCancel || 
            event instanceof NavigationError) {

            this.loading = false;
        }
     }

    logOut(): void {
        this.authService.logout();
        this.router.navigate(['/welcome']);
    }

    displayMessages(): void {
        this.router.navigate([{ outlets: { popup: ['messages'] }}]);
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.messageService.isDisplayed = false;
    }
}
