import Axios from "axios";
import { useEffect, useState } from "react";
import {
  CommentText,
  CommentGroup,
  CommentContent,
  CommentActions,
  CommentAction,
  CommentAuthor,
  Comment,
  Form,
  FormField
  ,Pagination
} from 'semantic-ui-react'
import { useContext } from 'react';
import { UserIdContext } from './UserContext.js';
import { useRouter } from "next/router";

let retRootId = "";
let testVal="";
export default function CommentList({ boardId }) {
  const [commentListRender, setCommentListRender] = useState([]);
  const [commentListReturn, setCommentListReturn] = useState([]);
  const [rootIdSt, setRootIdSt] = useState();
  const userId = useContext(UserIdContext);
 // const [accessToken, setAccessToken] = useState(localStorage.getItem("access"));
/*   const accessToken = localStorage.getItem("access"); */
 console.log("comment userId : " + userId);
 const router = useRouter();

  
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPage, setTotalPage] = useState(1);
   useEffect(() => {
       getData();
     }, [currentPage, userId]);

  const addReply = e => {
    var replyId = "reply_div"+e.target.getAttribute('parentid');
    const element = document.getElementById(replyId);
    element.getAttribute("hidden") === null ? element.hidden = true : element.hidden = false;
  }
  const addEdit = e => {
    var editId = "edit_div"+e.target.getAttribute('commentId');
    console.log("editId : " + editId)
    const element = document.getElementById(editId);
    element.getAttribute("hidden") === null ? element.hidden = true : element.hidden = false;
  }

  async function commentGetRoot(commentId) {
    await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comment/commentGetRoot`, {
      headers: {
        "Content-Type": "application/json", 
        access: localStorage.getItem("access") 
      },
      params: {
        commentId: commentId
      },
    }
  ).then((response, error) => {
    console.log("response : " + JSON.stringify(response.data.rootCommentId));
    console.log("commentId : " + commentId);
    if(response.data.rootCommentId !== null){
      console.log("1111111111");
      retRootId = response.data.rootCommentId
      setRootIdSt(response.data.rootCommentId);
    }else{
      console.log("22222222222");
      retRootId = commentId
      setRootIdSt(commentId);
    }
    //response.data.rootCommentId !== null ? rootId = response.data.rootCommentId : rootId = commentId;
}).catch(function (error) {
});
//testVal="222222222";
console.log("commentGetRoot rootId : " + retRootId);
console.log("saveFormSubmit rootIdSt : " + rootIdSt);
console.log("commentGetRoot rootIdSt : " + rootIdSt);
return retRootId;
}
  
  const saveFormSubmit = async evt => {
    evt.preventDefault(); 
    console.log("userId : " + userId);
    console.log("prevent test");
    console.log("e.target.value : " + evt.target.parentId.getAttribute('parentid'));
    const parentCommentId = evt.target.parentId.getAttribute('parentid');
    const rootId = await commentGetRoot(parentCommentId);
    console.log("saveFormSubmit retRootId : " + retRootId);
    console.log("saveFormSubmit rootIdSt : " + rootIdSt);
    const formId = "form" + parentCommentId;

    const formData = new FormData();
    console.log("document.getElementById(formId).val : " + document.getElementById(formId).value);
    //return;
    
    const resp = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comment/commentSave`,
      {
        commentWriter: userId,
        commentContents: document.getElementById(formId).value,
        boardId: boardId,
        parentCommentId: parentCommentId,
        rootCommentId: rootId,
        isRootComment: "false"
      },
      {
        headers: {
          'access' : localStorage.getItem("access") 
        }
      }
    )
    .then(function (response) {
      console.log("response.data : " + JSON.stringify(response.data));
      alert("Save Success");
      router.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    const updateFormSubmit = async evt => {
      evt.preventDefault(); 
      const commentId = evt.target.commentId.getAttribute('commentId'); 
      const editFormId = "edit" + commentId;
      //const commentId = editFormId.getAttribute('commentId');
      console.log("commentId : " + commentId);
      console.log("document.getElementById(editFormId).val : " + document.getElementById(editFormId).value);

      
      const resp = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comment/commentUpdate`,
        {
          id: commentId,
          commentContents: document.getElementById(editFormId).value,
        },
        {
          headers: {
            'access' : localStorage.getItem("access") 
          }
        }
      )
      .then(function (response) {
        console.log("response.data : " + JSON.stringify(response.data));
        alert("Update Success");
        router.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  
  var renderVal = [];
  function recursiveMap(commentLists, level, depthVal) {
    console.log("recursiveMap commentLists : " + JSON.stringify(commentLists));
    commentLists.map((commentList) => {
      console.log("recursiveMap level : " + level);
      console.log("depthVal : " + depthVal)
      console.log("depth : " + depthVal + " | " + level + " level map recursiveMap children : " + " id : " + commentList["id"] + " | commentWriter : " + commentList["commentWriter"] + " | commentContents : " + commentList["commentContents"]);
      var depthStyle = depthVal * 20;
      var testVal = 1;
      console.log("depthStyle : " + depthStyle)
      if(commentList["childrenComments"] !== "" && commentList["childrenComments"] !== null 
        && commentList["childrenComments"].length > 0
      ){
        console.log("childrenComments exists!!!!!!!!!!");
        //renderVal.push(<CommentGroup><Comment key={commentList["id"]}>);
        /* for(i=0;i<depth;i++){
          renderVal.push();
        } */
        renderVal.push(<Comment key={commentList["id"]} style={{ paddingLeft: depthStyle }}>
          <CommentContent>
            <CommentAuthor as='a'>{commentList["commentWriter"]}</CommentAuthor>
        <CommentText>{commentList["commentContents"]}</CommentText>
        <CommentActions>
          <CommentAction parentid={commentList["id"]} onClick={addReply}>Reply</CommentAction>
          
          <div id={"reply_div"+commentList["id"]} hidden>
          <Form onSubmit={saveFormSubmit}>
          <input type="text" id="parentId" name="parentId" parentid={commentList["id"]} hidden />
          <FormField id={"form"+commentList["id"]} as="" control='textarea' rows='2' />
          <button type="submit" className="ui primary button" color="blue">Write</button>
          </Form>
          </div>

          {userId === commentList["commentWriter"] && <CommentAction commentid={commentList["id"]} onClick={addEdit}>Edit</CommentAction>}

          <div id={"edit_div"+commentList["id"]} hidden>
          <Form onSubmit={updateFormSubmit}>
          <input type="text" id="commentId" name="commentId" commentid={commentList["id"]} hidden />
          <FormField id={"edit"+commentList["id"]} as="" control='textarea' rows='2' defaultValue={commentList["commentContents"]} />
          <button type="submit" className="ui primary button" color="blue">Edit</button>
          </Form>
          </div>
          </CommentActions>
         </CommentContent>
         </Comment>
         );
          setCommentListRender([...commentListRender, 
           renderVal]);
        recursiveMap(commentList["childrenComments"], "child", depthVal+1)
        //renderVal.push(</Comment></CommentGroup>)
      }else{
        console.log("childrenComments nullxxxxxxxxxxxx");
        renderVal.push(<Comment key={commentList["id"]} style={{ paddingLeft: depthStyle }}>
          <CommentContent>
            <CommentAuthor as='a'>{commentList["commentWriter"]}</CommentAuthor>
        <CommentText>{commentList["commentContents"]}</CommentText>
        <CommentActions>
        <CommentAction parentid={commentList["id"]} onClick={addReply}>Reply</CommentAction>
          <div id={"reply_div"+commentList["id"]} hidden>
          <Form onSubmit={saveFormSubmit}>
          <input type="text" id="parentId" name="parentId" parentid={commentList["id"]} hidden />
          <FormField id={"form"+commentList["id"]} as="" control='textarea' rows='2' />
          <button type="submit" className="ui primary button" color="blue">Write</button>
          </Form>
          </div>
          {userId === commentList["commentWriter"] && <CommentAction commentid={commentList["id"]} onClick={addEdit}>Edit</CommentAction>}

          <div id={"edit_div"+commentList["id"]} hidden>
          <Form onSubmit={updateFormSubmit}>
          <input type="text" id="commentId" name="commentId" commentid={commentList["id"]} hidden />
          <FormField id={"edit"+commentList["id"]} as="" control='textarea' rows='2' defaultValue={commentList["commentContents"]} />
          <button type="submit" className="ui primary button" color="blue">Edit</button>
          </Form>
          </div>
        </CommentActions>
         </CommentContent>
         </Comment>);
          setCommentListRender([...commentListRender, 
           renderVal]);
      }
    });
  }
  
    function getData() {
        Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comment/commentList`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            page: currentPage,
            size: "2",
            boardId: `${boardId}`
          },
        }
      ).then((response, error) => {
        
        console.log("response : " + JSON.stringify(response.data));
        setTotalPage(response.data.totalPages);
        setCommentListReturn(response.data.content);
        //console.log("commentListReturn : " + JSON.stringify(commentListReturn));

        recursiveMap(response.data.content, "root", 0);
      
    }).catch(function (error) {
    });
  }
  //recursiveMap(commentListReturn, "root", 0);
      
  
  const goToPage = pageNumber => {
    renderVal = [];
    setCommentListRender([]);
    console.log("renderVal : " + JSON.stringify(renderVal));
    console.log("commentListRender : " + JSON.stringify(commentListRender));
    
    //setPaginationOptions({ ...paginationOptions, activePage: pageNumber });
    console.log("pageNumber : " + pageNumber);
    setCurrentPage(pageNumber);
  };
  



      const addFormSubmit = async evt => {
        evt.preventDefault(); 
        const commentContents = evt.target.commentContents.value; 

        console.log("commentContents : " + commentContents)
        

        await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comment/commentSave`,
          {
            commentWriter:userId,
            commentContents:commentContents,
            boardId:boardId,
            isRootComment:"true"
          },
          {
            headers: {
              'access' : localStorage.getItem("access") 
            }
          }
        )
        .then(function (response) {
          console.log("response.data : " + JSON.stringify(response.data));
          alert("Save Success");
          router.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    
    }

      return (
        <div>
          {userId !== null &&
          <Form onSubmit={addFormSubmit} reply>
          <FormField name='commentContents' label='Comments' as="" control='textarea' rows='3' />
          <button type="submit" className="ui icon primary left labeled button" color="blue">
          <i aria-hidden="true" class="edit icon"></i>
          Add Comment
        </button>
        </Form>
        }
        length : {commentListReturn.length}
        <CommentGroup>
          {commentListRender}
        </CommentGroup>
        {commentListReturn.length > 0 &&
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Pagination
          /* activePage={paginationOptions.activePage} */
          activePage={currentPage}
          boundaryRange={0}
          /* defaultActivePage={1} */
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={totalPage}
          onPageChange={(_, { activePage }) => goToPage(activePage)}
          
        />

        </div>
          }
        </div>
        
     );
     
           
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