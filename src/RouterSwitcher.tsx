import { Route, Routes } from 'react-router-dom';
import { Events, History, NotFound, RecordHours} from './pages';

const RouterSwitcher = ({ props }: any) => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<RecordHours props={props}/>} />
            <Route path="/history" element={<History props={props}/>} />
            <Route path="/events" element={<Events props={props}/>} />
        </Routes>
    );
};

export default RouterSwitcher;