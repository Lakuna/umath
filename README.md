[![Test](https://github.com/Lakuna/umath/actions/workflows/test.yml/badge.svg)](https://github.com/Lakuna/umath/actions/workflows/test.yml)

# μMath

A lightweight math library.

Documentation is automatically generated and uploaded to [the website](https://umath.lakuna.pw/).

The source code can be found on [the GitHub repository](https://github.com/Lakuna/umath).

## Linear Algebra API

In addition to exporting convenience classes representing a variety of linear algebra-related data types, each such type also has its own module
that exports individual functions. For example, a two-by-two matrix can be imported in two different ways:

```ts
import { Matrix2 } from "@lakuna/umath";
```

```ts
import Matrix2 from "@lakuna/umath/Matrix2";
```

Using the convenience class, multiplying two two-by-two matrices would look like this:

```ts
import { Matrix2 } from "@lakuna/umath";

const a = Matrix2.fromValues(0, 1, 2, 3);
const b = Matrix2.fromValues(4, 5, 6, 7);
const c = a.multiply(b);
```

Using the raw functions, it could instead look like this:

```ts
import { multiply } from "@lakuna/umath/Matrix2";

const a = [0, 1, 2, 3];
const b = [4, 5, 6, 7];
const c = multiply(a, b, [0, 0, 0, 0]);
```

You can compare the performance of the raw functions versus the convenience classes on jsPerf.app [here](https://jsperf.app/qubahu).
