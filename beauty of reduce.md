# The beauty of _.reduce

When I was first learning reduce, I somehow developed this notion that what reduce does is:

>"reduce takes in an array and returns a single value. "

When I read that, I imagined that reduce had to intake something like:

    var myArray = [1, 2, 3, 4, 5];

and had to output something like:

    var singleVal = [4];

Well, that's really only kinda true, *because it does so much more.*

When I was enrolled with Telegraph Academy Prep, I was taught to walk and talk my way through the code, verablizing exactly what each value is at each moment. It's hard and therefore can be rather unpleasant, and that's why it's been rather effective at helping me learn. I call this process *telling the story* of the code. Let's tell the story of reduce:

        var reduce  = function(list, callback, startVal){
          each(list, function(element){
            startVal = callback(startVal, element);
          });
          return startVal;
        };

Let's start with a quick overview of what reduce does, in terms of inputs and outputs.  You can input any kind of collection or singular value into reduce, then, using your callback function, manipulate or conditionally evaluate the values in your collection one by one. As we do so, we can use the accumulator to either store the results of the manipulations or to track the state of your conditional evaluations. Finally, reduce will always return the final value of the accumlator.

One way I found helpful to think about reduce is how it's similar to \_.map, \_.some, \_.every, etc.

Remember variables that we use as flags to track the state of our boolean value in \_.every and \_.some?

    var flag = "true";
    var state = "true";

And remember the storage variable that we push our results into and then return in \_.map?

    var storage = [];

With reduce, we don't need to declare these extra variables because reduce has a univeral variable built right in, often called the **accumulator**, which is *starts out* as the same as the startingValue.

The **accumulator** is a variable, and it can collect all kinds of things or simply hold and track a boolean value. Sound familiar? Stay with me now.

The startingValue variable can be anything. A boolean, an object, an array, basically anything for which you might use a flag, state, or storage variable.

So lets say you start with startingValue as true and you want to track whether all the numbers in our input array are even.

The first thing that reduce will do is to set the accumulator variable equal to whatever we want to start off with, in this case, "true". We will then write a statement that checks each number to see if it's divisible by 2 (is it even?) and, if so, do nothing, because if all the numbers are even, we simply want to return the "true" that we started out with. However, if we hit upon an odd number, then we want to change the value of *acc* to "false", and immediately return (and remember, return will stop the function and kick any attached value out to the function caller) the function. Enough talk, let's write some code (and some gratuitous psuedocode).

    // _.reduce takes a collection, a callback function, and an optional starting value. From the above example, let's kick things off with true.
    //the callback function takes two parameters: the accumulator and the current value. The current value will contain each item in our collection as we loop through it. So, for the first loop, it will contain the first item.
    //declare a lovely collection, here an array of randomish numbers:
    var ranNums = [4, 2, 9, 8];
    _.reduce(ranNums, function(acc, curr){
      //check if the current value is not even
      if(!(curr % 2 === 0)){
      //if it's not even, then change the value of the accumulator to false
      acc = false;
      //and return acc to stop the looping;
      return acc;
      }
    }, true);
