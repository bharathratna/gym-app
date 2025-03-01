import { Injectable } from '@angular/core';
import { LoggedUser } from '../model/LoggedUser';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
   logged!: LoggedUser;
  constructor() { }
}
