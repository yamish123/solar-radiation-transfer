import { unit } from "mathjs";
import { Atmosphere, calcTotalBrightnesstemperature } from "../radTrans";

describe("calcTotalBrightnesstemperature", () => {
  const atmosphereModel = [
    {
      height: 1,
      temperature: 2,
      density: 3
    },
    {
      height: 4,
      temperature: 5,
      density: 6
    }
  ].map(v => ({
    height: unit(v.height, "km"),
    temperature: unit(v.temperature, "K"),
    density: unit(v.density, "cm^3")
  })) as Atmosphere;

  it("正しい単位で引数を指定すると0K以上の値が返る", () => {
    const frequency = unit(10, "GHz");
    const result = calcTotalBrightnesstemperature(frequency, atmosphereModel);
    expect(result).toBeGreaterThan(0);
  });

  it("不正な単位で入力するとエラーになる", () => {
    const frequency = unit(10, "km");
    expect(() => {
      calcTotalBrightnesstemperature(frequency, atmosphereModel);
    }).toThrow();
  });
});
