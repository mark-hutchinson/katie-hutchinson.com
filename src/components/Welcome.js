export function Welcome({data}) {
    return (
      <div className="container">
          <h1>{data.title}</h1>
          <div className="row">
            <div className="align-self-center">
              <h2>{data.text}</h2>
            </div>
          </div>
      </div>
    )
}