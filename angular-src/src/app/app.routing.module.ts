import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublicViewComponent } from './components/public-view/public-view.component';
import { EditPortfolioComponent } from './components/edit-portfolio/edit-portfolio.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FourOhFourComponent } from './components/404-page/404-page.component';


const routes = [{
    path: 'landing',
    component: LandingComponent
},
{
    path: 'dashboard',
    component: DashboardComponent
},
{
    path: 'login-page',
    component: LoginPageComponent
},
{
    path: 'register',
    component: RegisterPageComponent
},
{
    path: 'public',
    component: PublicViewComponent
},
{
    path: 'edit-portfolio',
    component: EditPortfolioComponent
},
{
    path: 'edit-profile',
    component: EditProfileComponent
},
{
    path: 'adv-search',
    component: AdvancedSearchComponent
},
{
    path: 'search-results',
    component: SearchResultsComponent
},
{
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
},
{
    path: '**',
    component: FourOhFourComponent
},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class RoutingModule {}

export const RoutingComponents = [ LandingComponent, AppComponent, FourOhFourComponent, DashboardComponent,
     LoginPageComponent, RegisterPageComponent, PublicViewComponent,
     EditPortfolioComponent, EditProfileComponent, AdvancedSearchComponent, SearchResultsComponent ];
