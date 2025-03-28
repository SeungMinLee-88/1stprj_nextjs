import { Container,
  ListItem,
  ListIcon,
  ListHeader,
  ListDescription,
  ListContent,
  List, } from "semantic-ui-react";
import styles from "./ItemList.module.css";
import Link from "next/link";

export default function BoardList({ boardList }) {
  return (
    <div>

          {boardList.map((board) => (
              <List divided relaxed>
              {/* <Link href="/board/detail/[id]" as={`/board/detail/${board.id}`}> */}
              <ListItem href="/board/detail/[id]">
              
              <ListIcon name='github' size='large' verticalAlign='middle'/>
             
              <ListContent>
              
                <ListHeader as='a'>{board.boardTitle}</ListHeader>
                
                <ListDescription as='a'>Updated 10 mins ago</ListDescription>
             
              </ListContent>
              
              </ListItem>
              {/* </Link> */}
              </List>
          ))}
    </div>
  );
}