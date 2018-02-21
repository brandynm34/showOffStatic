import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingComponents, RoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublicViewComponent } from './components/public-view/public-view.component';
import { EditPortfolioComponent } from './components/edit-portfolio/edit-portfolio.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent, RoutingComponents, LoginPageComponent, RegisterPageComponent, DashboardComponent, PublicViewComponent, EditPortfolioComponent, EditProfileComponent, AdvancedSearchComponent, SearchResultsComponent
  ],
  imports: [
    BrowserModule, RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
