export type Atmosphere = AtmosphereLayer[];

type AtmosphereLayer = {
  height: number;
  temperature: number;
  density: number;
};

/**
 * GauntFactor(gff)の計算
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 */
function calcGauntFactor(temperature: number, frequency: number) {
  if (temperature > 2e5) {
    return 18.2 + Math.log(temperature * (3 / 2)) - Math.log(frequency);
  } else {
    return 24.5 + Math.log(temperature) - Math.log(frequency);
  }
}

/**
 * プラズマパラメータ(ξ)の計算
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @param heavyIonCorrection 重イオンの補正係数
 */
function calcPlasmaParameter(
  temperature: number,
  frequency: number,
  heavyIonCorrection = 1.2
) {
  return (
    9.78 * 1e-3 * calcGauntFactor(temperature, frequency) * heavyIonCorrection
  );
}

/**
 * エミッションメジャー(ΔEM)の計算
 * 電子は視線方向に対して一様に分布していると仮定する
 * @param electronDensity 電子密度 (cm^-3)
 * @param length 大気の厚さ (cm)
 */
function calcEmissionMeasure(electronDensity: number, length = 1e7) {
  return Math.pow(electronDensity, 2) * length;
}

/**
 * 光学的厚さ(Δτ)の計算
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @param electronDensity 電子密度 (cm^-3)
 */
function calcOpticalThickness(
  temperature: number,
  frequency: number,
  electronDensity: number
) {
  const plasmaParameter = calcPlasmaParameter(temperature, frequency);
  const emissionMeasure = calcEmissionMeasure(electronDensity);
  return (
    (1.2 * plasmaParameter * emissionMeasure) /
    (Math.pow(temperature, 1.5) * Math.pow(frequency, 2))
  );
}

/**
 * 放射強度(Tb)の計算
 * @param temperature 電子温度 (K)
 * @param frequency 観測周波数 (Hz)
 * @param electronDensity 電子密度 (cm^-3)
 * @param backgroundBrightnessTemperature 背景からの放射強度 (K)
 */
function calcBrightnessTemperature(
  temperature: number,
  frequency: number,
  electronDensity: number,
  backgroundBrightnessTemperature?: number
) {
  const opticalThickness = calcOpticalThickness(
    temperature,
    frequency,
    electronDensity
  );
  const brightnessTemperature =
    temperature * (1 - Math.exp(-1 * opticalThickness));

  if (backgroundBrightnessTemperature == null) {
    return brightnessTemperature;
  } else {
    return (
      brightnessTemperature +
      backgroundBrightnessTemperature * Math.exp(-1 * opticalThickness)
    );
  }
}

/**
 * 観測される放射強度の計算
 * @param frequency 観測周波数 (Hz)
 * @param atmosphereModel 太陽大気モデル
 */
function calcTotalBrightnesstemperature(
  frequency: number,
  atmosphereModel: Atmosphere
) {
  const brightnessTemperature = atmosphereModel.reduce((previous, current) => {
    return calcBrightnessTemperature(
      current.temperature,
      frequency,
      current.density,
      previous
    );
  }, 0);

  return brightnessTemperature;
}

export { calcTotalBrightnesstemperature };
