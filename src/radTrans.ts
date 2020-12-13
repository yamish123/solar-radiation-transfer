import { unit, Unit } from "mathjs";

export type Atmosphere = AtmosphereLayer[];

type AtmosphereLayer = {
  height: Unit;
  temperature: Unit;
  density: Unit;
};

/**
 * GauntFactor(gff)を返す
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @returns GauntFactor(gff)
 */
function calcGauntFactor(temperature: Unit, frequency: Unit) {
  const t = temperature.toNumber("K");
  const f = frequency.toNumber("Hz");
  if (t > 2e5) {
    return 18.2 + Math.log(t * (3 / 2)) - Math.log(f);
  } else {
    return 24.5 + Math.log(t) - Math.log(f);
  }
}

/**
 * プラズマパラメータ(ξ)の計算
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @param heavyIonCorrection 重イオンの補正係数
 * @returns プラズマパラメータ(ξ)
 */
function calcPlasmaParameter(
  temperature: Unit,
  frequency: Unit,
  heavyIonCorrection = 1.2
) {
  return (
    9.78 * 1e-3 * calcGauntFactor(temperature, frequency) * heavyIonCorrection
  );
}

/**
 * エミッションメジャー(ΔEM)を返す
 * 電子は視線方向に対して一様に分布していると仮定する
 * @param electronDensity 電子密度 (cm^-3)
 * @param length 大気の厚さ (cm)
 * @returns エミッションメジャー(ΔEM)
 */
function calcEmissionMeasure(electronDensity: Unit, length?: Unit) {
  const l = length?.toNumber("cm") || unit(10, "km").toNumber("cm");
  const ed = electronDensity.toNumber("cm^3");
  return Math.pow(ed, 2) * l;
}

/**
 * 光学的厚さ(Δτ)を返す
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @param electronDensity 電子密度 (cm^-3)
 * @returns 光学的厚さ(Δτ)
 */
function calcOpticalThickness(
  temperature: Unit,
  frequency: Unit,
  electronDensity: Unit
) {
  const plasmaParameter = calcPlasmaParameter(temperature, frequency);
  const emissionMeasure = calcEmissionMeasure(electronDensity);
  const t = temperature.toNumber("K");
  const f = frequency.toNumber("Hz");
  return (
    (1.2 * plasmaParameter * emissionMeasure) /
    (Math.pow(t, 1.5) * Math.pow(f, 2))
  );
}

/**
 * 放射強度(Tb)を返す
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @param electronDensity 電子密度 (cm^-3)
 * @param backgroundBrightnessTemperature 背景からの放射強度 (K)
 * @retunrs 放射強度(Tb)
 */
function calcBrightnessTemperature(
  temperature: Unit,
  frequency: Unit,
  electronDensity: Unit,
  backgroundBrightnessTemperature?: Unit
) {
  const opticalThickness = calcOpticalThickness(
    temperature,
    frequency,
    electronDensity
  );
  const t = temperature.toNumber("K");
  const bbt = backgroundBrightnessTemperature?.toNumber("K") || 0;
  const brightnessTemperature = t * (1 - Math.exp(-1 * opticalThickness));

  if (backgroundBrightnessTemperature == null) {
    return brightnessTemperature;
  } else {
    return brightnessTemperature + bbt * Math.exp(-1 * opticalThickness);
  }
}

/**
 * 放射強度の観測値を返す
 * @param frequency 観測周波数 (Hz)
 * @param atmosphereModel 太陽大気モデル
 * @returns 放射強度の観測値
 */
function calcTotalBrightnesstemperature(
  frequency: Unit,
  atmosphereModel: Atmosphere
) {
  const brightnessTemperature = atmosphereModel.reduce((previous, current) => {
    return calcBrightnessTemperature(
      current.temperature,
      frequency,
      current.density,
      unit(previous, "K")
    );
  }, 0);

  return brightnessTemperature;
}

export { calcTotalBrightnesstemperature };
