import request from "supertest";
import { clearDb, initializeApp, initializeDb } from "./utils";
const app = initializeApp();
const req = request(app);

const testCases = [
  { expression: "1+5", result: "6" },
  { expression: "1+13", result: "14" },
  { expression: "5%3 + 3", result: "5" },
  { expression: "sin0 + 5 * (3+2)", result: "25" },
];

const invalidTestCases = ["1*", "1-", "(", "()", "2*(3-"];

// arranging
beforeAll(initializeDb);
afterAll(clearDb);

//TODO TEST limit, sort, etc
describe("Testing endpoints", () => {
  it("GET /operations fetches available operations", async () => {
    const { body } = await req.get("/operations");

    expect(body.data).toBeDefined();
  });

  it("GET /constants fetches available constants", async () => {
    const { body } = await req.get("/constants");

    expect(body.data).toBeDefined();
  });

  describe("POST /expression", () => {
    describe("Computes valid expressions", () => {
      testCases.forEach(({ expression, result }) => {
        it(`${expression} = ${result}`, async () => {
          const { body } = await req
            .post("/expression")
            .send({
              expression,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
          // .expect(200);

          expect(body.data).toBe(result);
        });
      });
    });

    describe("Throws an error on invalid request", () => {
      invalidTestCases.forEach((expression) => {
        it(expression, async () => {
          const { body } = await req
            .post("/expression")
            .send({
              expression,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(400);

          expect(body.data).not.toBeDefined();
          expect(body.error).toBeDefined();
        });
      });
    });
  });

  // last operations were successfully saved to db
  describe("GET /expressions", () => {
    it("Caches correct results", async () => {
      const { body } = await req.get("/expressions");

      expect(body.data).toHaveLength(testCases.length);
    });
  });
});
