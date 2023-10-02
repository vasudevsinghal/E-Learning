import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={`vh-100 vw-100 d-flex align-items-center justify-content-center flex-column`}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}

export default Error;