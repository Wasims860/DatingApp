import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent>{
   canDeactivate(
     component: MemberEditComponent):boolean {
      if(component.editForm?.dirty) {
        return confirm('You have unsaved changes! Do you really want to leave?');
      }
      return true;
    }
}

