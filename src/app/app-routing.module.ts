import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AllPostsComponent} from './all-posts/all-posts.component';
import {FollowingComponent} from './following/following.component';
import {FavouriteComponent} from './favourite/favourite.component';
import {MyPostsComponent} from './my-posts/my-posts.component';
import {NgModule} from '@angular/core';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {LogingComponent} from './auth/loging/loging.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {RouteGuard} from './auth/route-guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'allposts', component: AllPostsComponent, canActivate: [RouteGuard]},
  {path: 'following', component: FollowingComponent, canActivate: [RouteGuard]},
  {path: 'favourite', component: FavouriteComponent, canActivate: [RouteGuard]},
  {path: 'myposts', component: MyPostsComponent, canActivate: [RouteGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LogingComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
