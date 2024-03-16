import {Carousel, Container} from "react-bootstrap";
import {ContentItem} from "./ContentItem";
import {CarouselItemContent} from "./CarouselItemContent";

export function FullWidthCarousel({data}) {
  return (
    <Container>
      <h1>{data.title}</h1>
      <Carousel indicators={false}  slide={false} fade={true} className="w-100">
        {data.items.map((item, index) => {
          return (
            <Carousel.Item key={"carousel_" + index}>
              <CarouselItemContent item={item} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );

}