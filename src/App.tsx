import './App.css';
import ReactDOM from 'react-dom/client'
import { APIProvider } from '@vis.gl/react-google-maps';
import { fetchAll, fetchConstituents, fetchLocations, fetchSAS, fetchSettings, uniqueBarCode } from './helpers';
import { Error, Main } from './pages';
import { PageLayout } from './components';

(async () => {
  try {
    const sas = await fetchSAS();

    const theData = await fetchAll([
      fetchConstituents,
      fetchLocations,
      fetchSettings
    ])

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <APIProvider apiKey={`${import.meta.env.VITE_GOOGLE_APIKEY}`} libraries={['places']}>
        <PageLayout>
          {(sas && theData) ? <Main sas={sas} constituents={theData[0]} locations={theData[1]} settings={theData[2]} /> : <Error sas={sas} settings={theData[2]} />}
        </PageLayout>
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