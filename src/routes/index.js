import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';
import { Main as MainLayout, Minimal as MinimalLayout } from './../layouts';

import {
  Dashboard as DashboardView,
  ServiceEmployee as ServiceEmployeeView,
  UserList as UserListView,
  BusinessHours as BusinessHoursView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Appointments as AppointmentView,
  ForgotPassword as ForgotPasswordView,
  ResetePassword as ResetPasswordView
} from '../views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <Route
        component={DashboardView}
        exact
        isPrivate
        layout={MainLayout}
        path="/dashboard"
      />
      <Route
        component={UserListView}
        exact
        isPrivate
        layout={MainLayout}
        path="/appointments"
      />
      <Route
        component={ServiceEmployeeView}
        exact
        isPrivate
        layout={MainLayout}
        path="/services"
      />
      <Route
        component={AppointmentView}
        exact
        isPrivate
        layout={MainLayout}
        path="/new-appointment"
      />
      <Route
        component={ForgotPasswordView}
        exact
        layout={MinimalLayout}
        path="/forgot-password"
      />
      <Route
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
        path="/reset-password/"
      />
      <Route
        component={BusinessHoursView}
        exact
        isPrivate
        layout={MainLayout}
        path="/businessHours"
      />
      <Route
        component={AccountView}
        exact
        isPrivate
        layout={MainLayout}
        path="/account"
      />
      <Route
        component={SettingsView}
        exact
        isPrivate
        layout={MainLayout}
        path="/settings"
      />
      <Route
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <Route
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Route
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
