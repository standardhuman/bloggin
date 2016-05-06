## Reducing .reduce

There was a key thing about how `.reduce` works that had eluded me. Specifically, what is the relationship between the *memo*, *current element*, and *start value* parameters? The good news is that if you more or less understand `.map`, `.filter`, `.every`, etc, you are moments away from understanding `.reduce`.

 Up until `.reduce`, the other functions I had learned simply took as parameters the collection and a callback function with an element of the collection as a parameter. Now there's references to an *accumulator*, *memo*, *initial value*, *current value*, etc.

WTF, `.reduce`?

Ready? Let's get into it! We'll start by laying out the terminology you may have seen in various descriptions of `.reduce`:

`memo` is the same as `accumulator`<br>
`current` is the same as `current element`  is the same as `element`<br>
`starting value` is the same as `initial value` is the same as `context`

 and now the inner workings of `.reduce`:

    var reduce = function(collection, callback, initial){
    	each(collection, function(element){
      	initial = callback(initial, element);
      });
      return initial;
    };

The important part in there, and the part that confused me the most, is the `initial = callback(initial, element);` line. See how that line runs the callback function on `initial` (aka `startVal`) and `element` (aka `current`) then sets the whole shebang equal to the `initial` value again? Let's put it into practical terms by applying `.reduce` to real values:

Goal: simply return the sum of the numbers in nums:

    var nums = [1, 2, 3, 4, 5, 6];

  Set the result of the `.reduce` function to a variable, `totalSum`. Pass in the collection `nums`, an anonymous callback function, *and* a starting value. For the callback, pass in a name for the value that will be updated on each pass of the loop, in this case we'll call it `acc`, short for *accumulator*. The other value we want to keep in hand as the callback function does it's thing is the element in the array that the loop is currently on; we'll call it `curr` for *current*.  Finally, we'll return the result of adding our accumulated value and the current value each time we loop.

    var totalSum = reduce(nums, function(acc, curr)
    {
      return acc + curr;
    }, []);

Don't forget to call the function and log the results to see if it works:

    console.log(totalSum); => 21

  In this case, because we wanted to store our results in an array, we started with an empty array. That will be the thing that the `.each` loop starts with. The next value it will move on to will be the first one in the array `nums`. Get it? So if the callback is simply adding one value to the next, then on the second loop it will do: `[] + 1` which returns `[1]`, then `[1] + 2` which returns `[3]` and so on.


Did you know we could do that? That was news to me! I thought the starting value pretty much had to be a number. Can you think of other values we might set it to? How about an empty object `{}`, or a boolean `true`? Yes! And if seeing that we can set it to `true` made you think of using a "state" or "flag" variable to track a value in `.some` or `.every`, you are spot on. And if setting the starting value to an empty array prompts nostalgia for the storage variable in `.map`, you'll understand why `.reduce` is often referred to as the "multitool of functions".

So now what of the relationship with acc and curr? Well, on loop one, they are all the same thing, `acc` is the same as `initial`. Then `acc` becomes something of a storage tank for our callback output, and `curr` marches forward, always morphing into the next value in our input array.

From the example above:

First loop:<br>
`initial` equals `[]`<br>
`acc` equals `[]`<br>
`curr` equals `[]`

Second loop:<br>
`acc` equals `[]`<br>
`curr` equals `1`

Third loop:<br>
`acc` equals `[1]`<br>
`curr` equals `2`

Fourth loop:<br>
`acc` equals `[3]`<br>
`curr` equals `4`

...and so on.

Watch the value changing in action:
<iframe width="800" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=var+each+%3D+function(list,+callback%29%7B%0A%09if(Array.isArray(list%29%29%7B%0A++%09for(var+i+%3D+0%3B+i+%3C+list.length%3B+i%2B%2B%29%7B%0A++%09%09callback(list%5Bi%5D,+i,+list%29%3B%0A++++%7D%0A++%7Delse%7B%0A++++for(var+key+in+list%29%7B%0A++++++callback(list%5Bkey%5D,+key,+list%29%3B%0A++++%7D%0A++%7D%0A%7D%3B%0A%0Avar+reduce+%3D+function(collection,+callback,+initial%29%7B%0A++++%09each(collection,+function(element%29%7B%0A++++++%09initial+%3D+callback(initial,+element%29%3B%0A++++++%7D%29%3B%0A++++++return+initial%3B%0A++++%7D%3B%0A%0Avar+nums+%3D+%5B1,+2,+3,+4,+5,+6%5D%3B%0A%0Avar+totalSum+%3D+reduce(nums,+function(acc,+curr%29%7B%0A++++++return+acc+%2B%3D+curr%3B%0A++++%7D,+%5B%5D%29%3B%0A%0Aconsole.log(totalSum%29%3B&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&textReferences=false&py=js&rawInputLstJSON=%5B%5D&curInstr=54&codeDivWidth=350&codeDivHeight=400"> </iframe>

Did this help or further obfuscate? Let me know in comments!
