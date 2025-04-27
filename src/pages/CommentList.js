import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  FormTextArea,
  Button,
  Comment,
  Form,
  Header,
  FormGroup, FormField
} from 'semantic-ui-react'
export default function CommentList() {
  
  var depth = 0;
  var renderVal = [];
  const [commentListRender, setCommentListRender] = useState([]);
  const [commentListReturn, setCommentListReturn] = useState([]);
  function recursiveMap(commentLists, level, depthVal) {
    //console.log("recursiveMap commentLists : " + JSON.stringify(commentLists));
    commentLists.map((commentList) => {
      console.log("recursiveMap level : " + level);
      console.log("depthVal : " + depthVal)
      console.log("depth : " + depthVal + " | " 
        + level + " level map recursiveMap children : " + " id : " + commentList["id"]
         + " | commentWriter : " + commentList["commentWriter"]
         + " | commentContents : " + commentList["commentContents"]);
         

      var depthStyle = depthVal * 20;
      var testVal = 1;
      console.log("depthStyle : " + depthStyle)
      if(commentList["childrencomments"] !== "" && commentList["childrencomments"] !== null 
        && commentList["childrencomments"].length > 0
      ){
        console.log("childrencomments exists!!!!!!!!!!");
        //renderVal.push(<CommentGroup><Comment key={commentList["id"]}>);
        /* for(i=0;i<depth;i++){
          renderVal.push();
        } */
       
        renderVal.push(<Comment key={commentList["id"]} style={{ paddingLeft: depthStyle }}>
          <CommentContent>
            <CommentAuthor as='a'>{commentList["commentWriter"]}</CommentAuthor>
        <CommentText>{commentList["commentContents"]}</CommentText>
        <CommentActions>
          <CommentAction>Reply</CommentAction>
          {testVal && <CommentAction>Edit</CommentAction>}
        </CommentActions>
        <div>
        <FormField as="" control='textarea' rows='3' value={commentList["commentContents"]} />
        </div>
         </CommentContent>
         </Comment>
         );
          setCommentListRender([...commentListRender, 
           renderVal]);
        recursiveMap(commentList["childrencomments"], "child", depthVal+1)
        //renderVal.push(</Comment></CommentGroup>)
      }else{
        console.log("childrencomments nullxxxxxxxxxxxx");
        renderVal.push(<Comment key={commentList["id"]} style={{ paddingLeft: depthStyle }}>
          <CommentContent>
            <CommentAuthor as='a'>{commentList["commentWriter"]}</CommentAuthor>
        <CommentText>{commentList["commentContents"]}</CommentText>
        <CommentActions>
          <CommentAction>Reply</CommentAction>
        </CommentActions>
         </CommentContent>
         </Comment>);
          setCommentListRender([...commentListRender, 
           renderVal]);
      }
      
    });
    //console.log("commentListRender : " + JSON.stringify(commentListRender))
  }
  
    function getData() {
        Axios.get(`http://localhost:8090/comment/commentTrees?page=1&size=10&boardId=31`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            page: 1,
            size: 2
          },
        }
      ).then((response, error) => {
        
        //console.log("response : " + JSON.stringify(response.data.content));
        setCommentListReturn(response.data.content);
        //console.log("commentListReturn : " + JSON.stringify(commentListReturn));
        recursiveMap(response.data.content, "root", 0);
       
        
        
    }).catch(function (error) {
    });
  }
  //recursiveMap(commentListReturn, "root", 0);

    useEffect(() => {
        getData();
      }, []);
      
    //commentListRender = commentListRender + (</CommentContent></Comment></CommentGroup>);

/*   commentListRender = (
  <CommentGroup>
    <Comment>
      <CommentContent>
        <CommentAuthor as='a'>Matt</CommentAuthor>
      </CommentContent>
    </Comment>
    </CommentGroup>
      ); */
      //console.log("commentListReturn : " + JSON.stringify(commentListReturn))
     // console.log("commentListRender : " + JSON.stringify(commentListRender))
      return (
        <CommentGroup>
          {commentListRender}
        </CommentGroup>
     );
     
     /* return (
      <div>
      <CommentGroup>
  <Header as='h3' dividing>
    Comments
  </Header>

  <Comment>
    <CommentContent>
      <CommentAuthor as='a'>Matt</CommentAuthor>
      <CommentMetadata>
        <div>Today at 5:42PM</div>
      </CommentMetadata>
      <CommentText>How artistic!</CommentText>
      <CommentActions>
        <CommentAction>Reply</CommentAction>
      </CommentActions>
    </CommentContent>
  </Comment>

  <Comment>
    <CommentContent>
      <CommentAuthor as='a'>Elliot Fu</CommentAuthor>
      <CommentMetadata>
        <div>Yesterday at 12:30AM</div>
      </CommentMetadata>
      <CommentText>
        <p>This has been very useful for my research. Thanks as well!</p>
      </CommentText>
      <CommentActions>
        <CommentAction>Reply</CommentAction>
      </CommentActions>
    </CommentContent>
    <CommentGroup>
      <Comment>
        <CommentContent>
          <CommentAuthor as='a'>Jenny Hess</CommentAuthor>
          <CommentMetadata>
            <div>Just now</div>
          </CommentMetadata>
          <CommentText>Elliot you are always so right :)</CommentText>
          <CommentActions>
            <CommentAction>Reply</CommentAction>
          </CommentActions>
        </CommentContent>
      </Comment>
    </CommentGroup>
  </Comment>

  <Comment>
    <CommentContent>
      <CommentAuthor as='a'>Joe Henderson</CommentAuthor>
      <CommentMetadata>
        <div>5 days ago</div>
      </CommentMetadata>
      <CommentText>Dude, this is awesome. Thanks so much</CommentText>
      <CommentActions>
        <CommentAction>Reply</CommentAction>
      </CommentActions>
    </CommentContent>
  </Comment>

</CommentGroup>

<Form reply>
    <FormTextArea />
    <button content='Add Reply' labelPosition='left' icon='edit' primary />
     <FormField label='boardContents' as="" control='textarea' rows='3' />
     <button className="ui primary button" color="blue">Add Reply</button>
  </Form>
</div>
   ); */
}