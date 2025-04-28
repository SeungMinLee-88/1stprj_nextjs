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
  FormGroup, FormField, ListItem,ListIcon,ListHeader,ListDescription,ListContent,List,Pagination,
  Search 
} from 'semantic-ui-react'

let retRootId = "";
let testVal="";
export default function CommentList() {
  const [commentListRender, setCommentListRender] = useState([]);
  const [commentListReturn, setCommentListReturn] = useState([]);
  const [rootIdSt, setRootIdSt] = useState();
  

  const addReply = e => {
    var replyId = "reply_div"+e.target.getAttribute('parentid');
    const element = document.getElementById(replyId);
    element.getAttribute("hidden") === null ? element.hidden = true : element.hidden = false;
  }
  const addEdit = e => {
    var replyId = "reply_div"+e.target.getAttribute('parentid');
    const element = document.getElementById(replyId);
    element.getAttribute("hidden") === null ? element.hidden = true : element.hidden = false;
  }

  async function commentGetRoot(commentId) {

    await Axios.get(`http://localhost:8090/comment/commentGetRoot`, {
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
    testVal="111111111";
    //response.data.rootCommentId !== null ? rootId = response.data.rootCommentId : rootId = commentId;
}).catch(function (error) {
});
//testVal="222222222";
console.log("commentGetRoot rootId : " + retRootId);
console.log("onFormSubmit rootIdSt : " + rootIdSt);
console.log("commentGetRoot rootIdSt : " + rootIdSt);
return retRootId;
}
  
  const onFormSubmit = async evt => {
    evt.preventDefault(); 
    console.log("prevent test");
    console.log("e.target.value : " + evt.target.parentId.getAttribute('parentid'));
    const parentCommentId = evt.target.parentId.getAttribute('parentid');
    const rootId = await commentGetRoot(parentCommentId);
    console.log("onFormSubmit retRootId : " + retRootId);
    console.log("onFormSubmit rootIdSt : " + rootIdSt);
    const formId = "form" + parentCommentId;
    console.log("formId : " + formId);
    const formData = new FormData();
    formData.append("commentWriter", "AAA");
    formData.append("commentContents", document.getElementById(formId).val);
    formData.append("boardId", 31);
    formData.append("parentCommentId", parentCommentId);
    formData.append("rootCommentId", rootId);
    console.log("document.getElementById(formId).val : " + document.getElementById(formId).value);
    //return;
    
    const resp = await Axios.post("http://localhost:8090/comment/commentSave",
      {
        commentWriter: "ccc",
        commentContents: document.getElementById(formId).value,
        boardId: 31,
        parentCommentId: parentCommentId,
        rootCommentId: rootId
      }
    )
    .then(function (response) {
      console.log("response.data : " + JSON.stringify(response.data));
    /* const board = await resp.json(); */
    //router.push(`/board/detail/${response.data.id}`);
    //router.refresh();
    })
    .catch(function (error) {
      console.log(error);
    });
    //formData.append("boardId", boardId);
    //var formId = "reply_div"+e.target.getAttribute('rootid');
    
    //const boardWriter = evt.target.boardWriter.value;
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
          <Form onSubmit={onFormSubmit}>
          <FormField id={"form"+commentList["id"]} as="" control='textarea' rows='2' />
          <button type="submit" className="ui primary button" color="blue">Write</button>
          </Form>
          </div>

          {testVal && <CommentAction>Edit</CommentAction>}
        </CommentActions>
        <div id={"edit_div"+commentList["id"]} hidden>
          <Form onSubmit={onFormSubmit}>
          <FormField id={"form"+commentList["id"]} as="" control='textarea' rows='2' />
          <button type="submit" className="ui primary button" color="blue">Write</button>
          </Form>
          </div>
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
          <Form onSubmit={onFormSubmit}>
          <input type="text" id="parentId" name="parentId" parentid={commentList["id"]} />
          <FormField id={"form"+commentList["id"]} as="" control='textarea' rows='2' />
          <button type="submit" className="ui primary button" color="blue">Write</button>
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
        Axios.get(`http://localhost:8090/comment/commentTrees`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            page: currentPage,
            size: "2",
            boardId: 31
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
    useEffect(() => {
        getData();
      }, [currentPage]);



      return (
        <div>
        <CommentGroup>
          {commentListRender}
        </CommentGroup>
        
        
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