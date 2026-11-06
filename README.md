# Mis Libros

- **Estudiante:** Fernando Franco
- **Curso:** Programación II — Tarea: POO y Separación de Responsabilidades
- **Tecnologías:** React Native + Expo + TypeScript

## Descripción
Aplicación móvil que permite visualizar, agregar y eliminar libros. Cada libro tiene `id`, `titulo`, `autor` y `anio`.

## Estructura
```
mis-libros/
├── App.tsx
└── src/
    ├── models/
    │   └── Libro.ts
    ├── repositories/
    │   └── LibroRepository.ts
    ├── services/
    │   └── LibroService.ts
    └── tests/
        └── pruebaSingleton.ts
```
`App.tsx` → `LibroService` → `LibroRepository` → Datos Mock

## Ejecución
```
npm install
npx expo start
```

## Cambios de la Tarea 6: Repository y Singleton

- **Repository:** se creo `src/repositories/LibroRepository.ts`, que ahora administra la colección de libros (obtener, agregar y eliminar) y contiene los datos mock iniciales. `LibroService` ya no guarda la lista: valida los datos y delega en el repositorio. `App.tsx` solo usa el servicio.
- **Singleton:** `LibroRepository` tiene `private static instancia`, constructor `private` y `public static getInstance()`. `LibroService` obtiene el repositorio con `LibroRepository.getInstance()`.
- **Prueba:** `src/tests/pruebaSingleton.ts` llama dos veces a `getInstance()` y muestra en la consola si ambas son la misma instancia (`true`).

## Capturas

## Reflexión

**¿Por qué es conveniente separar la lógica de los libros de App.tsx?**
Porque `App.tsx` debe ocuparse solo de la interfaz (mostrar datos y reaccionar a la interacción del usuario). Si la lógica de los libros estuviera mezclada ahí, el código sería difícil de leer, de probar y de reutilizar; separarla permite cambiar la interfaz sin tocar las reglas del negocio y viceversa.

**¿Qué responsabilidad tiene LibroService?**
Administra la colección de libros: guarda la lista, genera los `id`, valida los datos y ofrece las operaciones de obtener, agregar y eliminar. La interfaz solo llama a sus métodos sin saber cómo se almacenan los libros.

**¿Qué responsabilidad tiene la clase Libro?**
Representa un libro individual: define sus propiedades (`id`, `titulo`, `autor`, `anio`), protege el año con un modificador de acceso privado y validación, y contiene el comportamiento propio del libro (`antiguedad()` y `descripcion()`).
