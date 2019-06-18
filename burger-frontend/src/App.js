import React, {useEffect ,Suspense} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, Switch} from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";
import {connect} from "react-redux";
import Spinner from "./components/UI/Loading/Spinner/Spinner";

const app = (props) => {

    useEffect(() => {
        props.onTryAutoSignIn();
    }, []);

    if (!props.autoAuthAttempted) {
        return null;
    }

    const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'));
    const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
    const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));

    let routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/auth" exact render={props => <AsyncAuth {...props}/>}/>
            <Redirect to="/"/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/checkout" render={props => <AsyncCheckout {...props}/>}/>
                <Route path="/orders" exact render={props => <AsyncOrders {...props}/>}/>
                <Route path="/auth/logout" exact component={Logout}/>
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner/>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        autoAuthAttempted: state.auth.autoAuthAttempted
    }
};

const mapActionsToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.tryAutoAuth())
    }
};

export default connect(mapStateToProps, mapActionsToProps)(app);
