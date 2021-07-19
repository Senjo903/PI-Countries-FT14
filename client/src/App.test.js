import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardCountry from './components/CardCountry';
import CardActivity from './components/CardActivity';
import { getData, getStatus, resetAll, getPage, getTarget, getFilter } from './actions'

const propsCountry = {
  ID: "ARG",
  name: "argentina",
  imgURL: "https://restcountries.eu/data/arg.svg",
  continent: "americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: 2780400,
  population: 43590400,
  ConAct: [
    {
      ID: 1,
      name: "lucha libre",
      duration: "3 hs",
      station: "summer",
      difficulty: "3",
      imgURL: "",
    },
    {
      ID: 2,
      name: "pesca",
      duration: "todo el dia",
      station: "summer",
      difficulty: "2",
      imgURL: "",
    }
  ]
}
const propsActivity = {
      ID: 1,
      name: "lucha libre",
      duration: "3 hs",
      station: "summer",
      difficulty: "3",
      imgURL: "",
    }
    const propsActivityTwo = {
      ID: 1,
      name: "lucha libre",
      duration: "3 hs",
      station: "summer",
      difficulty: "3",
      imgURL: "https://www.latercera.com/resizer/9PSWx2zlPPU-lk52zu9mI7BK4w8=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/PYK7PR2QBNDARGVBEQDCHB56SU.jpg",
    }
const imgDefault = 'https://mirabhayanderinfo.com/v2/uploads/images/image-not-found.jpg';

describe('Componente: CardCountry', () => {
  it('el nombre debe mostrarse y tener cada primera letra mayuscula',() => {
    render(<CardCountry data={propsCountry}/>, {
      wrapper: MemoryRouter
    })
    screen.getByText(propsCountry.name.replace(/\b\w/g, l => l.toUpperCase()));
  })
  it('contener una imagen con la url entregada',() => {
    render(<CardCountry data={propsCountry}/>, {
      wrapper: MemoryRouter
    })
    expect(screen.getByRole('img')).toHaveAttribute('src', propsCountry.imgURL);
  })
  it('el alt de la imagen debe ser el dato name',() => {
    render(<CardCountry data={propsCountry}/>, {
      wrapper: MemoryRouter
    })
    expect(screen.getByRole('img')).toHaveAttribute('alt', propsCountry.name);
  })
  it('el continente debe mostrarse y tener la primera letra mayuscula',() => {
    render(<CardCountry data={propsCountry}/>, {
      wrapper: MemoryRouter
    })
    screen.getByText(propsCountry.continent.charAt(0).toUpperCase() + (propsCountry.continent).slice(1));
  })
})

describe('Componente: CardActivity', () => {
  it('contener una imagen con la url entregada',() => {
    render(<CardActivity data={propsActivityTwo}/>, {
      wrapper: MemoryRouter
    })
    expect(screen.getByRole('img')).toHaveAttribute('src', propsActivityTwo.imgURL);
  })
  it('si la imagen tiene un valor vacio reemplazarla por una imagen por default',() => {
    render(<CardActivity data={propsActivity}/>, {
      wrapper: MemoryRouter
    })
    expect(screen.getByRole('img')).toHaveAttribute('src', imgDefault);
  })
  it('el alt de la imagen debe ser el dato name',() => {
    render(<CardActivity data={propsActivity}/>, {
      wrapper: MemoryRouter
    })
    expect(screen.getByRole('img')).toHaveAttribute('alt', propsActivity.name);
  })
})

describe('creacion: Actions', () => {
  it('getData: retornar una action type "GET_COUNTRY" y el payload con el valor que recibe por argumento:', () => {
    const payload = { prueba: 'tipo de action'};
    expect(getData(payload)).toEqual({ type: 'GET_COUNTRY', payload: payload })
  });
  it('getStatus: retornar una action type "GET_STATUS" y el payload con el valor que recibe por argumento:', () => {
    const payload = { prueba: 'tipo de action'};
    expect(getStatus(payload)).toEqual({ type: 'GET_STATUS', payload: payload })
  });
  it('resetAll: retornar una action type "RESET_ALL" y el payload con el valor que recibe por argumento:', () => {
    const payload = { prueba: 'tipo de action'};
    expect(resetAll(payload)).toEqual({ type: 'RESET_ALL', payload: payload })
  });
  it('getPage: retornar una action type "GET_PAGE" y el payload con el valor que recibe por argumento:', () => {
    const payload = { prueba: 'tipo de action'};
    expect(getPage(payload)).toEqual({ type: 'GET_PAGE', payload: payload })
  });
  it('getTarget: retornar una action type "GET_TARGET" y el payload con el valor que recibe por argumento:', () => {
    const payload = { prueba: 'tipo de action'};
    expect(getTarget(payload)).toEqual({ type: 'GET_TARGET', payload: payload })
  });
  it('getFilter: retornar una action type "GET_OPTION_FILTER" y el payload con el valor que recibe por argumento:', () => {
    const payload = { prueba: 'tipo de action'};
    expect(getFilter(payload)).toEqual({ type: 'GET_OPTION_FILTER', payload: payload })
  });
})
