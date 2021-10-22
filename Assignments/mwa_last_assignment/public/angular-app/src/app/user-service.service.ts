import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './login/login.component'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiBaseUrl: string= "http://localhost:3000/api";
  constructor(private http:HttpClient) { }

  public addUser (user:User) : Promise<User>  {
    console.log("inside user service register");
    
    const url: string= this.apiBaseUrl+"/users/register/";
    return this.http.post(url, user).toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  login (user:User) : Promise<User>  {
    console.log("inside user service login");
    
    const url: string= this.apiBaseUrl+"/users/login";
    return this.http.post(url, user).toPromise()
      .then(response => response as User)
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.log("Something went wrong ", error);
    return Promise.reject(error.message || error);
} 


}
