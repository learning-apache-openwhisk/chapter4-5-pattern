const ow = require("openwhisk")
//const ow = openwhisk()

function inv(par) {
  return {
    name: "pattern/chainresp-validate",
    params: par
  };
}

let p0 = {};
let p1 = { name: "Michele", ...p0 };
let p2 = { email: "michele@sciabarra.com", ...p1 };
let p3 = { phone: "1234567890", ...p2 };
let call = "pattern/chainresp-validate";


test("chainresp-validate0", () =>
  ow()
    .actions.invoke(inv(p0))
    .then(res => expect(res).toMatchSnapshot()));

test("chainresp-validate1", () =>
  ow()
    .actions.invoke(inv(p1))
    .then(res => expect(res).toMatchSnapshot()));

test("chainresp-validate2", () =>
  ow()
    .actions.invoke(inv(p2))
    .then(res => expect(res).toMatchSnapshot()));

    test("chainresp-validate3", () =>
  ow()
    .actions.invoke(inv(p3))
    .then(res => expect(res).toMatchSnapshot()));

