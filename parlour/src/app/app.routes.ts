import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gallery } from './gallery/gallery';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';
import { Services } from './services/services';
import { Booking } from './booking/booking';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'gallery', component: Gallery},
    {path: 'about', component: AboutUs},
    {path: 'contact', component: Contact},
    {path: 'services', component: Services},
    {path: 'booking', component: Booking},
    {path: 'login', component: Login},
    {path: 'signup', component: SignUp},
    {path: '**', redirectTo: '/home'}
];
