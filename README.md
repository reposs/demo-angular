# Demo Angular - Hexagonal Architecture (Ports & Adapters)

> **⚠️ AVISO DE DERECHOS DE AUTOR Y USO RESTRINGIDO**  
> Este repositorio es un proyecto de demostración técnica creado **única y exclusivamente para exhibición en portafolio profesional**.  
> **NO cuenta con licencia MIT ni ninguna otra licencia de código abierto (Open Source).** Todos los derechos están reservados. Queda expresamente **prohibida su clonación, descarga, copia total o parcial, redistribución, modificación o uso** en proyectos personales o comerciales sin autorización previa y por escrito.

Demo live: [https://reposs.github.io/demo-angular/](https://reposs.github.io/demo-angular/)

Demostración de una aplicación en **Angular 21** aplicando **Arquitectura Hexagonal (Puertos y Adaptadores)**, principios **SOLID**, **Clean Code** y **Domain-Driven Design (DDD)** táctico.

---

## 🏛️ Arquitectura del Proyecto

El proyecto está estructurado estrictamente por capas desacopladas:

```text
src/app/
├── domain/                  # Núcleo de negocio (Cero dependencias de Angular o librerías HTTP)
│   ├── entities/            # Entidades ricas con invariantes y métodos (User)
│   ├── exceptions/          # Excepciones de dominio tipadas (DomainException, InvalidUserException)
│   └── ports/               # Interfaces/contratos de puertos secundarios (UserRepositoryPort, StoragePort)
├── application/             # Casos de uso y orquestación
│   ├── use-cases/           # Casos de uso puros e independientes (GetUsers, CreateUser, etc.)
│   └── tokens/              # InjectionTokens de Angular para abstraer puertos (USER_REPOSITORY, STORAGE_PORT)
├── infrastructure/          # Adaptadores y tecnologías externas
│   ├── adapters/            # Implementación de adaptadores (LocalStorageAdapter, AdapterModeService)
│   ├── repositories/        # Adaptadores de repositorio (UserMockRepository, UserHttpRepository, UserRepositoryProxy)
│   ├── mappers/             # Anti-Corruption Layer (UserMapper DTO <-> Dominio)
│   ├── dto/                 # Tipos y esquemas de APIs externas
│   ├── http/                # Servicio HTTP centralizado y stateless (HttpApiService)
│   └── interceptors/        # Interceptores funcionales (errorInterceptor, langInterceptor, authInterceptor)
├── presentation/            # Capa de presentación (UI)
│   ├── features/            # Páginas y vistas (home, services, contact, about)
│   ├── layout/              # Header, Nav, Footer
│   ├── pages/               # Páginas genéricas (not-found)
│   └── i18n/                # Servicio de internacionalización adaptado
└── shared/                  # Componentes reutilizables de UI (Button, Toast)
```

### 🔄 Patrón de Adaptador Dinámico (Proxy de Repositorio)
La aplicación incluye un `UserRepositoryProxy` que implementa `UserRepositoryPort` y permite conmutar en caliente entre dos adaptadores sin modificar los casos de uso ni los componentes:
1. **UserMockRepository:** Simula latencia y persistencia en memoria con datos mock.
2. **UserHttpRepository:** Se comunica con la API REST externa (`dummyjson.com`) pasando a través del **Anti-Corruption Layer (ACL)** implementado en `UserMapper`.

---

## 🚀 Scripts de Desarrollo

### Servidor de Desarrollo
```bash
npm start
# o: ng serve
```
Disponible en `http://localhost:4200/`.

### Ejecutar Tests Unitarios
Ejecutar todos los tests unitarios con Vitest:
```bash
npm test
```
Para modo interactivo / watch:
```bash
npm run test:watch
```

### Compilar para Producción
```bash
npm run build
```
Genera la compilación optimizada en `./docs/` lista para GitHub Pages.

---

## ✨ Buenas Prácticas Aplicadas
- **Inversión de Dependencias (DIP):** Casos de uso y componentes dependen exclusivamente de `UserRepositoryPort` y `StoragePort`.
- **Anti-Corruption Layer (ACL):** `UserMapper` aísla los contratos externos (camelCase de la API) de las entidades de dominio.
- **Entidades de Dominio Ricas:** Invariantes de validación encapsuladas, métodos inmutables (`withUpdatedInfo`) y formato seguro (`fullName`).
- **Stateless HTTP Service:** Eliminación de race conditions en `HttpApiService`.
- **SSR & Platform Safety:** `LocalStorageAdapter` seguro ante entornos sin `window` / `localStorage`.
- **100% Cobertura de Tests Funcionales:** Pruebas unitarias en Dominio, Casos de Uso, Mappers, Repositorios, Interceptores y Componentes.

---

## ⚖️ Licencia y Términos de Uso

**Todos los derechos reservados © 2026.**

Este repositorio y su contenido son de carácter privado/propietario y se publican con fines **estrictamente demostrativos para revisión técnica en portafolio profesional**:

- 🚫 **Sin Licencia de Código Abierto (No MIT):** Este proyecto **no** está licenciado bajo MIT, Apache, GPL, BSD ni ningún otro esquema de código abierto.
- 🚫 **Prohibición de Clonación y Descarga:** No se concede autorización para clonar, bifurcar (*fork*) para fines ajenos a la evaluación visual, descargar, reproducir o duplicar este repositorio ni ninguna de sus partes.
- 🚫 **Uso Comercial y Personal Prohibido:** Queda prohibida la utilización total o parcial de este código, arquitectura o activos para proyectos comerciales, personales, plantillas, productos derivados o material formativo sin consentimiento explícito y por escrito del autor.
- 👁️ **Acceso Exclusivo de Demostración:** El acceso a este código está concebido únicamente para visualización y evaluación de competencias técnicas en el marco de selección o exhibición de portafolio.
