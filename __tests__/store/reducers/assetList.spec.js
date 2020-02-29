import reducer from '~/store/reducers/assetList';
import { getActiveMonths } from '~/store/reducers';

describe('assetList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
});

describe('when calling getActiveMonths', () => {
  it('should return the correct months for a single asset', () => {
    const state = {
      assetList: [
        {
          amount: {
            '2019-12': 800,
            '2020-02': 1000,
            '2020-01': 900
          }
        },
      ]
    };

    expect(getActiveMonths(state)).toStrictEqual(['2020-02', '2020-01', '2019-12']);
  });

  it('should return the correct months for duplicated month entries', () => {
    const state = {
      assetList: [
        {
          amount: {
            '2019-12': 800,
            '2020-02': 1000,
            '2020-01': 900
          }
        },
        {
          amount: {
            '2020-02': 100,
            '2019-08': 900
          }
        },
      ]
    };

    expect(getActiveMonths(state)).toStrictEqual(['2020-02', '2020-01', '2019-12', '2019-08']);
  });
});
