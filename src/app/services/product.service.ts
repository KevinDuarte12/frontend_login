import { Injectable } from '@angular/core'; // Importa el decorador Injectable para definir un servicio
import { environment } from '../../environment/environment'; // Importa el archivo de configuración del entorno
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP y HttpHeaders para manejar headers
import { Observable } from 'rxjs'; // Importa Observable para manejar flujos de datos asíncronos
import { product } from '../interfaces/product'; // Importa la interfaz product para tipar los datos

@Injectable({
  providedIn: 'root' // Indica que el servicio está disponible en toda la aplicación (singleton)
})
export class ProductService {

  private myAppUrl: string; // Variable para almacenar la URL base de la aplicación
  private myApiUrl: string; // Variable para almacenar la ruta de la API

  constructor(private http: HttpClient) { // Inyecta el servicio HttpClient para hacer solicitudes HTTP
    this.myAppUrl = environment.endpoint; // Asigna la URL base desde el archivo de entorno
    this.myApiUrl = 'api/product'; // Asigna la ruta de la API para productos
  }

  getProducts(): Observable<product[]> {
    // Método para obtener la lista de productos
    return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}`); // Realiza una solicitud GET a la API
  }
}