let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let bodyParser = require("body-parser");
let Pusher = require("pusher");
let Multipart = require("connect-multiparty");



let schema = buildSchema(`

type User {
   id : String!
   nickname: String!
   avatar: String!

}
type Post {
   id : String!
   user: User!
   caption : String!
   image: String!
}

type Query{
    user(id:String) : User!
    post(user_id:String,post_id: String) : Post!
    posts(user_id:String) : [Post]
}

`)

// Maps id to User object
let userslist = {
    a: {
      id: "a",
      nickname: "Meetup",
      avatar: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    b: {
      id: "b",
      nickname: "OG",
      avatar:
        "http://res.cloudinary.com/og-tech/image/upload/q_40/v1506850315/contact_tzltnn.jpg"
    }
  };

  let postslist = {
    a: {
      a: {
        id: "a",
        user: userslist["a"],
        caption: "Moving the community!",
        image: "http://westravanholthe.com/wp-content/uploads/2018/07/systemiccoachingpresentation-1024x768.jpg"
      },
      b: {
        id: "b",
        user: userslist["a"],
        caption: "Angular Book :)",
        image:
          "https://i2.wp.com/dontbethatvegan.com/wp-content/uploads/2018/05/SaaS-meetup-body-01-702x336.jpg?fit=702%2C336"
      },
      c: {
        id: "c",
        user: userslist["a"],
        caption: "Me at Frontstack.io",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7NlVLQZ5d5kgJENIf5sa2t61mCHDbG_1vsaqSEbFGZn2_zvMy"
      },
      d: {
        id: "d",
        user: userslist["a"],
        caption: "Moving the community!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3SsScQcho-_IgjxELsw-yrgMJO5XWDAyOrZSpH7ClYX3xTXU"
      }
    }
  };

// The root provides a resolver function for each API endpoint
let root = {
    user: function({ id }) {
      return userslist[id];
    },
    post: function({ user_id, post_id }) {
      return postslist[user_id][post_id];
    },
    posts: function({ user_id }) {
      return Object.values(postslist[user_id]);
    }
  };

  let pusher = new Pusher({
    appId: "626677",
    key: "325e5cc4a3ecf0c178b4",
    secret: "f80365c507829120ad6e",
    cluster: "ap2",
    encrypted: true
  });

  let multipartMiddleware = new Multipart();

   

  // create express app
let app = express();
app.use(cors());
app.use(bodyParser.json());

 // trigger add a new post 
 app.post('/newpost', multipartMiddleware, (req,res) => {
  // create a sample post
  let post = {
    user : {
      nickname : req.body.name,
      avatar : req.body.avatar
    },
    image : req.body.image,
    caption : req.body.caption
  }

  // trigger pusher event 
  pusher.trigger("posts-channel", "new-post", { 
    post 
  });

  return res.json({status : "Post created"});
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
