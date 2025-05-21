import type {IsEqual} from './is-equal.d.ts';

/**
Returns a boolean for whether two given types are both true.

Use-case: Constructing complex conditional types where multiple conditions must be satisfied.

@example
```
import type {And} from 'type-fest';

And<true, true>;
//=> true

And<true, false>;
//=> false
```

@author benzaria
@see Or
@category Utilities
*/
export type And<A extends boolean, B extends boolean> = [A, B][number] extends true
	? true
	: true extends [IsEqual<A, false>, IsEqual<B, false>][number]
		? false
		: never;

/**
Returns a boolean for whether all given types are all true.

Use-case: Constructing complex conditional types where multiple conditions must be satisfied.

@example
```
import type {AndAll} from 'type-fest';

And<[true, true, true]>;
//=> true

And<[true, false, true]>;
//=> false
```

@author benzaria
@see OrAll
@category Utilities
*/  
export type AndAll<T extends boolean[]> = T extends [infer A, ...infer Rest]
	? A extends boolean
		? Rest extends boolean[]
			? And<A, AndAll<Rest>>
			: never
		: never
	: true
