import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './state/user/user.model';
import { State } from './state/user/user.reducer';
import { Store } from '@ngrx/store';
import * as fromUser from './state/user/user.reducer';
import { randFullName, randUuid } from '@ngneat/falso';
import { UserActions } from './state/user/user.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrx-entity';
  users$: Observable<User[]>;
  userId: string = '';
  userId2: string = '';

  constructor(private store: Store<State>) {
    this.users$ = this.store.select(fromUser.selectAll);
  }

  addOne() {
    const user: User = {
      id: randUuid(),
      name: randFullName(),
    };
    this.store.dispatch(UserActions.addUser({ user }));
    this.userId = user.id;
  }

  upsertUser() {
    const user: User = {
      id: randUuid(),
      name: randFullName(),
    };
    this.store.dispatch(UserActions.upsertUser({ user }));
  }

  addUsers() {
    const users: User[] = [
      {
        id: randUuid(),
        name: randFullName(),
      },
      {
        id: randUuid(),
        name: randFullName(),
      },
    ];
    this.store.dispatch(UserActions.addUsers({ users }));
    this.userId = users[0].id;
    this.userId2 = users[1].id;
  }

  upsertUsers() {
    const users: User[] = [
      {
        id: randUuid(),
        name: randFullName(),
      },
      {
        id: randUuid(),
        name: randFullName(),
      },
    ];
    this.store.dispatch(UserActions.upsertUsers({ users }));
  }

  updateUser() {
    const user: Partial<User> = {
      name: `${randFullName()} (updated)`,
    };
    this.store.dispatch(
      UserActions.updateUser({ user: { id: this.userId, changes: user } })
    );
  }

  updateUsers() {
    const users: Update<User>[] = [
      {
        id: this.userId,
        changes: {
          name: `${randFullName()} (updated 1)`,
        },
      },
      {
        id: this.userId2,
        changes: {
          name: `${randFullName()} (updated 2)`,
        },
      },
    ];
    this.store.dispatch(UserActions.updateUsers({ users }));
  }

  deleteUser() {
    this.store.dispatch(UserActions.deleteUser({ id: this.userId }));
  }

  deleteUsers() {
    this.store.dispatch(UserActions.deleteUsers({ ids: [this.userId, this.userId2] }));
  }

  loadUsers() {
    const users: User[] = [
      {
        id: randUuid(),
        name: randFullName(),
      },
      {
        id: randUuid(),
        name: randFullName(),
      },
    ];
    this.store.dispatch(UserActions.loadUsers({ users }));
  }

  clearUsers() {
    this.store.dispatch(UserActions.clearUsers());
  }
}
