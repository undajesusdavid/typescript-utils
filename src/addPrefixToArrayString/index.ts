/**
 * Tipo condicional mapeado que toma una tupla o array de strings y le antepone 
 * un prefijo y un separador a cada uno de sus elementos literales.
 * 
 * Preserva las propiedades nativas del array (como `length`) aplicando la 
 * transformación únicamente a las claves numéricas.
 * 
 * @template T - El tipo del prefijo (string literal).
 * @template A - El array o tupla de strings de entrada (inferido preferiblemente como `readonly`).
 * @template S - El separador opcional a utilizar (por defecto `"/"`).
 */
type PrefixedStringArray<T extends string, A extends readonly string[], S extends string = "/"> = {
    [K in keyof A]: K extends `${number}` ? `${T}${S}${A[K]}` : A[K];
};

/**
 * Añade un prefijo y un separador personalizado a cada elemento de un array o tupla de strings,
 * manteniendo la precisión de los tipos literales gracias al uso de tuplas de solo lectura.
 * 
 * @template T - Tipo del prefijo que se añadirá al inicio de cada elemento.
 * @template A - Tipo de la tupla o array de entrada (se recomienda pasar un array con `as const`).
 * @template S - Tipo del separador (por defecto `"/"`).
 * 
 * @param {T} prefix - El texto o prefijo que se antepondrá a los elementos.
 * @param {A} words - El conjunto de palabras o rutas que serán transformadas.
 * @param {S} [separator="/"] - El separador opcional que une el prefijo con cada palabra.
 * 
 * @returns {PrefixedStringArray<T, A, S>} Un nuevo array con los elementos prefijados, preservando su tipado estricto.
 * 
 * @example
 * const rutas = ["usuario", "perfil", "config"] as const;
 * const resultado = addPrefix("api", rutas, "/");
 * // Resultado en runtime: ["api/usuario", "api/perfil", "api/config"]
 * // Tipo resultante: readonly ["api/usuario", "api/perfil", "api/config"]
 */
const addPrefix = <T extends string, const A extends readonly string[], S extends string = "/">(
    prefix: T,
    words: A,
    separator: S = "/" as S
): PrefixedStringArray<T, A, S> => {
    return words.map((w) => `${prefix}${separator}${w}`) as unknown as PrefixedStringArray<T, A, S>;
};