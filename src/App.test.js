// App.test.mjs
import { render } from "@testing-library/react";
import App from "./App";

test("renders Hello, Jest!", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/This is a full stack app!/i);
  expect(linkElement).toBeInTheDocument();
});
