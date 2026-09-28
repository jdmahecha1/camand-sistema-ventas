import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal implements OnInit {
  titulo = 'Dashboard';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        map(() => {
          let ruta = this.route.firstChild;
          while (ruta?.firstChild) {
            ruta = ruta.firstChild;
          }
          return ruta?.snapshot.data['title'] ?? 'Dashboard';
        })
      )
      .subscribe((titulo) => (this.titulo = titulo));
  }
}
