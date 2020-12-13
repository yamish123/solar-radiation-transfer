import { unit } from "mathjs";

const atmosphereModelOrigin = [
  {
    height: 0,
    temperature: 6520,
    density: 76800000000000
  },
  {
    height: 100,
    temperature: 5410,
    density: 9890000000000
  },
  {
    height: 200,
    temperature: 4990,
    density: 3930000000000
  },
  {
    height: 300,
    temperature: 4770,
    density: 1710000000000
  },
  {
    height: 400,
    temperature: 4560,
    density: 724000000000
  },
  {
    height: 500,
    temperature: 4407.1,
    density: 303140000000
  },
  {
    height: 600,
    temperature: 4550,
    density: 126000000000
  },
  {
    height: 700,
    temperature: 5004.5,
    density: 83482000000
  },
  {
    height: 800,
    temperature: 5469,
    density: 106610000000
  },
  {
    height: 900,
    temperature: 5744.5,
    density: 123100000000
  },
  {
    height: 1000,
    temperature: 5900,
    density: 110000000000
  },
  {
    height: 1100,
    temperature: 6057.3,
    density: 96269000000
  },
  {
    height: 1200,
    temperature: 6218.8,
    density: 84252000000
  },
  {
    height: 1300,
    temperature: 6384.7,
    density: 73735000000
  },
  {
    height: 1400,
    temperature: 6554.9,
    density: 64531000000
  },
  {
    height: 1500,
    temperature: 6729.7,
    density: 56476000000
  },
  {
    height: 1600,
    temperature: 6909.2,
    density: 49426000000
  },
  {
    height: 1700,
    temperature: 7093.4,
    density: 43256000000
  },
  {
    height: 1800,
    temperature: 7282.5,
    density: 37857000000
  },
  {
    height: 1900,
    temperature: 7476.7,
    density: 33131000000
  },
  {
    height: 2000,
    temperature: 7676.1,
    density: 28996000000
  },
  {
    height: 2100,
    temperature: 7880.8,
    density: 25376000000
  },
  {
    height: 2200,
    temperature: 8090.9,
    density: 22209000000
  },
  {
    height: 2300,
    temperature: 8306.7,
    density: 19436000000
  },
  {
    height: 2400,
    temperature: 8528.2,
    density: 17010000000
  },
  {
    height: 2500,
    temperature: 8755.6,
    density: 14887000000
  },
  {
    height: 2600,
    temperature: 8989,
    density: 13029000000
  },
  {
    height: 2700,
    temperature: 9228.7,
    density: 11402000000
  },
  {
    height: 2800,
    temperature: 9474.8,
    density: 9979000000
  },
  {
    height: 2900,
    temperature: 9727.5,
    density: 8733300000
  },
  {
    height: 3000,
    temperature: 9986.8,
    density: 7643200000
  },
  {
    height: 3100,
    temperature: 10253,
    density: 6689100000
  },
  {
    height: 3200,
    temperature: 10527,
    density: 5854100000
  },
  {
    height: 3300,
    temperature: 10807,
    density: 5123400000
  },
  {
    height: 3400,
    temperature: 11095,
    density: 4483800000
  },
  {
    height: 3500,
    temperature: 12921,
    density: 3917100000
  },
  {
    height: 3600,
    temperature: 167230,
    density: 2658300000
  },
  {
    height: 3700,
    temperature: 299240,
    density: 1528100000
  },
  {
    height: 3800,
    temperature: 391640,
    density: 1124700000
  },
  {
    height: 3900,
    temperature: 421540,
    density: 1052600000
  },
  {
    height: 4000,
    temperature: 446740,
    density: 1005500000
  },
  {
    height: 4100,
    temperature: 471940,
    density: 958290000
  },
  {
    height: 4200,
    temperature: 497140,
    density: 911130000
  },
  {
    height: 4300,
    temperature: 522340,
    density: 863967500
  },
  {
    height: 4400,
    temperature: 547540,
    density: 816802000
  },
  {
    height: 4500,
    temperature: 572742,
    density: 702163333.3
  },
  {
    height: 4600,
    temperature: 597946,
    density: 673190000
  },
  {
    height: 4700,
    temperature: 623150,
    density: 675310000
  },
  {
    height: 4800,
    temperature: 634513.3333,
    density: 661883333.3
  },
  {
    height: 4900,
    temperature: 645876.6667,
    density: 648456666.7
  },
  {
    height: 5000,
    temperature: 657240,
    density: 635030000
  },
  {
    height: 5100,
    temperature: 667012.5,
    density: 625490000
  },
  {
    height: 5200,
    temperature: 676785,
    density: 615950000
  },
  {
    height: 5300,
    temperature: 686557.5,
    density: 606410000
  },
  {
    height: 5400,
    temperature: 696330,
    density: 596870000
  },
  {
    height: 5500,
    temperature: 706100,
    density: 587330000
  },
  {
    height: 5600,
    temperature: 715870,
    density: 577790000
  },
  {
    height: 5700,
    temperature: 725640,
    density: 568250000
  },
  {
    height: 5800,
    temperature: 735410,
    density: 558710000
  },
  {
    height: 5900,
    temperature: 745180,
    density: 549170000
  },
  {
    height: 6000,
    temperature: 756775.0663,
    density: 537166656.8
  },
  {
    height: 6100,
    temperature: 763351.0015,
    density: 531945036.8
  },
  {
    height: 6200,
    temperature: 769926.9367,
    density: 526723416.8
  },
  {
    height: 6300,
    temperature: 776502.8719,
    density: 521501796.8
  },
  {
    height: 6400,
    temperature: 783078.8071,
    density: 516280176.7
  },
  {
    height: 6500,
    temperature: 789654.7423,
    density: 511058556.7
  },
  {
    height: 6600,
    temperature: 796230.6775,
    density: 505836936.7
  },
  {
    height: 6700,
    temperature: 802806.6127,
    density: 500615316.6
  },
  {
    height: 6800,
    temperature: 809382.5479,
    density: 495393696.6
  },
  {
    height: 6900,
    temperature: 815958.4831,
    density: 490172076.6
  },
  {
    height: 7000,
    temperature: 822534.4183,
    density: 484950456.6
  },
  {
    height: 7100,
    temperature: 829110.3535,
    density: 479728836.5
  },
  {
    height: 7200,
    temperature: 835686.2887,
    density: 474507216.5
  },
  {
    height: 7300,
    temperature: 842262.2239,
    density: 469285596.5
  },
  {
    height: 7400,
    temperature: 845000,
    density: 469250000
  },
  {
    height: 7500,
    temperature: 850081.8182,
    density: 466046363.6
  },
  {
    height: 7600,
    temperature: 855163.6364,
    density: 462842727.3
  },
  {
    height: 7700,
    temperature: 860245.4545,
    density: 459639090.9
  },
  {
    height: 7800,
    temperature: 865327.2727,
    density: 456435454.5
  },
  {
    height: 7900,
    temperature: 870409.0909,
    density: 453231818.2
  },
  {
    height: 8000,
    temperature: 875490.9091,
    density: 450028181.8
  },
  {
    height: 8100,
    temperature: 880572.7273,
    density: 446824545.5
  },
  {
    height: 8200,
    temperature: 885654.5455,
    density: 443620909.1
  },
  {
    height: 8300,
    temperature: 890736.3636,
    density: 440417272.7
  },
  {
    height: 8400,
    temperature: 895818.1818,
    density: 437213636.4
  },
  {
    height: 8500,
    temperature: 900900,
    density: 434010000
  },
  {
    height: 8600,
    temperature: 911339.7898,
    density: 427280210.2
  },
  {
    height: 8700,
    temperature: 915051.4715,
    density: 424978528.5
  },
  {
    height: 8800,
    temperature: 918763.1532,
    density: 422676846.8
  },
  {
    height: 8900,
    temperature: 922474.8348,
    density: 420375165.2
  },
  {
    height: 9000,
    temperature: 926186.5165,
    density: 418073483.5
  },
  {
    height: 9100,
    temperature: 929898.1982,
    density: 415771801.8
  },
  {
    height: 9200,
    temperature: 933609.8799,
    density: 413470120.1
  },
  {
    height: 9300,
    temperature: 937321.5616,
    density: 411168438.4
  },
  {
    height: 9400,
    temperature: 941033.2432,
    density: 408866756.8
  },
  {
    height: 9500,
    temperature: 944744.9249,
    density: 406565075.1
  },
  {
    height: 9600,
    temperature: 948456.6066,
    density: 404263393.4
  },
  {
    height: 9700,
    temperature: 952168.2883,
    density: 401961711.7
  },
  {
    height: 9800,
    temperature: 955879.97,
    density: 399660030
  },
  {
    height: 9900,
    temperature: 959591.6517,
    density: 397358348.3
  },
  {
    height: 10000,
    temperature: 963303.3333,
    density: 395056666.7
  }
];

const atmosphereModel = atmosphereModelOrigin.map(val => ({
  height: unit(val.height, "km"),
  temperature: unit(val.temperature, "K"),
  density: unit(val.density, "cm^3")
}));

export { atmosphereModel };
