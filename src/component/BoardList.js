import { Container,
  ListItem,
  ListIcon,
  ListHeader,
  ListDescription,
  ListContent,
  List,
  Pagination } from "semantic-ui-react";
import styles from "./ItemList.module.css";
import Link from "next/link";

export default function BoardList({ boardList }) {
  
  return (
    <div>
      <div>
       <List divided relaxed>
          {boardList.map((board) => (
            <ListItem href="/board/detail/[id]"  key={board.id} >
            
              <ListIcon name='github' size='large' verticalAlign='middle'/>
              <ListContent>
                <ListHeader>{board.boardTitle}</ListHeader>
                <ListDescription>Updated 10 mins ago</ListDescription>
              </ListContent>
            </ListItem>
          ))}
        </List>
        </div>
        {/* https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces */}
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={10}
        />
        </div>
    </div>
  );
}