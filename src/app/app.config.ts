import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // Importa ApplicationConfig y provideZoneChangeDetection para configurar la aplicación
import { provideRouter } from '@angular/router'; // Importa provideRouter para configurar el enrutador
import { routes } from './app.routes'; // Importa las rutas definidas en el archivo app.routes.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importa provideHttpClient y withInterceptors para configurar el cliente HTTP
import { provideAnimations } from '@angular/platform-browser/animations'; // Importa provideAnimations para habilitar animaciones
import { provideToastr } from 'ngx-toastr'; // Importa provideToastr para configurar las notificaciones de Toastr
import { authInterceptor } from '../app/utils/add-token.interceptor'; // Importa el interceptor de autenticación

export const appConfig: ApplicationConfig = {
  providers: [
    // Configura la detección de cambios en Angular para mejorar el rendimiento
    provideZoneChangeDetection({ eventCoalescing: true }), 

    // Configura el enrutador con las rutas definidas
    provideRouter(routes),

    // Configura el cliente HTTP con interceptores
    provideHttpClient(
      withInterceptors([authInterceptor]) // Añade el interceptor de autenticación
    ),

    // Habilita las animaciones en la aplicación
    provideAnimations(),

    // Configura Toastr para mostrar notificaciones
    provideToastr({
      timeOut: 4000, // Duración de la notificación (4 segundos)
      positionClass: 'toast-top-center', // Posición de la notificación (centrada en la parte superior)
      preventDuplicates: true, // Evita notificaciones duplicadas
    })
  ]
};