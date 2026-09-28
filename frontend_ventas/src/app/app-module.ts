import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Nav } from './estructura/nav/nav';
import { Aside } from './estructura/aside/aside';
import { Content } from './estructura/content/content';
import { Footer } from './estructura/footer/footer';
import { Principal } from './estructura/principal';
import { Dashboard } from './modulos/dashboard/dashboard';
import { Categoria } from './modulos/categoria/categoria';
import { Producto } from './modulos/producto/producto';
import { Cliente } from './modulos/cliente/cliente';
import { Pedido } from './modulos/pedido/pedido';
import { Usuario } from './modulos/usuario/usuario';
import { Login } from './modulos/login/login';
import { NotFound } from './modulos/not-found/not-found';
import { TiendaLayout } from './cliente/tienda-layout/tienda-layout';
import { Catalogo } from './cliente/catalogo/catalogo';
import { Carrito } from './cliente/carrito/carrito';
import { MisPedidos } from './cliente/mis-pedidos/mis-pedidos';

@NgModule({
  declarations: [
    App,
    Nav,
    Aside,
    Content,
    Footer,
    Principal,
    Dashboard,
    Categoria,
    Producto,
    Cliente,
    Pedido,
    Usuario,
    Login,
    NotFound,
    TiendaLayout,
    Catalogo,
    Carrito,
    MisPedidos,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}
