import { Routes } from '@angular/router';
import { Home } from './home/home';
import { GalleryComponent } from './gallery/gallery';
import { AboutUs } from './about-us/about-us';
import { Contact } from './contact/contact';
import { Services } from './services/services';
import { BookingComponent } from './booking/booking.component';
// Or, if the export is named differently, use the correct name, e.g.:
// import { BookingComponent } from './booking/booking';
import { LoginComponent } from './login/login.component';
import { SignUp } from './sign-up/sign-up';
import { AdminDashboardComponent } from './admindashboard/admindashboard';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'gallery', component: GalleryComponent},
    {path: 'about', component: AboutUs},
    {path: 'contact', component: Contact},
    {path: 'services', component: Services},
    {path: 'booking', component: BookingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUp},
    {path: 'admindashboard', component: AdminDashboardComponent},
    {path: '**', redirectTo: '/home'}
];
