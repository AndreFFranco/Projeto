import { Component, ViewChild } from '@angular/core';


import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto';
  subtitle = "Project Management"

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

}
