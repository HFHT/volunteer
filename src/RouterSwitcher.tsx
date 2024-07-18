import { Route, Routes } from 'react-router-dom';
import { NotFound, RecordHours} from './pages';
import { act } from 'react';

const RouterSwitcher = ({ props }: any) => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<RecordHours props={props}/>} />
        </Routes>
    );
};

export default RouterSwitcher;