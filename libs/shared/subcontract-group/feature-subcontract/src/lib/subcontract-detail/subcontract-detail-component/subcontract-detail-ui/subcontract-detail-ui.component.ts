import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// TODO: [NX-19] resolve circular dependency
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SubcontractHeaderComponent } from '@workspace/shared-subcontract-group-ui-subcontract-detail'


import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';

interface Link {
  title: string;
  route: string;
  disabled?: boolean
}

@Component({
  selector: 'fourcast-subcontract-detail-ui',
  templateUrl: './subcontract-detail-ui.component.html',
  styleUrls: ['./subcontract-detail-ui.component.scss'],
  standalone: true,
  imports: [
    SubcontractHeaderComponent,
    MatCardModule,
    MatTabsModule,
    RouterModule,
  ],

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcontractDetailUIComponent implements OnInit {
  contractId: string;
  detailForm: FormGroup;
  _subcontract: Subcontract;
  _items: SubcontractItem[] | undefined;
  item0: SubcontractItem = {};
  _itemDetailDisplayed: boolean | undefined = false;

  links: Link[] = [
    { title: 'Contract Details', route: 'general-details' },
    { title: 'Amounts', route: 'items/list/for-subcontract' },
    { title: 'Payments', route: 'payments', disabled: true },
  ];
  activeLink = this.links[0];

  @Input() set subcontract(v: Subcontract | null | undefined) {
    if (v) {
      this._subcontract = v;
      this._subcontract.description = 'Plumbing';
      this.contractId = this._subcontract.id ? this._subcontract.id : '';
    }
    this.detailForm.reset(this._subcontract);
  }

  @Input() set itemDetailDisplayed(v: boolean | undefined) {
    if (v) {
      this._itemDetailDisplayed = v;
    } else {
      this._itemDetailDisplayed = false;
    }
  }

  @Input() set items(v: SubcontractItem[] | undefined) {
    this._items = v;
    if (this._items && this._items.length > 0) {
      this.item0 = this._items[0];
    } else {
      this.item0 = {};
    }
  }

  @Output() navigateBack = new EventEmitter<null>();
  @Output() createItemZero = new EventEmitter<null>();
  @Output() createNewVariation = new EventEmitter<null>();
  @Output() activatedLink = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    //  const tree: UrlTree = this.router.parseUrl(this.router.url)
    //  const segments: UrlSegment[] = tree.root.children.primary.segments;

    //  const paths: string[] = [];
    //  segments.forEach((segment: UrlSegment) => {
    //    paths.push(segment.path)
    //  })

    const childPath = this.route.children[0].snapshot.url[0].path;

    switch (childPath) {
      case 'general-details':
        this.activeLink = this.links[0];
        break;
      case 'variations':
        this.activeLink = this.links[1];
        break;
    }

    // console-log('route', this.route)
    //   this.route.url.subscribe(url => {
    //       console-log('Subscribed url', url)
    //   })
  }

  createForm() {
    this.detailForm = this.fb.group({
      id: null,
      name: null,
      dates: new FormControl([]),
      description: null,
    });
  }

  setActiveTab(link: Link) {
    this.activeLink = link;
    this.activatedLink.emit(link.route);
    // this.router.navigate([this.activeLink.route], { relativeTo: this.route });
  }

  createItemZeroForContract(): void {
    this.createItemZero.emit();
    // const contractUpdate = this.contractItemsService.createItemForApprovedContract(
    //   this._subcontract
    // );

    // this.contractItemsService.saveNewItem(
    //   contractUpdate,
    //   this._subcontract.project ? this._subcontract.project.id as string : '',
    //   this._subcontract.id as string
    // );
  }

  newVariation(): void {
    this.createNewVariation.emit();
  }

  newClaim(): void {
    // this.paymentCreateService
    //   .createSubcontractPayment(this.detail)
    //   .then((paymentId) => {
    //     this.router.navigate(['claims/edit', paymentId]);
    //   });
  }

  onSubmit(): void {
    this.back();
    // this.router.navigate(['../../list'], { relativeTo: this.route });

    // just now, there is nothing to save from this form
    // this.subcontractService.saveForm(this.subcontract, this.subcontractForm.value)
  }

  back() {
    this.navigateBack.emit();
  }
}

