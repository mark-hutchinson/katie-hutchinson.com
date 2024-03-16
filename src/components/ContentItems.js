import {ContentItem} from "./ContentItem";
import {Container} from "react-bootstrap";

export function ContentItems({data}) {
  return (
    <Container>
      <h1>{data.title}</h1>
      {data.items.map((item, index) => {
        return (
          <ContentItem data={item} key={index} />
        );
      })}
    </Container>
  );
}