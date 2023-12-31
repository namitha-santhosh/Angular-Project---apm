import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/api/cart/add-product'; // Replace with your Symfony API endpoint URL

  constructor(private http: HttpClient, private authService: AuthService) {}


  /* addToCart(productId: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrlWithProductId = `http://127.0.0.1:8000/api/cart/add-product/${productId}`;
    return this.http.post(apiUrlWithProductId, {}, { headers });
  } */

  addToCart(productId: number, quantity: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrlWithProductId = `http://127.0.0.1:8000/api/cart/add-product/${productId}`;
    console.log(quantity);
    return this.http.post(apiUrlWithProductId, { quantity }, { headers });
}


  fetchCartData(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>('http://127.0.0.1:8000/api/cart/view-cart', { headers });
  }

  removeProduct(productId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
     return this.http.post<any>(`http://127.0.0.1:8000/api/cart/remove-product/${productId}`, {}, { headers });
  }
  
  private baseUrl = 'http://127.0.0.1:8000/api/cart/total-price'
  
  getCartTotalPrice(): Observable<{ total_price: number }> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ total_price: number }>(`${this.baseUrl}`, {headers});
  }
}
