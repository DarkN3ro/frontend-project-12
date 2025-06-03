import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(vdom);
};

app();