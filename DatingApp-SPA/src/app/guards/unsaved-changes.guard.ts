import { PersonEditComponent } from './../components/people/person-edit/person-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<PersonEditComponent> {

  canDeactivate(component: PersonEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Are you sure? Any unsaved changes will be lost');
    }

    return true;
  }

}
