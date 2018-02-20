import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';

const routes = [{
    path: 'landing',
    component: LandingComponent
},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class RoutingModule {}

export const RoutingComponents = [ LandingComponent, AppComponent ];
