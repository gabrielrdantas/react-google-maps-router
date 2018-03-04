import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import GoogleMapsComponent from './GoogleMapsComponent';

ReactDOM.render(<GoogleMapsComponent />, document.getElementById('root'));
registerServiceWorker();
