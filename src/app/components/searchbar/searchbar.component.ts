import { Component, OnInit, ViewChild, ElementRef, Output,EventEmitter, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * SEARCHBAR COMPONENT
 * 
 * this component is used to emit constantly the value of 
 * the searchbar input
 * 
 *
 * 
 * HOW TO USE IT: 
 * 
 * this component has no inputs, only has outputs, this component
 * has to outputs:
 * 
 * OnSearch: 
 * When the enter key or the search button is pressed the component 
 * emit the value to be searched
 * 
 * OnDebounce:
 * When the searchbar stops receiving inputs event for 300ms it emits
 * the value
 */

@Component({
  selector: 'searchbar',
  template: `
    <div class="searchbar_container">
      <input  class="input-d w-100"
                type="search"
                placeholder="buscar..."
                (input)="keyPressed()"
                (keyup.enter)="search()"
                #searchBar>
      <button   type="button"
                (click)="search()">
        <mat-icon>search</mat-icon>
      </button>
    </div>

  `,
  styles: [`

    html{
      box-sizing: border-box;
    }

    *, *:before, *:after{
      box-sizing: inherit;
    }

    .searchbar_container{
      display: flex;
      flex-flow: row nowrap;

      input{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
        transition:all .5s ease;
        background-color: #303030;
        color: #fff;

        &:focus{
          border-bottom: 2px solid #be4258;
        }
      }

      button{
        padding: .25rem .5rem;
        border: 1px solid rgb(190, 190, 190);
        border-left: hidden;
        border-bottom-right-radius: .5rem;
        border-top-right-radius: .5rem;
        background-color: #303030;
        cursor: pointer;
        color: #be4258;
        transition: all .3s ease;

        &:hover{
          background-color: #be4258;
          color: #fff;
        }
      }
    }

    .w-100{
      width: 100%;
    }

    .input-d{
      border: none;
      border: 1px solid rgb(190, 190, 190);
      padding: .6rem 1rem;
      font-size: 1rem;
      outline: none;
      border-radius: .5rem;

      &::placeholder{
        color: #777;
      }
    }
  `]
})
export class SearchbarComponent implements OnInit, OnDestroy {

  /**
   * [term]
   * this var storage constantly the value of the searchbar
   */
  term:string = '';

  /**
   * [searchBar]:
   * reference the searchbar from the html
   */
  @ViewChild('searchBar') searchBar!:ElementRef<HTMLInputElement>;
  
  // Outputs-----------------
  @Output() OnSearch:EventEmitter<string> = new EventEmitter();
  @Output() OnDebounce:EventEmitter<string> = new EventEmitter();
  // -------------------------
  /**
   * [Subject]
   * Special type of Observable that allows values to be multicast 
   * for diferent observable 
   *
   * @return  {string}  [return description]
   */
  debouncer:Subject<string> = new Subject();

  ngOnInit(): void {
    this.debouncer
      /**
       * [Every 300ms fires the OnDebounce event with the value]
       */
      .pipe(debounceTime(300))
        .subscribe(term => {
          this.OnDebounce.emit(term);
        })
  }

  /**
   * [ngOnDestroy]
   * when the component is destroyed, automatically make
   * the unsubscribe action from the debouncer 
   *
   * @return  {void}
   */
  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  /**
   * [search]
   * when the enter key and button is pressed 
   * the function emits the actual value
   *
   * @return  {void}    [return description]
   */
  search():void{
    this.term = this.searchBar.nativeElement.value;
    this.OnSearch.emit(this.term);
    
  }

  /**
   * [keyPressed]
   * when the input events is fired the function calls
   * the debouncer that emits the value 
   * 
   * @return  {void}
   */
  keyPressed():void{
    this.term = this.searchBar.nativeElement.value;
    this.debouncer.next(this.term);
  }
  

}
