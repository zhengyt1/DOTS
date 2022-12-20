## MongoDB Credentials
To access MongoDB, create a `.env` file inside `backend/` and add `DBURL = "url we sent in the credentials form"`. 
Then you are able to run our app by:
- `cd backend/ && npm start` to start the express server
- `cd dots/ && npm start` to start react app

## project_design
Github Link: [Github Link](https://github.com/cis557/project---design-hw1-group21)

Figma link: [Figma](https://www.figma.com/file/2zKBicT9YGqXbUttyQ4yne/Group21-Project?node-id=0%3A1)

Swaggerhub link: [swaggerhub](https://app.swaggerhub.com/apis/ZXY9815_1/Group21_openapi2/1.0.0)

## Deployment
visit **https://deployment-dots.herokuapp.com/** for our deployment app.

## Tips: 
- cd our file dots/ and run `npm start` to start

- We don't use redux except to get the logged in userID. Every interaction makes a request to the mockAPI. So it may take some a few seconds to load the correct data.

- Sometimes data fails to load, it's mostly because you make to many requrest to remote resource. Just slow your operation and `wait`, or re-login. In this case, console will print "Failed to load resource: the server responded with a status of 429 (Too Many Requests)"

- When yor `refresh` our website, you may lose the information of the logged in user whose value is store in redux and you have to login again. So please avoid reflashing.

- In the **login** page, we only check if the email exists(substring is ok for now, for example, `zh` and `zhengyt` both retrieve `zhengyt1@gmail.com`). If we get duplicate emails, just login the first one. You can type any existing email to log in. Or don't type anything to retrieve the first user.

- In the **register** page, we don't valid the information we get. After click register, we directly log you in. Follow someone to see the change in the feed! :)

- In the **post** component, you must update one picture or one video. For video, we only support mp4 file. If you don't see your new post, please wait some seconds, and re-enter the page. We store posted pictures/videos in firebase. While some pictures are generated randomly from image website by mockAPI. So it's normal that a user display different content in a post.

- In the **gallery** component, if there is a post with no picture, we generate random picture as its thumbnail.

- We use UTC / GMT time in our app
