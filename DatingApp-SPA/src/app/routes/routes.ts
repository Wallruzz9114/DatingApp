import { MessagesResolver } from './../resolvers/messages.resolver';
import { LikesResolver } from './../resolvers/likes.resolver';
import { PersonEditResolver } from './../resolvers/person-edit.resolver';
import { PersonEditComponent } from '../components/people/person-edit/person-edit.component';
import { PeopleListResolver } from './../resolvers/people-list.resolver';
import { PeopleDetailsResolver } from './../resolvers/people-details.resolver';
import { PeopleDetailsComponent } from './../components/people/people-details/people-details.component';
import { AuthenticationGuard } from './../guards/authentication.guard';
import { LikesComponent } from './../components/likes/likes.component';
import { MessagesComponent } from './../components/messages/messages.component';
import { PeopleListComponent } from '../components/people/people-list/people-list.component';
import { HomeComponent } from './../components/home/home.component';
import { Routes } from '@angular/router';
import { UnsavedChangesGuard } from '../guards/unsaved-changes.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'people', component: PeopleListComponent, resolve: { people: PeopleListResolver } },
      { path: 'people/:id', component: PeopleDetailsComponent, resolve: { user: PeopleDetailsResolver } },
      { path: 'person/edit', component: PersonEditComponent, resolve: { user: PersonEditResolver }, canDeactivate: [UnsavedChangesGuard] },
      { path: 'messages', component: MessagesComponent, resolve: { messages: MessagesResolver } },
      { path: 'likes', component: LikesComponent, resolve: { people: LikesResolver } },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
