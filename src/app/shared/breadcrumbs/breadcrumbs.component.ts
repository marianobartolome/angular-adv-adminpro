import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, Event, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy  {

  public titulo: string | undefined;
  public tituloSubs$: Subscription | undefined;

  constructor( private router: Router, private route: ActivatedRoute) { 
    //console.log(route.snapshot.data);
    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe( ({ titulo })  => {
                          this.titulo=titulo;
                          document.title=`AdminPro - ${ titulo }`;
                        });
  }
  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }

  getArgumentosRuta(){

    return this.router.events
      .pipe(
        filter( (event: Event ): event is ActivationEnd => event instanceof ActivationEnd ), // linea reemplazada por la del curso, importando Event del @angular/router
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
      

  }


}
