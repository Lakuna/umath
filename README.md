[![CodeQL](https://github.com/Lakuna/umath/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Lakuna/umath/actions/workflows/github-code-scanning/codeql)
[![Publish](https://github.com/Lakuna/umath/actions/workflows/publish.yml/badge.svg)](https://github.com/Lakuna/umath/actions/workflows/publish.yml)
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

const a: Matrix2 = Matrix2.fromValues(0, 1, 2, 3);
const b: Matrix2 = Matrix2.fromValues(4, 5, 6, 7);
const c: Matrix2 = a.multiply(b);
```

Using the raw functions, it could instead look like this:

```ts
import { type Matrix2Like, multiply } from "@lakuna/umath/Matrix2";

const a: Matrix2Like = [0, 1, 2, 3];
const b: Matrix2Like = [4, 5, 6, 7];
const c: Matrix2Like = multiply(a, b, [0, 0, 0, 0]);
```
