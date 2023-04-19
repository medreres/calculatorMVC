import { Expression } from "@/api/modules/calculator/model";
import request from "supertest";
import {
  clearDb,
  IExpression,
  initializeApp,
  initializeDb,
  invalidTestCases,
  makePostRequest,
  validTestCases,
} from "./utils";
const app = initializeApp();
const req = request(app);

beforeAll(async () => {
  await initializeDb();
  await Expression.deleteMany({});
});
afterAll(async () => {
  await Expression.deleteMany({});
  await clearDb();
});

describe("Testing endpoints", () => {
  it("GET /operations fetches available operations", async () => {
    const { body } = await req.get("/operations");
    expect(body.data).toBeDefined();
  });

  it("GET /constants fetches available constants", async () => {
    const { body } = await req.get("/constants");
    expect(body.data).toBeDefined();
  });

  describe("/expression(s)", () => {
    describe("/POST expression", () => {
      describe("Computes valid expressions", () => {
        validTestCases.forEach(({ expression, result }) => {
          it(`${expression} = ${result}`, async () => {
            const body = await makePostRequest(req, expression);
            expect(body.data).toBe(result);
          });
        });
      });

      describe("Throws an error on invalid request", () => {
        invalidTestCases.forEach((expression) => {
          it(expression, async () => {
            const body = await makePostRequest(req, expression);

            expect(body.data).not.toBeDefined();
            expect(body.error).toBeDefined();
          });
        });
      });
    });

    describe("/GET expressions", () => {
      it("Caches correct results", async () => {
        const { body } = await req.get("/expressions");
        expect(body.data).toHaveLength(validTestCases.length);
      });

      it("Caches correct results in correct order", async () => {
        const {
          body: { data },
        } = await req.get("/expressions?sort=createdAt:asc");

        data.forEach(({ expression }: IExpression, index: number) => {
          expect(expression).toBe(validTestCases[index].expression);
        });
      });

      it("Limits results", async () => {
        const { body } = await req.get("/expressions?limit=3");
        expect(body.data).toHaveLength(3);
      });

      it("Limits results 2", async () => {
        const { body } = await req.get("/expressions?limit=4&skip=1");
        expect(body.data).toHaveLength(4);
      });

      it("Sorts results", async () => {
        const { body } = await req.get("/expressions?sort=createdAt:asc");
        expect(body.data[0].expression).toBe(validTestCases[0].expression);
      });

      it("Sorts results 2", async () => {
        const { body } = await req.get("/expressions?sort=createdAt:desc");
        console.log(validTestCases[validTestCases.length - 1].expression);
        expect(body.data[0].expression).toBe(validTestCases[validTestCases.length - 1].expression);
      });

      it("Skips results", async () => {
        const { body } = await req.get("/expressions?skip=2&sort=createdAt:asc");
        expect(body.data[0].expression).toBe(validTestCases[2].expression);
      });

      it("Skips results 2", async () => {
        const { body } = await req.get("/expressions?sort=createdAt:asc&skip=1");
        expect(body.data[0].expression).toBe(validTestCases[1].expression);
      });
    });

    //TODO doesnt work because somehow end point doesn't sort results
    it("Updates history", async () => {
      await makePostRequest(req, validTestCases[0].expression);

      const {
        body: { data },
      }: { body: { data: IExpression[] } } = await req.get("/expressions?sort=updatedAt:desc");

      expect(data[0].expression).toBe(validTestCases[0].expression);
    });
  });
});
