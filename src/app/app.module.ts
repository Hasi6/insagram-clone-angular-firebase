import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowingComponent } from './following/following.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogingComponent } from './auth/loging/loging.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {RouteGuard} from './auth/route-guard';
import { NotificationComponent } from './notification/notification.component';
import {NotificationService} from './shared/notification.service';
import {FireService} from './shared/fire.service';
import {UserService} from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FollowingComponent,
    FavouriteComponent,
    MyPostsComponent,
    SignUpComponent,
    LogingComponent,
    LogoutComponent,
    HomeComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard, NotificationService, FireService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
