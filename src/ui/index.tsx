import ReactDOM from 'react-dom';
import { App } from './App';

const appRoot = document.querySelector('#app') as HTMLDivElement;

if (appRoot) {
  ReactDOM.render(<App />, appRoot);
}
