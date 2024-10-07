# @heymp/safe-fetch

A minimal fetch wrapper that mimics functionality of the new [ECMAScript Safe Assignment Operator Proposal](https://github.com/arthurfiorette/proposal-safe-assignment-operator).
Return errors as values from your fetch calls and `text()` and `json()` methods on the fetch `Response` object.

Example
```js
import { safeFetch } from '@heymp/safe-fetch';

export async function getTodos() {
  const [requestError, response] = await safeFetch('https://jsonplaceholder.typicode.com/todos');
  
  if (requestError) {
    // handle request error
  }

  const [parseError, data] = await response.json();
  
  if (parseError) {
    // handle parse error
  }

  return data;
}
```
