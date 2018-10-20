import React,{Component} from "react";
import "./Post.css";
import { Query } from "react-apollo";
import gql from "graphql-tag";



class Post extends Component {
    constructor(props){
        super(props);
    }
    Post = () => {
      return (
        <Query
          query={gql`
            {
              post(user_id: "a", post_id: "a") {
                image
                caption
                user {
                  nickname
                  avatar
                }
              }
            }
          `}
        >
          // handle result of the query
          {({ loading, error, data }) => {
                if (loading) return <p>Loading Post...</p>;
                if (error) return <p>Error loading Post:(</p>;
                let image = data.post.image;
                let caption = data.post.caption;
                let user = data.post.user;
                return (
                  <article className="Post" ref="Post">
                    <header>
                      <div className="Post-user">
                        <div className="Post-user-avatar">
                          <img src={user.avatar} alt={user.nickname} />
                        </div>
                        <div className="Post-user-nickname">
                          <span>{user.nickname}</span>
                        </div>
                      </div>
                    </header>
                    <div className="Post-image">
                      <div className="Post-image-bg">
                        <img alt={caption} src={image} />
                      </div>
                    </div>
                    <div className="Post-caption">
                      <strong>{user.nickname}</strong> {caption}
                    </div>
                  </article>
                );
              }}
        </Query>
      )
    }
 render(){
   const nickname = this.props.nickname;
   const avatar = this.props.avatar;
   const image = this.props.image;
   const caption = this.props.caption;

   return <article className="Post" ref="Post">
   <header>
      <div className="Post-user">
       <div className="Post-user-avatar">
         <img src={avatar} alt={nickname} />
       
       </div>
       <div className="Post-user-nickname">
         <span>{nickname}</span>
       </div>
      
      </div>


   </header>
   <div className="Post-image">
    <div className="Post-image-bg">
      <img alt={caption} src={image} />
    </div>
   
   
   </div>
   <div className="Post-caption">
              <strong>Meetup</strong> Moving the community!
   </div>
   
   
   </article>


 }





}


export default Post;