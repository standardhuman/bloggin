// var each = function(list, callback){
//   if (Array.isArray(list)) {
//     for (var i = 0; i < list.length; i++) {
//       callback(list[i]);
//     }
//   }else{
//     for (var key in list) {
//       if (list.hasOwnProperty(key)) {
//         callback(list[key]);
//       }
//     }
//   }
// };
// var reduce  = function(list, callback, intitial){
//   each(list, function(element){
//     initial = callback(initial, element);
//   });
//   return initial;
// };
// var nums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 1 ];
// //var storage = [];
// var totalSum = nums.reduce(function(acc, curr){
//   console.log("New Card:", curr);
//   console.log("Accumuluated Value:", acc);
//   if (acc < 21) {
//     console.log("'Hit me!'");
//     console.log("Your hand:", acc);
//     return acc + curr;
//   }
//   if (acc === 21) {
//     console.log("Blackjack!");
//     return acc;
//   }
//   if (acc > 21) {
//     console.log("Bust.");
//     return acc + curr;
//   }
// }, 0);

// _.reduce takes a collection, a callback function, and an optional starting value. From the above example, let's kick things off with true.
//the callback function takes two parameters: the accumulator and the current value. The current value will contain each item in our collection as we loop through it. So, for the first loop, it will contain the first item.
//declare a lovely collection, here an array of randomish numbers:
// var ranNums = [4, 2, 9, 8];
// reduce(ranNums, function(acc, curr){
//   //check if the current value is not even
//   if(curr % 2 !== 0){
//   //if it's not even, then change the value of the accumulator to false
//   acc = false;
//   //and return acc to stop the looping;
//   return acc;
//   }
// }, true);
//

//from http://elijahmanor.com/reducing-filter-and-map-down-to-reduce/
//input
var doctors = [{
  number: 1,
  actor: "William Hartnell",
  begin: 1963,
  end: 1966
}, {
  number: 2,
  actor: "Patrick Troughton",
  begin: 1966,
  end: 1969
}, {
  number: 3,
  actor: "Jon Pertwee",
  begin: 1970,
  end: 1974
}, {
  number: 4,
  actor: "Tom Baker",
  begin: 1974,
  end: 1981
}, {
  number: 5,
  actor: "Peter Davison",
  begin: 1982,
  end: 1984
}, {
  number: 6,
  actor: "Colin Baker",
  begin: 1984,
  end: 1986
}, {
  number: 7,
  actor: "Sylvester McCoy",
  begin: 1987,
  end: 1989
}, {
  number: 8,
  actor: "Paul McGann",
  begin: 1996,
  end: 1996
}, {
  number: 9,
  actor: "Christopher Eccleston",
  begin: 2005,
  end: 2005
}, {
  number: 10,
  actor: "David Tennant",
  begin: 2005,
  end: 2010
}, {
  number: 11,
  actor: "Matt Smith",
  begin: 2010,
  end: 2013
}, {
  number: 12,
  actor: "Peter Capaldi",
  begin: 2013,
  end: 2013
}];
// desired output
var drWho = [{
  doctorNumber: "#9",
  playedBy: "Christopher Eccleston",
  yearsPlayed: 1
}, {
  doctorNumber: "#10",
  playedBy: "David Tennant",
  yearsPlayed: 6
}, {
  doctorNumber: "#11",
  playedBy: "Matt Smith",
  yearsPlayed: 4
}, {
  doctorNumber: "#12",
  playedBy: "Peter Capaldi",
  yearsPlayed: 1
}];
// use .filter to return only Doctors after year 2000

// doctors = doctors.filter(function(doctor) {
//   return doctor.begin > 2000;
// }).map(function(doctor) {
//   return{
//     doctor: "#" + doctor.number,
//     playedBy: doctor.actor,
//     yearsPlayed: doctor.end - doctor.begin
//   };
// });
// console.log(doctors);

// doctors = _.chain(doctors);
//   _.filter(function(doctor){
//   return doctor.begin > 2000;
// });
// _.map(function(doctor){
//   return {
//   doctorNumber: "#"+doctor.number,
//   playedBy: doctor.actor,
//   yearsPlayed: doctor.end - doctor.begin + 1
//   };
// });
//
// console.log(newDoctors);

doctors = doctors.reduce(function(memo, doctor){
  if(doctor.begin > 2000){
    memo.push({
      docNumber: "#" + doctor.number,
      docName: doctor.actor,
      docTenure: doctor.end - doctor.begin + 1
    });
  }
  return memo;
}, []);
console.log(JSON.stringify(doctors, null, 4));

// who lotta words to make git notice
