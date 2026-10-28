type PrefixedStringArray<T extends string, A extends readonly string[], S extends string = "/"> = {
    [K in keyof A]: K extends `${number}` ? `${T}${S}${A[K]}` : A[K];
};

/**
 * Toma un prefijo, un arreglo de palabras y un separador, y retorna un nuevo arreglo 
 * donde cada palabra está precedida por el prefijo y unida por el separador.
 *
 * @template T - El tipo del prefijo (inferido como string literal).
 * @template A - El tipo de las palabras del arreglo (inferido como string literals).
 * @template S - El tipo del separador (por defecto "/" si se omite).
 * 
 * @param {T} prefix - El texto o prefijo que se colocará al inicio de cada palabra.
 * @param {A[]} words - Un arreglo de strings con las palabras a procesar.
 * @param {S} [separator=":/"] - El carácter o string utilizado para separar el prefijo de cada palabra.
 * 
 * @returns {PrefixedStringArray<T, A, S>} Un nuevo arreglo con las palabras ya prefijadas y tipadas estrictamente.
 * 
 * @example
 * // Retorna: ['users/register', 'users/details']
 * const rutas = addPrefix("users", ["register", "details"], "/");
*/
const addPrefix = <T extends string, const A extends readonly string[], S extends string = "/">(
    prefix: T,
    words: A,
    separator: S = "/" as S
): PrefixedStringArray<T, A, S> => {
    return words.map((w) => `${prefix}${separator}${w}`) as unknown as PrefixedStringArray<T, A, S>;
};

