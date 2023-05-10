import {Link} from "react-router-dom"
const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <div className="container text-center">
        <h1>404</h1>
        <h2>Oops!</h2>
        <h3>Something went wrong.</h3>
        <h3>Try refreshing or <Link to={"/"} className="error-link">go back to our Home Page</Link></h3>
      </div>
    </section>
  )
}

export default PageNotFound