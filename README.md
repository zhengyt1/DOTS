# project_design
Photo&amp;Video-sharing Social Network APP -  UI &amp; Architecture Design (HW1)

Figma link: [Figma](https://www.figma.com/file/2zKBicT9YGqXbUttyQ4yne/Group21-Project?node-id=0%3A1)

Swaggerhub link: [swaggerhub](https://app.swaggerhub.com/apis/ZXY9815_1/Group21_openapi2/1.0.0)



## Tips: 
- cd our file dots/ and run `npm start` to start

- We don't use redux except to get the logged in userID. Every interaction makes a request to the mockAPI. So it may take some a few seconds to load the correct data.

- Sometimes data fails to load, it's mostly because you make to many requrest to remote resource. Just slow your operation and wait, or re-login. In this case, console will print "Failed to load resource: the server responded with a status of 429 (Too Many Requests)"

- In the **login** page, we only check if the email exists(substring is ok for now, for example, `zh` and `zhengyt` both retrieve `zhengyt1@gmail.com`). If we get duplicate emails, just login the first one. You can type any existing email to log in. Or don't type anything to retrieve the first user.

- In the **register** page, we don't valid the information we get. After click register, we directly log you in. Follow someone to see the change in the feed! :)

- In the **suggetion** component, we display all the user in our mockAPI. Implement the search function afterwards. You can use it as users navigation.

- In the **post** component, you must update one picture or one video. For video, we only support mp4 file.