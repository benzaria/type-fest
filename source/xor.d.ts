
/**
Returns `false` if the giving type is `never`, else return it.
*/
export type IfNever<T> = [T] extends [never] ? false : T;

/**
Returns a boolean for whether either of two given types are true.

Use-case: Constructing complex conditional types where multiple conditions must be satisfied.

@example
```
import type {Xor} from 'type-fest';

type TT = Xor<true, false>;
//=> true

type TF = Xor<true, false>;
//=> true

type FT = Xor<false, true>;
//=> true

type FF = Xor<false, false>;
//=> false
```

Note: When `boolean` is passed as an argument, it is distributed into separate cases, and the final result is a union of those cases.
For example, `Xor<false, boolean>` expands to `Xor<false, true> | Xor<false, false>`, which simplifies to `true | false` (i.e., `boolean`).
@example
```
import type {Xor} from 'type-fest';

type A = Xor<false, boolean>;
//=> boolean

type B = Xor<boolean, false>;
//=> boolean

type C = Xor<true, boolean>;
//=> true

type D = Xor<boolean, true>;
//=> true

type E = Xor<boolean, boolean>;
//=> boolean
```

Note: If `never` is passed as an argument, it is treated as `false` and the result is computed accordingly.

@example
```
import type {Xor} from 'type-fest';

type A = Xor<true, never>;
//=> true

type B = Xor<never, true>;
//=> true

type C = Xor<false, never>;
//=> false

type D = Xor<never, false>;
//=> false

type E = Xor<boolean, never>;
//=> boolean

type F = Xor<never, boolean>;
//=> boolean

type G = Xor<never, never>;
//=> false
```

@see And, Or
*/
export type Xor<A extends boolean, B extends boolean> = _Xor<IfNever<A>, IfNever<B>>; // `never` is treated as `false`

export type _Xor<A extends boolean, B extends boolean> =
	A extends true
		? B extends true
			? false
			: true
		: B extends true
			? true
			: false;

type T = Xor<never, never>
//	  ^?

export {};