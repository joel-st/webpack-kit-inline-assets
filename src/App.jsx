// preact
import { h, render } from 'preact';

// internal resources
import './style.scss';

// internal components
import Load from '@components/Load.jsx';

// inject app
const App = <Load />;
render(App, document.getElementById('view'));
