import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.window = global;
window.localStorage = jest.fn();

configure({ adapter: new Adapter() });
