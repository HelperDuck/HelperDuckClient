// import React from "react";
// import { render } from "@testing-library/react";
// import App from "./App";
import { BACKEND_CONNECTION } from "./services/backEndConnection";

test("Dummy test for app", () => {
  // render(<App />);
  expect(BACKEND_CONNECTION).not.toBe("http://localhost:3002");
  expect(true).toBe(true);
});
