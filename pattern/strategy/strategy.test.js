const name = require("./name.js").main;
const email = require("./email.js").main;
const phone = require("./phone.js").main;

test("strategy-name", () => {
  expect(name({ name: "Michele" })).toMatchSnapshot();
  expect(name({})).toMatchSnapshot();
  expect(name({})).toMatchSnapshot();
});

test("strategy-email", () => {
  expect(email({ email: "michele@sciabarra.com" })).toMatchSnapshot();
  expect(email({ email: "michele.sciabarra.com" })).toMatchSnapshot();
  expect(email({ email: "" })).toMatchSnapshot();
  expect(email({})).toMatchSnapshot();
});

test("strategy-phone", () => {
  expect(phone({ phone: "123" })).toMatchSnapshot();
  expect(phone({ phone: "(123) 456-7890" })).toMatchSnapshot();
  expect(phone({ phone: "pippolo plutolo" })).toMatchSnapshot();
  expect(phone({ phone: "" })).toMatchSnapshot();
  expect(phone({})).toMatchSnapshot();
});

test("strategy-pipeline", () => {
  expect(name(email(phone({})))).toMatchSnapshot();
  expect(
    name(email(phone({ phone: "123", email: "michele" })))
  ).toMatchSnapshot();
  expect(
    name(
      email(
        phone({
          name: "Michele",
          phone: "1234567890",
          email: "michele@sciabarra.com"
        })
      )
    )
  ).toMatchSnapshot();
});
