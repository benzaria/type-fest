import type {IsEqual} from './is-equal.d.ts';

/**
Returns a boolean for whether either of two given types are true.

Use-case: Constructing complex conditional types where one of multiple conditions must be satisfied.

@example
```
import type {Or} from 'type-fest';

Or<true, false>;
//=> true

Or<false, false>;
//=> false
```

@author benzaria
@see And
@category Utilities
*/
export type Or<A extends boolean, B extends boolean> = [A, B][number] extends false
	? false
	: true extends [IsEqual<A, true>, IsEqual<B, true>][number]
		? true
		: never;

/**
Returns a boolean for whether either of all given types are true.

Use-case: Constructing complex conditional types where one of multiple conditions must be satisfied.

@example
```
import type {OrAll} from 'type-fest';

Or<[true, false, false]>;
//=> true

Or<[false, false, false]>;
//=> false
```

@author benzaria
@see AndAll
@category Utilities
*/
export type OrAll<T extends boolean[]> = T extends [infer A, ...infer Rest]
	? A extends boolean
		? Rest extends boolean[]
			? Or<A, OrAll<Rest>>
			: never
		: never
	: false