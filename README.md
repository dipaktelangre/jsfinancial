# jsfinancial

<div class="wrappper">

 <h2 id="intro">Introduction</h2>

 <p>Pure Javascript library for Financial calculations</p>

 <h2 id="start">Getting Started</h2>

 <pre><code>npm i jsfinancial --save</code></pre>

 <p><strong>or</strong></p>

 <ul>
   <li>Clone repo from here.</li>
   <li>Extract the file finance.js from the project and include it in your application on the client side.</li>
 </ul>

 <h2 id="example-usage">Example Usage</h2>

var Finance = require('jsfinancial');
var cal = new Finance();
// To calculate EMI
// 10 L loan for 5 yrs with 10% anual intrest
cal.EMI(1000000, 10 / 12, 12 \* 5);  
// => 21247.04

### Typescript

    import { Finance } from 'financejs'
    let cal = new Finance();
    // To calculate EMI
    cal.EMI(1000000, 10 / 12, 12 * 5);
    // => 21247.04

 <h2 id="tests">Tests</h2>

 <pre><code>npm test</code></pre>

<h2 id="tests">Available Methods</h2>

 <h3 id="Emi">EMI<br>

<code class="highlight">finance.AM(principal, rate, total number of payments, [type]);</code></h3>

 <p>Calculate EMI (Equated Monthly Installment) of any given loan amount (principal) for given tenure and intrest rate</p>
 
 <pre><code># EMI
    cal.EMI(1000000, 10 / 12, 12 * 5);
    // => 21247.04
</code></pre>

### Contributing

Contributions are welcome

### To Do

- Grow library by adding more function
