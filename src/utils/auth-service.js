import Api from "./api";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

const AUTH_TOKEN_KEY = 'X-AUTH-TOKEN';

const loginSubject = new BehaviorSubject(
  !!localStorage.getItem(AUTH_TOKEN_KEY)
);



const AuthService = {
  get isAuthenticated() {
    return loginSubject.value;
  },


  checkEmail(val) {
    return Api.get(`/checkEmail?email=${val}`).pipe(
      map(response => response["data"])
    );
  },

  signup(data) {
    return Api.post("/signup", data).pipe(
      map(response => {
        this.setToken(response.data.token);
        loginSubject.next(true);
      })
    );
  },


  login(data) {
    return Api.post("/login", data).pipe(
      map(response => {
        this.setToken(response.data.token);
        loginSubject.next(true);
      })
    );
  },

  logout() {
    this.clearLocalStorage();
  },

  clearLocalStorage() {
    localStorage.clear();
    loginSubject.next(false);
  },


  setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
};

export default AuthService;
