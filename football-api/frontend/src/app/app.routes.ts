import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PlayersList } from './pages/players-list/players-list';
import { PlayerDetail } from './pages/player-detail/player-detail';
import { PlayerForm } from './pages/player-form/player-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    
    {
        path: 'login',
        component: Login
    },
    {
        path: 'jugadores',
        component: PlayersList,
        canActivate: [authGuard]
    },
    {
        path: 'jugadores/nuevo',
        component: PlayerForm,
        canActivate: [authGuard]
    },
    {
        path: 'jugadores/:id', 
        component: PlayerDetail,
        canActivate: [authGuard]
    },
    
    {
        path: 'jugadores/editar/:id',
        component: PlayerForm,
        canActivate: [authGuard]
    },
    {
        path: '', redirectTo: '/jugadores', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/jugadores', pathMatch: 'full'
    },
];
