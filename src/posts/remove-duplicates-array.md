# Remove Duplicates from Array

**What is the challenge?** For this challenge, we receive an array of integers and we have to ensure there are at most two replicas of every integer within the array. So if a number such as ‘1’ appears three times within the array, the third instance of the number will be removed from the array. If a number either does not appear at all, or if the number only appears once, it will remain unchanged.

**My first attempt at solving this** involved looping through the array of numbers using a for each loop and checking if the count of each number was greater than two. I did this by defining a count variable and assigning it a value through the JavaScript filter method.

```
let count:number = nums.filter(j => j === value).length;
```

If the number appeared more than twice (count was greater than 2) then I used the splice method along with the current index in order to remove the occurrences of that number which was possible because I had the index of the number within the array.

```
if (count > 2) {
    nums.splice(nums.indexOf(value), 1);
}
```

**This approach feel apart** once I threw a decently sized array at it. The approach worked fine for small arrays of just a dozen numbers with a few repetitions. However, the core flaw in this approach lies in the modification of the array while looping through it. As the for loop continues from index to index, we are also using ‘splice’ to modify the array which means the index being looped over is being altered. There are also some performance considerations related to this approach after thinking through it. When using the filter method within the for loop, we are technically looping within a loop which isn’t ideal.

**To modify my approach**, I knew I needed a way to identify not only the value within the array, but also the amount of times the value repeats throughout the array. If I could establish that piece of state while running the program, then I can loop through the array and reference this piece of state to decide whether to remove the item from the array. What I needed was a map!

**My final approach involved a two step approach**, first I would declare a map to hold the state of each number in the array along with the number of times it repeats.

```
    const counts = new Map<number, number>();
    nums.forEach(num => {
        counts.set(num, (counts.get(num) || 0) + 1);
    });
```

The second part of the approach involves looping through the map which has a key set that represents each number in the array and the values represent the number of times that number appears in the array. So looping through the map will tell me exactly when to leave the item in the array as is or remove it from the array; if it appears more than twice. This approach avoids looping through the original array while altering it. After throwing a few large arrays at this approach I noticed that it worked like a charm. Bingo-bango all done!

```
    for (let [num, count] of counts) {
        if (count > 2) {
            let toRemove = count - 2; // Calculate how many to remove
            let index = 0;
            while (toRemove > 0) {
                index = nums.indexOf(num, index); // Find next index of num
                nums.splice(index, 1); // Remove 1 occurrence
                toRemove--;
            }
        }
    }
```
