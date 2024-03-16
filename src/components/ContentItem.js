import {Container} from "react-bootstrap";

export function ContentItem({data}) {
  return (
    <Container className="contentItem">
      {data.title && (<h1>{data.title}</h1>)}
      <Container>
        {data.subtitle && (<h2>{data.subtitle}</h2>)}
        <p>{data.text}</p>
      </Container>
    </Container>
  );
}