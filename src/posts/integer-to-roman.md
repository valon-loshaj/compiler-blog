# Integer to Roman

2024-02-01

I worked on some Leetcode problems today. Well, mainly one, and it had me stuck for a bit. I wrote the following piece outlining how I managed to get 'un-stuck' and eventually get the problem solved.

12. Integer to Roman
This challenge requires you to write a function that takes in a number and spits out the roman numeral equivalent. At first it sounds pretty simple, but of course roman numerals have this weird behavior for numbers like 4 and 9 and many others where the first numeral is smaller than the next, signifying that you have to subtract the current numeral from the next one. For example if you have the number 4, you don't write it as 'IIII' but instead it's 'IV'.

I started the solution by defining a map of key value pairs where the key was the number and the value was the roman numeral value. I figured this was a good place to start because I'll need the map in order to establish the link between the numbers and their respective roman numerals. The next thing I did was define the romanNumeral variable which is a string, and will be used to define the final roman numeral which will be returned. With that I felt like I got the easy stuff out of the way.

The tough part was figuring out how to add the correct roman numerals to the romanNumerals string variable in the correct order so that I can create the correct roman numeral for each number. What I noticed when looking through the roman numerals was that if I were to sort all of the number values for the roman numerals in descending order, I could possibly loop through them and depending on whether the input number provided to the function was greater than the current number in the array I can get a pretty good idea of when to add a particular roman numeral to the final roman numeral string.

So I wrote a for loop with a nested while loop which handles the greater than operator logic and it also subtracts the value of the roman numeral from the original num which is really important to make sure the loop does what I need it to do and evaluates the number in it's entirety. This approach worked well...at first. But the edge cases were still not satisfied. Numbers like '9' and '4' were still being generated incorrectly.

After banging my head trying to build in conditional logic within the while loop it occurred to me that I could actually simplify this by including the edge cases in the original map and referencing the numbers when executing the 'get' method on the map. So I added the edge cases which were 4, 40, 400, 9, 90 and 900 to the map and ran through the logic again. Bingo! That managed to do the trick!
