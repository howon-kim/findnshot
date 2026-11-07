'use strict';
// Manually annotated artwork regions, percentages of the full image.
// Generic labels are used where the painted species or material is uncertain.
const objects = [
  {
    "id": "tankard",
    "name": "뚜껑 달린 잔",
    "en": "Lidded tankard",
    "box": {
      "x": 76.2,
      "y": 33.8,
      "w": 4.3,
      "h": 11
    }
  },
  {
    "id": "brass-plate",
    "name": "황동 접시",
    "en": "Brass plate",
    "box": {
      "x": 94.5,
      "y": 39.8,
      "w": 5.3,
      "h": 9.4
    }
  },
  {
    "id": "earthenware",
    "name": "갈색 주전자",
    "en": "Earthenware jug",
    "box": {
      "x": 56.7,
      "y": 51.4,
      "w": 6.3,
      "h": 14.6
    }
  },
  {
    "id": "stoneware",
    "name": "밝은색 주전자",
    "en": "Stoneware jug",
    "box": {
      "x": 91.7,
      "y": 50.5,
      "w": 4.7,
      "h": 10.6
    }
  },
  {
    "id": "cauliflower",
    "name": "콜리플라워",
    "en": "Cauliflower",
    "box": {
      "x": 54.4,
      "y": 70.4,
      "w": 6.1,
      "h": 11.6
    }
  },
  {
    "id": "artichoke",
    "name": "아티초크",
    "en": "Artichoke",
    "box": {
      "x": 66.2,
      "y": 66.9,
      "w": 5.3,
      "h": 7.5
    }
  },
  {
    "id": "cucumber",
    "name": "오이",
    "en": "Cucumber",
    "box": {
      "x": 44.6,
      "y": 76.8,
      "w": 5.7,
      "h": 6
    }
  },
  {
    "id": "grapes",
    "name": "포도",
    "en": "Grapes",
    "box": {
      "x": 43.7,
      "y": 83.1,
      "w": 8.3,
      "h": 12.4
    }
  },
  {
    "id": "fruit-plate",
    "name": "과일 접시",
    "en": "Plate of fruit",
    "box": {
      "x": 73.3,
      "y": 86.2,
      "w": 9.4,
      "h": 6.9
    }
  },
  {
    "id": "goblet",
    "name": "유리잔",
    "en": "Glass goblet",
    "box": {
      "x": 67.1,
      "y": 92.6,
      "w": 4.2,
      "h": 5.4
    }
  },
  {
    "id": "curtain",
    "name": "초록 커튼",
    "en": "Green curtain",
    "box": {
      "x": 18.698,
      "y": 0,
      "w": 9.115,
      "h": 19.099
    }
  },
  {
    "id": "held-cup",
    "name": "손에 든 잔",
    "en": "Drinking cup",
    "box": {
      "x": 10,
      "y": 35.752,
      "w": 3.073,
      "h": 11.841
    }
  },
  {
    "id": "roast-bird",
    "name": "꼬치에 꽂은 닭",
    "en": "Chicken on a spit",
    "box": {
      "x": 21.458,
      "y": 36.669,
      "w": 7.656,
      "h": 14.209
    }
  },
  {
    "id": "plucked-hen",
    "name": "손질 중인 닭",
    "en": "Chicken being prepared",
    "box": {
      "x": 15.26,
      "y": 68.067,
      "w": 9.271,
      "h": 22.154
    }
  },
  {
    "id": "shelf",
    "name": "나무 선반",
    "en": "Wooden shelf",
    "box": {
      "x": 55.104,
      "y": 0,
      "w": 44.792,
      "h": 6.646
    }
  },
  {
    "id": "hanging-turkey",
    "name": "매달린 칠면조",
    "en": "Hanging turkey",
    "box": {
      "x": 52.969,
      "y": 2.979,
      "w": 19.01,
      "h": 50.955
    }
  },
  {
    "id": "hanging-game-one",
    "name": "매달린 새",
    "en": "Hanging game bird",
    "box": {
      "x": 71.042,
      "y": 4.813,
      "w": 5.781,
      "h": 21.085
    }
  },
  {
    "id": "hanging-game-two",
    "name": "옆에 매달린 새",
    "en": "Second game bird",
    "box": {
      "x": 75.573,
      "y": 5.424,
      "w": 4.948,
      "h": 20.092
    }
  },
  {
    "id": "pheasant",
    "name": "긴 꼬리의 꿩",
    "en": "Long-tailed pheasant",
    "box": {
      "x": 80.313,
      "y": 5.653,
      "w": 11.823,
      "h": 41.482
    }
  },
  {
    "id": "rooster",
    "name": "매달린 수탉",
    "en": "Hanging rooster",
    "box": {
      "x": 89.688,
      "y": 4.202,
      "w": 10.208,
      "h": 39.496
    }
  },
  {
    "id": "funnel",
    "name": "깔때기",
    "en": "Funnel",
    "box": {
      "x": 58.177,
      "y": 22.613,
      "w": 4.896,
      "h": 7.869
    }
  },
  {
    "id": "mortar",
    "name": "절구",
    "en": "Mortar",
    "box": {
      "x": 79.948,
      "y": 34.301,
      "w": 5.625,
      "h": 10.008
    }
  },
  {
    "id": "pestle",
    "name": "절굿공이",
    "en": "Pestle",
    "box": {
      "x": 78.906,
      "y": 29.183,
      "w": 3.542,
      "h": 10.619
    }
  },
  {
    "id": "citrus-dish",
    "name": "감귤이 놓인 접시",
    "en": "Citrus dish",
    "box": {
      "x": 83.698,
      "y": 41.711,
      "w": 10.833,
      "h": 7.639
    }
  },
  {
    "id": "lemon-half",
    "name": "자른 레몬",
    "en": "Cut lemon",
    "box": {
      "x": 85.729,
      "y": 41.176,
      "w": 2.865,
      "h": 5.882
    }
  },
  {
    "id": "orange-front",
    "name": "앞쪽 감귤",
    "en": "Front citrus fruit",
    "box": {
      "x": 88.542,
      "y": 44.156,
      "w": 2.708,
      "h": 3.667
    }
  },
  {
    "id": "orange-back",
    "name": "뒤쪽 감귤",
    "en": "Back citrus fruit",
    "box": {
      "x": 90.885,
      "y": 41.635,
      "w": 2.5,
      "h": 4.354
    }
  },
  {
    "id": "back-cloth",
    "name": "흰 천",
    "en": "White cloth",
    "box": {
      "x": 71.563,
      "y": 7.028,
      "w": 28.333,
      "h": 43.163
    }
  },
  {
    "id": "small-lidded-jug",
    "name": "작은 뚜껑 주전자",
    "en": "Small lidded jug",
    "box": {
      "x": 95.469,
      "y": 58.518,
      "w": 4.063,
      "h": 7.869
    }
  },
  {
    "id": "woven-flask",
    "name": "감싼 병",
    "en": "Wicker-covered flask",
    "box": {
      "x": 90.26,
      "y": 58.747,
      "w": 5.156,
      "h": 10.39
    }
  },
  {
    "id": "dressed-chicken",
    "name": "손질한 가금류",
    "en": "Dressed poultry",
    "box": {
      "x": 74.375,
      "y": 48.739,
      "w": 12.188,
      "h": 12.758
    }
  },
  {
    "id": "poultry-platter",
    "name": "가금류 접시",
    "en": "Poultry platter",
    "box": {
      "x": 73.75,
      "y": 60.122,
      "w": 15.26,
      "h": 7.869
    }
  },
  {
    "id": "small-duck",
    "name": "접시 위 새",
    "en": "Bird on a plate",
    "box": {
      "x": 61.667,
      "y": 53.17,
      "w": 11.458,
      "h": 11.536
    }
  },
  {
    "id": "duck-plate",
    "name": "새가 놓인 접시",
    "en": "Plate beneath the bird",
    "box": {
      "x": 61.406,
      "y": 61.879,
      "w": 12.031,
      "h": 5.271
    }
  },
  {
    "id": "basket-duck",
    "name": "바구니 위 오리",
    "en": "Duck on a basket",
    "box": {
      "x": 47.5,
      "y": 56.379,
      "w": 13.75,
      "h": 14.362
    }
  },
  {
    "id": "woven-basket",
    "name": "작은 바구니",
    "en": "Woven basket",
    "box": {
      "x": 46.458,
      "y": 67.074,
      "w": 12.917,
      "h": 7.41
    }
  },
  {
    "id": "knife",
    "name": "칼",
    "en": "Knife",
    "box": {
      "x": 29.271,
      "y": 59.511,
      "w": 7.135,
      "h": 7.869
    }
  },
  {
    "id": "shallow-dish",
    "name": "얕은 접시",
    "en": "Shallow dish",
    "box": {
      "x": 28.177,
      "y": 61.65,
      "w": 11.51,
      "h": 7.028
    }
  },
  {
    "id": "white-roots",
    "name": "흰 뿌리채소",
    "en": "White root vegetables",
    "box": {
      "x": 38.281,
      "y": 63.484,
      "w": 8.281,
      "h": 6.799
    }
  },
  {
    "id": "roots",
    "name": "길쭉한 뿌리채소",
    "en": "Long root vegetables",
    "box": {
      "x": 36.042,
      "y": 65.317,
      "w": 5.885,
      "h": 5.271
    }
  },
  {
    "id": "upper-cucumber",
    "name": "바구니 속 오이",
    "en": "Cucumber in the basket",
    "box": {
      "x": 54.948,
      "y": 63.102,
      "w": 5.469,
      "h": 5.195
    }
  },
  {
    "id": "left-artichoke",
    "name": "왼쪽 아티초크",
    "en": "Left artichoke",
    "box": {
      "x": 60.729,
      "y": 66.387,
      "w": 4.635,
      "h": 7.105
    }
  },
  {
    "id": "small-artichoke",
    "name": "작은 아티초크",
    "en": "Small artichoke",
    "box": {
      "x": 62.292,
      "y": 72.574,
      "w": 3.698,
      "h": 5.271
    }
  },
  {
    "id": "leafy-greens",
    "name": "잎채소",
    "en": "Leafy greens",
    "box": {
      "x": 59.531,
      "y": 81.054,
      "w": 5.573,
      "h": 8.862
    }
  },
  {
    "id": "small-cucumber",
    "name": "작은 오이",
    "en": "Small cucumber",
    "box": {
      "x": 48.594,
      "y": 79.144,
      "w": 3.385,
      "h": 4.507
    }
  },
  {
    "id": "upright-cucumber",
    "name": "세워진 오이",
    "en": "Upright cucumber",
    "box": {
      "x": 48.958,
      "y": 72.04,
      "w": 2.708,
      "h": 4.813
    }
  },
  {
    "id": "red-fruit",
    "name": "붉은 과일",
    "en": "Red fruit",
    "box": {
      "x": 50,
      "y": 73.491,
      "w": 3.073,
      "h": 4.736
    }
  },
  {
    "id": "fruit-behind",
    "name": "뒤쪽 붉은 과일",
    "en": "Fruit behind the cucumber",
    "box": {
      "x": 47.708,
      "y": 73.109,
      "w": 2.396,
      "h": 2.674
    }
  },
  {
    "id": "pale-fruit",
    "name": "연한 빛 과일",
    "en": "Pale fruit",
    "box": {
      "x": 53.073,
      "y": 79.985,
      "w": 1.667,
      "h": 3.209
    }
  },
  {
    "id": "amber-grapes",
    "name": "호박빛 포도",
    "en": "Amber grapes",
    "box": {
      "x": 52.344,
      "y": 81.742,
      "w": 5.99,
      "h": 5.959
    }
  },
  {
    "id": "peaches",
    "name": "복숭아 더미",
    "en": "Pile of peaches",
    "box": {
      "x": 52.656,
      "y": 86.402,
      "w": 8.75,
      "h": 6.417
    }
  },
  {
    "id": "pears",
    "name": "배",
    "en": "Pears",
    "box": {
      "x": 51.25,
      "y": 90.222,
      "w": 6.146,
      "h": 5.653
    }
  },
  {
    "id": "walnuts",
    "name": "호두",
    "en": "Walnuts",
    "box": {
      "x": 56.927,
      "y": 91.138,
      "w": 4.479,
      "h": 4.507
    }
  },
  {
    "id": "footed-bowl",
    "name": "받침 달린 그릇",
    "en": "Footed bowl",
    "box": {
      "x": 60.208,
      "y": 88.235,
      "w": 9.063,
      "h": 11.536
    }
  },
  {
    "id": "bowl-fruit",
    "name": "그릇 속 열매",
    "en": "Fruit in the bowl",
    "box": {
      "x": 61.875,
      "y": 89.076,
      "w": 5.729,
      "h": 4.507
    }
  },
  {
    "id": "second-glass",
    "name": "작은 유리잔",
    "en": "Small glass",
    "box": {
      "x": 70.885,
      "y": 94.805,
      "w": 3.021,
      "h": 5.118
    }
  },
  {
    "id": "napkin",
    "name": "접힌 냅킨",
    "en": "Folded napkin",
    "box": {
      "x": 71.667,
      "y": 91.597,
      "w": 12.708,
      "h": 8.327
    }
  },
  {
    "id": "small-pitcher",
    "name": "작은 도자기 병",
    "en": "Small ceramic pitcher",
    "box": {
      "x": 95.313,
      "y": 81.742,
      "w": 4.583,
      "h": 7.563
    }
  },
  {
    "id": "left-hare",
    "name": "왼쪽 토끼 식재료",
    "en": "Hare on the left",
    "box": {
      "x": 35.781,
      "y": 74.255,
      "w": 13.281,
      "h": 16.73
    }
  },
  {
    "id": "right-hare",
    "name": "오른쪽 토끼 식재료",
    "en": "Hare on the right",
    "box": {
      "x": 85.26,
      "y": 76.471,
      "w": 10.99,
      "h": 16.043
    }
  },
  {
    "id": "lower-hare",
    "name": "아래쪽 토끼 식재료",
    "en": "Hare in the foreground",
    "box": {
      "x": 85.313,
      "y": 88.617,
      "w": 14.427,
      "h": 11.306
    }
  },
  {
    "id": "small-game",
    "name": "작은 사냥감 새",
    "en": "Small game bird",
    "box": {
      "x": 81.979,
      "y": 70.588,
      "w": 6.198,
      "h": 14.057
    }
  },
  {
    "id": "right-game",
    "name": "오른쪽 사냥감 새",
    "en": "Game bird on the right",
    "box": {
      "x": 94.844,
      "y": 66.005,
      "w": 5.052,
      "h": 15.661
    }
  },
  {
    "id": "meat-cut",
    "name": "큼직한 고기",
    "en": "Large cut of meat",
    "box": {
      "x": 61.51,
      "y": 58.594,
      "w": 18.385,
      "h": 32.391
    }
  },
  {
    "id": "meat-platter",
    "name": "고기 아래 접시",
    "en": "Meat platter",
    "box": {
      "x": 75.417,
      "y": 78.228,
      "w": 7.031,
      "h": 8.403
    }
  },
  {
    "id": "red-tray",
    "name": "붉은 쟁반",
    "en": "Red tray",
    "box": {
      "x": 86.458,
      "y": 94.576,
      "w": 13.438,
      "h": 5.348
    }
  },
  {
    "id": "table-leg",
    "name": "나무 받침 다리",
    "en": "Wooden support leg",
    "box": {
      "x": 36.146,
      "y": 78.992,
      "w": 1.563,
      "h": 17.265
    }
  },
  {
    "id": "fruit-basket",
    "name": "과일 바구니",
    "en": "Fruit basket",
    "box": {
      "x": 43.385,
      "y": 94.194,
      "w": 18.333,
      "h": 5.653
    }
  },
  {
    "id": "grape-plate",
    "name": "포도 아래 큰 접시",
    "en": "Large plate under the grapes",
    "box": {
      "x": 38.281,
      "y": 82.888,
      "w": 14.323,
      "h": 12.834
    }
  },
  {
    "id": "plate-fruit",
    "name": "접시 속 노란 과일",
    "en": "Yellow fruit on the plate",
    "box": {
      "x": 74.896,
      "y": 86.555,
      "w": 6.146,
      "h": 5.959
    }
  }
];
const privacyRegions = [
  {
    "id": "privacy-1",
    "box": {
      "x": 26.927,
      "y": 5.5,
      "w": 6.667,
      "h": 12.376
    }
  },
  {
    "id": "privacy-2",
    "box": {
      "x": 0.469,
      "y": 22.918,
      "w": 6.25,
      "h": 11.536
    }
  },
  {
    "id": "privacy-3",
    "box": {
      "x": 13.542,
      "y": 41.253,
      "w": 7.969,
      "h": 12.605
    }
  },
  {
    "id": "privacy-4",
    "box": {
      "x": 33.021,
      "y": 15.432,
      "w": 4.271,
      "h": 8.251
    }
  },
  {
    "id": "privacy-5",
    "box": {
      "x": 36.667,
      "y": 16.425,
      "w": 5.573,
      "h": 10.924
    }
  },
  {
    "id": "privacy-6",
    "box": {
      "x": 35.469,
      "y": 31.322,
      "w": 3.958,
      "h": 7.945
    }
  },
  {
    "id": "privacy-7",
    "box": {
      "x": 45.156,
      "y": 22.918,
      "w": 1.042,
      "h": 2.674
    }
  },
  {
    "id": "privacy-8",
    "box": {
      "x": 46.042,
      "y": 22.689,
      "w": 1.927,
      "h": 3.972
    }
  },
  {
    "id": "privacy-9",
    "box": {
      "x": 48.49,
      "y": 23.147,
      "w": 1.354,
      "h": 3.056
    }
  },
  {
    "id": "privacy-10",
    "box": {
      "x": 53.698,
      "y": 22.383,
      "w": 1.563,
      "h": 3.514
    }
  },
  {
    "id": "privacy-11",
    "box": {
      "x": 52.031,
      "y": 25.898,
      "w": 1.719,
      "h": 3.591
    }
  },
  {
    "id": "privacy-12",
    "box": {
      "x": 49.219,
      "y": 29.87,
      "w": 1.354,
      "h": 2.521
    }
  },
  {
    "id": "privacy-13",
    "box": {
      "x": 47.448,
      "y": 32.009,
      "w": 1.875,
      "h": 3.514
    }
  },
  {
    "id": "privacy-14",
    "box": {
      "x": 53.646,
      "y": 31.474,
      "w": 1.615,
      "h": 3.591
    }
  },
  {
    "id": "privacy-15",
    "box": {
      "x": 55.208,
      "y": 29.641,
      "w": 1.198,
      "h": 2.827
    }
  }
];
