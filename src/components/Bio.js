import {Container} from "react-bootstrap";

export function Bio({data}) {
    return (
      <Container>
        <h1>{data.title}</h1>
        <Container>
        <h2>{data.subtitle}</h2>
        <div className="row">
          <div className="col-sm-6 align-self-center">
              <img src={data.image.src} alt={data.image.alt}/>
          </div>
          <div className="col-sm-6  align-self-center">
            {data.text}
          </div>
        </div>
        </Container>
      </Container>
    )
}