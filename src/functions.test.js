import { createEvent } from "./functions";

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("2021-12-07T10:20:30Z").getTime());
});

const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};

test("Validation a event title and content basic", () => {
  const weekday = "mon";
  const week = 1;
  const openHour = 8;
  const closeHour = 14;
  const result = createEvent(weekday, week, openHour, closeHour);
  expect(result.title).toBe("[SOFKA U] Meeting Room");
  expect(result.description).toBe("Mentoring and Practice");
  expect(result.duration).toEqual([6, "hour"]);
});

test("Validation start date", () => {
  const weekday = "mon";
  const week = 4;
  const openHour = 8;
  const closeHour = 14;

  const result = createEvent(weekday, week, openHour, closeHour);
  const dia = result.start.getDate();
  const mes = result.start.getMonth();
  const anio = result.start.getFullYear();

  let fecha = new Date(new Date().setDate(new Date().getDate() + 20));
  const diaF = fecha.getDate();
  const mesF = fecha.getMonth();
  const anioF = fecha.getFullYear();

  expect(dia).toBe(diaF);
  expect(mes).toBe(mesF);
  expect(anio).toBe(anioF);
});

test("Validation date", () => {
  const weekday = "mon";
  const week = 10;
  const openHour = 8;
  const closeHour = 14;
  const result = createEvent(weekday, week, openHour, closeHour);

  let resultado = new Date(
    new Date().setDate(new Date().getDate() + 62)
  ).toLocaleDateString("es-ES", options);

  expect(result.date).toBe(resultado);
});

describe("Validation illegal arguments #1", () => {
  test("hours", () => {
    const hour = () => {
      createEvent("mon", 10, 14, 11);
    };
    expect(hour).toThrow();
  });

  test("wek", () => {
    const wek = () => {
      createEvent("mon", -1, 11, 14);
    };
    expect(wek).toThrow();
  });

  test("weekday", () => {
    const weekday = () => {
      createEvent("AAA", 5, 11, 14);
    };
    expect(weekday).toThrow();
  });
});

test("Validation illegal arguments #2", () => {
  expect(() => createEvent("mon", 10, 14, 11)).toThrow(Error);

  expect(() => createEvent("mon", -1, 11, 14)).toThrow(Error);

  expect(() => createEvent("AAA", 5, 11, 14)).toThrow(Error);
});


test("create an event list of at least 10 events", () => {
  const List = [
    {
      weekday: "mon",
      week: 1,
      openHour: 8,
      closeHour: 10,
    },
    {
      weekday: "tue",
      week: 2,
      openHour: 11,
      closeHour: 12,
    },
    {
      weekday: "wed",
      week: 3,
      openHour: 13,
      closeHour: 14,
    },
    {
      weekday: "thu",
      week: 4,
      openHour: 15,
      closeHour: 16,
    },
    {
      weekday: "fri",
      week: 5,
      openHour: 17,
      closeHour: 18,
    },
    {
      weekday: "sat",
      week: 6,
      openHour: 19,
      closeHour: 20,
    },
    {
      weekday: "sun",
      week: 7,
      openHour: 21,
      closeHour: 22,
    },
    {
      weekday: "mon",
      week: 8,
      openHour: 7,
      closeHour: 10,
    },
    {
      weekday: "tue",
      week: 9,
      openHour: 5,
      closeHour: 15,
    },
    {
      weekday: "wed",
      week: 10,
      openHour: 8,
      closeHour: 18,
    },
  ];

  List.forEach((item) => {
    createEvent(item.weekday, item.week, item.openHour, item.closeHour);
  });
});

test("create an event list of at least 10 events", () => {
  //TODO: hacer las verificaciones
});
