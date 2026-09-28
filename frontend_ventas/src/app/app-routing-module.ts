import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Principal } from './estructura/principal';
import { Dashboard } from './modulos/dashboard/dashboard';
import { Categoria } from './modulos/categoria/categoria';
import { Producto } from './modulos/producto/producto';
import { Cliente } from './modulos/cliente/cliente';
import { Pedido } from './modulos/pedido/pedido';
import { Usuario } from './modulos/usuario/usuario';
import { Login } from './modulos/login/login';
import { NotFound } from './modulos/not-found/not-found';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { TiendaLayout } from './cliente/tienda-layout/tienda-layout';
import { Catalogo } from './cliente/catalogo/catalogo';
import { Carrito } from './cliente/carrito/carrito';
import { MisPedidos } from './cliente/mis-pedidos/mis-pedidos';

const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Principal,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: Dashboard, data: { title: 'Dashboard' } },
      { path: 'categoria', component: Categoria, data: { title: 'Categorías' } },
      { path: 'producto', component: Producto, data: { title: 'Productos' } },
      { path: 'cliente', component: Cliente, data: { title: 'Clientes' } },
      { path: 'pedido', component: Pedido, data: { title: 'Pedidos' } },
      { path: 'usuario', component: Usuario, data: { title: 'Usuarios' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: TiendaLayout,
    canActivate: [authGuard],
    children: [
      { path: 'tienda', component: Catalogo },
      { path: 'carrito', component: Carrito },
      { path: 'mis-pedidos', component: MisPedidos },
    ],
  },
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
