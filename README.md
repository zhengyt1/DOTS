# Course Project for Programming For The Web

## Deployment
visit **https://deployment-dots.herokuapp.com/** for our deployment app.

## MongoDB Credentials
To access MongoDB, create a `.env` file inside `backend/` and add `DBURL = "url we sent in the credentials form"`, or see the comment in the code. 
Then you are able to run our app by:
- `cd backend/ && npm start` to start the express server
- `cd dots/ && npm start` to start react app

## project_design
Figma link: [Figma](https://www.figma.com/file/2zKBicT9YGqXbUttyQ4yne/Group21-Project?node-id=0%3A1)

Swaggerhub link: [swaggerhub](https://app.swaggerhub.com/apis/ZXY9815_1/Group21_openapi2/1.0.0)

## End to End Tests
run `npx cypress open` to open the test page. Click on E2E Testing and run the 2 Specs we have configured.

## Tips: 
- We have many users already, you can test `zhengyt1@gmail.com` and password 222, or `zhengyt1@gmail.co` and password 222 for sample user.

- If you want to see the project locally(.evn file is needed), cd our file dots/ and run `npm start` to start.

- We don't use redux except to get the logged in userID. Every interaction makes a request to the mockAPI. So it may take some a few seconds to load the correct data. (Store user token in sessionStorage now)

- Sometimes data fails to load, it's mostly because you make to many requrest to remote resource. Just slow your operation and `wait`, or re-login. In this case, console will print "Failed to load resource: the server responded with a status of 429 (Too Many Requests)"

- In the **post** component, you must update one picture or one video. For video, we only support mp4 file. If you don't see your new post, please wait some seconds, and re-enter the page. We store posted pictures/videos in firebase. While some pictures are generated randomly from image website by mockAPI. So it's normal that a user display different content in a post.

- In the **gallery** component, if there is a post with no picture, we generate random picture as its thumbnail.

- We use UTC / GMT time in our app
