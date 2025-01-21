export const quote = ["A hug is always the right size - Winnie The Pooh", 
    "After all, one can't complain. I have my friends. - Eeyore", 
    "The things that make me different are the things that make me, me. -Piglet",
    "Sometimes the smallest things take up the most room in your heart. -Winnie The Pooh", 
    "People say nothing is impossible, but I do nothing every day. -Winnie the Pooh", 
    "Any day spent with you is my favorite day. So, today is my new favorite day.—Winnie the Pooh"]

export const getRandomQuote = Math.floor(Math.random()*quote.length);

export let randomquote = quote[getRandomQuote];