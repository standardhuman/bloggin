## Reducing .reduce

There was a key thing about how `.reduce` works that had eluded me. Specifically, what is the relatiionship between the *memo*, *current element*, and *start value* parameters? The good news is that if you more or less understand `.map`, `.filter`, `.every`, etc, you are moments away from understanding `.reduce`.

 Up until `.reduce`, the other functions I had learned simply as took as parameters the collection and a callback function with an element of the collection as a parameter. Now there's references to an *accumulator*, *memo*, *initial value*, *current value*, etc.

WTF, `.reduce`?

Ready? Let's get into it! We'll start by laying out the terminology you may have seen in various descriptions of `.reduce`:

`memo` is the same as `accumulator`
`current` is the same as `current element`  is the same as `element`
`starting value` is the same as `intial value` is the same as `context`

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

  Set the result of the `.reduce` function to a variable, `totalSum`. Pass in the collection `nums`, an anonymous callback function, *and* a starting value. For the callback, pass in a name for the value that will be updated on each pass of the loop, in this case we'll call it `acc`, short for *accumulator*. The other value we want to keep in hand as the callback function does it's thing is the element in the array that the loop is currenty on; we'll call it `curr` for *current*.  Finally, we'll return the result of adding our accumulated value and the current value each time we loop.

    var totalSum = reduce(nums, function(acc, curr)
    {
      return acc + curr;
    }, []);

Don't forget to call the function and log the results to see if it works:

    console.log(totalSum); => 21

  In this case, beacause we wanted to store our results in an array, we started with an empty array. That will be the thing that the `.each` loop starts with. The next value it will move on to will be the first one in the array `nums`. Get it? So if the callback is simply adding one value to the next, then on the second loop it will do: `[] + 1` which returns `[1]`, then `[1] + 2` which returns `[3]` and so on.


Did you know we could do that? That was news to me! I thought the starting value pretty much had to be a number. Can you think of other values we might set it to? How about an empty object `{}`, or a boolean `true`? Yes! And if seeing that we can set it to `true` made you think of using a "state" or "flag" variable to track a value in `.some` or `.every`, you are spot on. And if setting the starting value to an empty array prompted reminiscings about the storage variable in `.map`, you'll understand why `.reduce` is often referred to as the "multitool of functions".

But, you might be thinking, that's just the starting value. What's the relationship with acc and curr? Well, on loop one, they are all the same thing, `acc` is the same as `initial`. Then `acc` becomes something of a storage tank for our callback output, and `curr` marches forward, always morphing into the next value in our input array.

From the example above:

First loop:
`initial` equals `[]`
`acc` equals `[]`
`curr` equals `[]`

Second loop:
`acc` equals `[]`
`curr` equals `1`

Third loop:
`acc` equals `[1]`
`curr` equals `2`

Fourth loop:
`acc` equals `[3]`
`curr` equals `4`

...and so on.
