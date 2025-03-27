/**
 * Maps an iterable asynchronously with concurrency control.
 * @template T The type of elements in the input iterable.
 * @template U The type of elements returned by the mapper function.
 * @param iterable The iterable to map over (e.g., array, Set, etc.).
 * @param mapper An async function that transforms each element.
 * @param concurrency The maximum number of concurrent mapper executions (default: Infinity).
 * @returns A promise that resolves to an array of mapped results.
 * @throws {TypeError} If mapper is not a function.
 */
declare function pMap<T, U>(
  iterable: Iterable<T>,
  mapper: (value: T, index: number) => Promise<U>,
  concurrency?: number
): Promise<U[]>;