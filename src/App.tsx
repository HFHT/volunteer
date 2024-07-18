import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import './App.css';
import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import { fetchAll, fetchConstituents, fetchLocations, fetchSAS, fetchSettings, getLocation, uniqueBarCode } from './helpers';
import { Error } from './pages';
import { Main } from './Main';
import { Authenticated } from './Authentication/Authenticated';

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});
(async () => {
  try {
    const sas = await fetchSAS();
    const coords = await getLocation()
    const theData = await fetchAll([
      fetchConstituents,
      fetchLocations,
      fetchSettings
    ])
    let props = {
      constituents: theData[0],
      locations: theData[1],
      settings: theData[2],
      coords: coords,
      sas: sas
    }
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <APIProvider apiKey={`${import.meta.env.VITE_GOOGLE_APIKEY}`} libraries={['places']}>
        <MantineProvider theme={theme}>
          <Authenticated constituents={props.constituents}>
            <BrowserRouter>
              {(sas && theData) ? <Main props={props} /> : <Error sas={sas} settings={theData[2]} />}
            </BrowserRouter>
          </Authenticated>
        </MantineProvider>
      </APIProvider>
    )
  } catch (e) {
    console.log('Initialization Error', e);
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <>
        {<h3>&nbsp;Trouble connecting to the Habitat Volunteer System. You may be experiencing problems with your internet connection. Please try again later.</h3>}
      </>,
    );
  }
})()