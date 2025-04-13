import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
const CVApp = lazy(() => import("./components/CVApp"));

function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
            <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
               <Suspense fallback={<div>Routes loading...</div>}>
                  <Routes>
                     <Route path="/" element={<CVApp />} />
                  </Routes>
               </Suspense>
            </BrowserRouter>
         </PersistGate>
      </Provider>
   );
}

export default App;
