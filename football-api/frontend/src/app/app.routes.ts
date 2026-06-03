import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PlayersList } from './pages/players-list/players-list';
import { PlayerDetail } from './pages/player-detail/player-detail';

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
        path: 'jugadores/:id',
        component: PlayerDetail
    },
    {
        path: '', redirectTo: '/jugadores', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/jugadores', pathMatch: 'full'
    },
];
