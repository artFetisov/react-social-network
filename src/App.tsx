import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Photos from './components/Photos/Photos';
import HeaderContainer from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/LoginPage';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import store, { AppStateType } from './redux/reduxStore';
import Preloader from './components/Preloader/Preloader';
import { UsersPage } from './components/Users/UsersPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper" >
        <HeaderContainer />
        < Navbar />
        <div className="app-wrapper-content" >
          <Switch>
            <Route path='/Dialogs' render={() => {
              return <Suspense fallback={
                <div>Загрузка...</div>}>
                < DialogsContainer />
              </Suspense>
            }
            } />
            < Route path='/Profile/:userId?' render={() => {
              return <Suspense fallback={
                <div>Загрузка...</div>}>
                < ProfileContainer />
              </Suspense>
            }
            } />
            < Route path='/Users' render={() => <UsersPage pageTitle={'Samurais'} />} />
            <Route path='/Photos' render={() => <Photos />} />
            <Route path='/Login' render={() => <LoginPage />} />
            <Redirect exact from='/' to='/Profile' />
            <Route path='*' render={() => <div><h1>FILE NOT FOUND  ERROR 404 </h1></div >} />
          </Switch>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const RenderAppContainer: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
}

export default RenderAppContainer;

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
}