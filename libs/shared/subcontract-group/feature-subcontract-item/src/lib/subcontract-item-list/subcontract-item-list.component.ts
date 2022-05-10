import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubcontractItemPartialState, loadSubcontractItems} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'fourcast-subcontract-item-list',
  templateUrl: './subcontract-item-list.component.html',
  styleUrls: ['./subcontract-item-list.component.scss']
})
export class SubcontractItemListComponent implements OnInit {

  constructor(private store: Store<SubcontractItemPartialState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.pipe(

    //   switchMap((params: ParamMap ) => {
    //     console.log(params.get('id')!));


    //   })

    // )
    console.log('SUBCONTRACT ITEMS LIST COMPONENT')
  }

}
