import {Container} from "react-bootstrap";

export function CarouselItemContent({item}) {
  return (
  <Container className="carousel-item-content">
    <a href={item.link}>
      <Container>
        <img src={item.image.src} alt={item.image.alt}/><br/>
        <p>{item.caption}</p>
      </Container>
    </a>
  </Container>
  );
}