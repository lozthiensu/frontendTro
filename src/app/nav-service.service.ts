import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NavServiceService {
  // Observable navItem source
  private _navItemSource = new BehaviorSubject<any>({command: 'none'});
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  // service command
  changeNav(data) {
    this._navItemSource.next(data);
  }
}
