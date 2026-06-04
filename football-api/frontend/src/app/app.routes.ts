import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PlayersList } from './pages/players-list/players-list';
import { PlayerDetail } from './pages/player-detail/player-detail';
import { PlayerForm } from './pages/player-form/player-form';

export const routes: Routes = [
    
    {
        path: 'jugadores',
        component: PlayersList
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'jugadores/nuevo',
        component: PlayerForm
    },
    {
        path: 'jugadores/:id', 
        component: PlayerDetail
    },
    
    {
        path: 'jugadores/:id/editar',
        component: PlayerForm
    },
    {
        path: '', redirectTo: '/jugadores', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/jugadores', pathMatch: 'full'
    },
];
