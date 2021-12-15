# Schedule for students of Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture (FESB), Split

This is a ReactNative mobile app made as a bachelors degree project.

## About

Application allows students of FESB to open their schedule of lectures and exams, so as the attendance on the lectures.


## Getting Started

In order to use this application you must have official username and password used to login on FESB educational webpage.

### Installing
After cloning this repository you need to install the dependencies named in the package.json file by executing this command from "main/zavrsni-backend":
```
npm install
````

And then the same thing from "main/frontend":
```
npm install
````

It is suggested to change JWT_SECRET constant to whatever you want in .env file for security reasons, but it is not mandatory for work

### Running the app
Open command line and position yourself into the "main/zavrsni-backend" folder and run the following command to start the server application on http://localhost:5000/
```
nodemon app.js
````

Position yourself into the "main/frontend" folder and run the following command to start the client application
```
npm start
````

## What you see in the app

- Log In Screen
![LogIn](https://user-images.githubusercontent.com/33469261/144134571-70bc6b98-478d-4d71-af69-51744dd16760.png | width=400)

- Schedule of lectures and exams marked with different colors for current week.
![CurrentWeek](https://user-images.githubusercontent.com/33469261/144134459-3a528c82-9b18-451e-a979-f48faa629d08.png | width=400)

- Calendar for changing weeks.
![ChangeWeek](https://user-images.githubusercontent.com/33469261/144134378-2a416480-0410-4d95-8c35-5462b467d1a8.png | width=400)

- Tab with attendance for every lecture
![Attendance](https://user-images.githubusercontent.com/33469261/144134678-2b06146a-8380-4506-9e6d-c98866064a50.png | width=400)

- Settings tab
![Settings](https://user-images.githubusercontent.com/33469261/144134780-8d6d91a2-f5b7-4cc4-b613-3f41a0fb8b07.png | width=400)

