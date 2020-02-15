import reducer from '~/store/reducers/currencyData';
import { convertToBaseCurrency } from '~/store/reducers';
import * as types from '~/store/actions/actionTypes';

describe('currencyData reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should set data when dispatching SET_CURRENCY_DATA', () => {
    const initialState = undefined;

    const action = {
      type: types.SET_CURRENCY_DATA,
      data: {
        BGN: 1.9558,
        USD: 1.0842,
        id: '2020-02-14'
      }
    };

    const finalState = {
      BGN: 1.9558,
      USD: 1.0842,
      id: '2020-02-14'
    };

    expect(reducer(initialState, action)).toEqual(finalState);
  });
});

const currencyData = [
  {
    BGN: 1.9558,
    USD: 1.0842,
    id: '2020-02-14'
  }
];

describe('when calling convertToBaseCurrency with BGN as a base currency', () => {
  const state = {
    currencyData,
    user: {
      baseCurrency: 'BGN'
    }
  };

  it('should return the same number if converting to the same currency', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'BGN'
    })).toStrictEqual(20000);
  });

  it('should return correct BGN from EUR', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'EUR'
    })).toStrictEqual(39116);
  });

  it('should return correct BGN from USD', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'USD'
    })).toStrictEqual(36078.21);
  });
});

describe('when calling convertToBaseCurrency with EUR as a base currency', () => {
  const state = {
    currencyData,
    user: {
      baseCurrency: 'EUR'
    }
  };

  it('should return the same number if converting to the same currency', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'EUR'
    })).toStrictEqual(20000);
  });

  it('should return correct EUR from BGN', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'BGN'
    })).toStrictEqual(10225.99);
  });

  it('should return correct EUR from USD', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'USD'
    })).toStrictEqual(18446.78);
  });
});

describe('when calling convertToBaseCurrency with USD as a base currency', () => {
  const state = {
    currencyData,
    user: {
      baseCurrency: 'USD'
    }
  };

  it('should return the same number if converting to the same currency', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'USD'
    })).toStrictEqual(20000);
  });

  it('should return correct USD from EUR', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'EUR'
    })).toStrictEqual(21684);
  });

  it('should return correct USD from BGN', () => {
    expect(convertToBaseCurrency(state, {
      amount: 20000,
      currency: 'BGN'
    })).toStrictEqual(11087.02);
  });
});
