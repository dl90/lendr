import './app.scss';

import '../pages/index';

function MyApp({ Component, pageProps }) {
    return <div>

        <Component {...pageProps} />
        </div>
}

export default MyApp;
