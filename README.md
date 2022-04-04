# Sudoku Guessr

## How to play
Fill out the sudoku to reveal part of a image. Guess as many images as possible. The users with the highest number of images guessed gets a spot in the Hall of Fame!

## Purpose
Originally built for the Repl hackathon, but we have plans to rewrite certain parts of the game and launch it to the general public.

## Features
  - Form to get user input
  - Sudoku Game Board
  - Image which is revealed as the Sudoku is played
  - Leaderboard
  - Mobile Responsive

## Tech Used
We used Repl DB for our database. Includes four APIS: one for generating the sudoku and three for generating images. Used React for frontend and Node JS for backend

## How it works
We first grab data from the user via the game form. We then grab an image from the corresponding API and set it behind the game board. After the game is completely over, we store the users position in a list(grabbed from the DB in the backend) and sort the list. We then conditionally render whether or not the user is top ten and also render the top ten.

## Screenshots
![Screenshot (3)](https://user-images.githubusercontent.com/62348312/161460702-e261ab49-7954-4727-a9b8-ad964c2cb781.png)
![Screenshot (4)](https://user-images.githubusercontent.com/62348312/161460817-3215bd41-2318-4638-9050-d4bfce750d09.png)
![Screenshot (6)](https://user-images.githubusercontent.com/62348312/161460983-8faef5e0-6ac3-4b0d-a43b-e82a328dc5a5.png)
![Screenshot (7)](https://user-images.githubusercontent.com/62348312/161460996-76fe82e9-5bb2-49c2-a72f-46687b9deddd.png)
![Screenshot (8)](https://user-images.githubusercontent.com/62348312/161461003-f087861e-e9d9-4ee8-95c5-d31f3547c280.png)
