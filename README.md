
<!--#echo json="package.json" key="name" underline="=" -->
load-first-avail-module
=======================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Based on a module load function (typically your module&#39;s `require`, or a
proxy for your `import`), create a function that promises to load the first
available module from an array of candidate module names, probed in series.
<!--/#echo -->


* Automatically retries each candidate with `.mjs` added.


Usage
-----

```javascript
import makeFirstAvailModLoader from 'load-first-avail-module';
const importFirstAvailable = makeFirstAvailModLoader(id => import(id));

async function totallyBogus() {
  const someZip = await importFirstAvailable([
    './7zip',
    './zip',
    './gzip',
  ]);
  return someZip('hello world');
}
```


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
