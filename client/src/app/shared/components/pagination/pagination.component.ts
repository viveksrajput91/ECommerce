import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalCount:number;
  @Input() pageSize:number;
  @Output() pageNumberEventEmitter=new EventEmitter<number>();
  @Input() pageNumber : Number;

  constructor() { }

  ngOnInit(): void {
  }

  onPageChanged(event:any)
  {
    this.pageNumberEventEmitter.emit(event.page);
  }

}
