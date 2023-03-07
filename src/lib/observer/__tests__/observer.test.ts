import Observer from "../Observer";


describe("Observer", () => {
  test("Observer initializes", () => {
    const foo = () => {
      const observer = new Observer();
    };

    expect(foo).not.toThrow(Error);
  });

  test("Observer subscribes events and call them", () => {
    const observer = new Observer();
    let foo = 1;
    const fn = () => {
      foo++;
    };
    observer.on("evt", fn);

    observer.notify("evt");

    expect(foo).toBe(2);
  });

  test("Observer subscribes events and unsubcribe them", () => {
    const observer = new Observer();
    let foo = 1;
    const fn = () => {
      foo++;
    };
    observer.on("evt", fn);

    observer.notify("evt");

    observer.unsubscribe("evt", fn);

    observer.notify("evt");

    expect(foo).toBe(2);
  });

  test("Observer subscribes different events and calls them", () => {
    const observer = new Observer();
    let foo = 1;
    let bar = 2;
    const fn1 = () => {
      foo++;
    };
    const fn2 = () => {
      bar++;
    };

    observer.on("evt1", fn1);
    observer.on("evt2", fn2);

    observer.notify("evt1");
    observer.notify("evt2");

    expect(foo).toBe(2);
    expect(bar).toBe(3);
  });
});