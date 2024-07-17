import { sortByNewest, sortByOldest, filterDirector, filterGender, sortByAZ, sortByZA, totalCharacterGender} from '../src/data.js';

const emptyDataSample = [];
const dataSample = [
  {
    "title": "Castle in the Sky",
    "director": "Hayao Miyazaki",
    "release_date": "1986",
    "people": [
      {
        "name": "Pazu",
        "gender": "Male",
        "age": "13",
      },
      {
        "name": "Lusheeta Toel Ul Laputa",
        "gender": "Female",
        "age": "13",
      },
      {
        "name": "Dola",
        "gender": "Female",
        "age": "60",
      }
    ]
  },
  {
    "title": "Whisper of the Heart",
    "director": "Yoshifumi Kondō",
    "release_date": "1995",
    "people": [
      {
        "name": "Shizuku Tsukishima",
        "gender": "Female",
        "age": "14",
      },
      {
        "name": "Seiji Amasawa",
        "gender": "Male",
        "age": "15",
      },
      {
        "name": "Chu Totoro",
        "gender": "NA",
        "age": "",
      }
    ]
  }
]
const characterSampleMapped = [
  {
    "title": "Castle in the Sky",
    "director": "Hayao Miyazaki",
    "release_date": "1986",
    "people": [
      {
        "name": "Lusheeta Toel Ul Laputa",
        "gender": "Female",
        "age": "13",
      },
      {
        "name": "Pazu",
        "gender": "Male",
        "age": "13",
      },
      {
        "name": "Dola",
        "gender": "Female",
        "age": "60",
      }
    ]
  },
];
const characterDataSample = characterSampleMapped.flatMap(movie => movie.people);

describe('sortByNewest', () => {
  const expectedNewestFilms = [
    {
      "title": "Whisper of the Heart",
      "director": "Yoshifumi Kondō",
      "release_date": "1995",
      "people": [
        {
          "name": "Shizuku Tsukishima",
          "gender": "Female",
          "age": "14",
        },
        {
          "name": "Seiji Amasawa",
          "gender": "Male",
          "age": "15",
        },
        {
          "name": "Chu Totoro",
          "gender": "NA",
          "age": "",
        }
      ]
    },
    {
      "title": "Castle in the Sky",
      "director": "Hayao Miyazaki",
      "release_date": "1986",
      "people": [
        {
          "name": "Pazu",
          "gender": "Male",
          "age": "13",
        },
        {
          "name": "Lusheeta Toel Ul Laputa",
          "gender": "Female",
          "age": "13",
        },
        {
          "name": "Dola",
          "gender": "Female",
          "age": "60",
        }
      ]
    }
  ]
  
  it('is a function', () => {
    expect(typeof sortByNewest).toBe('function');
  });

  it('must return the newest movies', () => {
    expect(sortByNewest(dataSample)).toEqual(expectedNewestFilms);
  });

  it ('must not return the newest movies', () => {
    expect(sortByNewest(dataSample)).not.toEqual(emptyDataSample);
  });
});

describe('sortByOldest', () => {
  it('is a function', () => {
    expect(typeof sortByOldest).toBe('function');
  });

  it('must return the oldest movies', () => {
    expect(sortByOldest(dataSample)).toEqual(dataSample);
  });
  it ('must not return the oldest movies', () => {
    expect(sortByOldest(dataSample)).not.toEqual(emptyDataSample);
  });
});

describe('filterDirector', () => {
  const directorSample = 'Hayao Miyazaki';
  const expectedFilms = [
    {
      "title": "Castle in the Sky",
      "director": "Hayao Miyazaki",
      "release_date": "1986",
      "people": [
        {
          "name": "Pazu",
          "gender": "Male",
          "age": "13",
        },
        {
          "name": "Lusheeta Toel Ul Laputa",
          "gender": "Female",
          "age": "13",
        },
        {
          "name": "Dola",
          "gender": "Female",
          "age": "60",
        },
      ]}];

  it('is a function', () => {
    expect(typeof filterDirector).toBe('function');
  });  

  it('must return only from director Hayao Miyazaki', () => {
    expect(filterDirector(dataSample, directorSample)).toEqual(expectedFilms);
  })
}); 

describe('filterGender', () => {
  const characterDataSample = dataSample.flatMap(movie => movie.people);
  it ('is a function', () => {
    expect(typeof filterGender).toBe('function');
  })
  it ('must return only females', () => {
    const filterFemale = filterGender(characterDataSample, "Female");
    expect (filterFemale[0].gender).toEqual("Female");
  }); 
});

describe('sortByAZ', () => {
  const expectPruebaAZ = [
    
    {
      "name": "Dola",
      "gender": "Female",
      "age": "60",
    },
    {
      "name": "Lusheeta Toel Ul Laputa",
      "gender": "Female",
      "age": "13",
    },
    {
      "name": "Pazu",
      "gender": "Male",
      "age": "13",
    }
  ];

  it('is a function', () => {
    expect(typeof sortByAZ).toBe('function');
  });

  it('must return characters ordered from A to Z', () => {
    expect(sortByAZ(characterDataSample)).toEqual(expectPruebaAZ);
  });
  
  it('must return characters ordered from A to Z', () => {
    expect(sortByAZ(characterDataSample)).toBeTruthy();
  });
});

describe('sortByZA', () => {
  const expectPruebaZA = [
    
    {
      "name": "Pazu",
      "gender": "Male",
      "age": "13",
    },
    {
      "name": "Lusheeta Toel Ul Laputa",
      "gender": "Female",
      "age": "13",
    },
    {
      "name": "Dola",
      "gender": "Female",
      "age": "60",
    },
  ];

  it('is a function', () => {
    expect(typeof sortByZA).toBe('function');
  });
  
  it('must return characters ordered from Z to A', () => {
    expect(sortByZA(characterDataSample)).toEqual(expectPruebaZA);
  });

  it('must return characters ordered from Z to A', () => {
    expect(sortByZA(characterDataSample)).toBeTruthy();
  });
});

describe('totalCharacterGender', () => {
  it('is a function', () => {
    expect(typeof totalCharacterGender).toBe('function');
  });

  it('must return the total amount of female characters', () => {
    expect(totalCharacterGender(characterDataSample, 'Female')).toEqual(2);
  });

  it('must return the total amount of male characters', () => {
    expect(totalCharacterGender(characterDataSample, 'Male')).toEqual(1);
  })
})