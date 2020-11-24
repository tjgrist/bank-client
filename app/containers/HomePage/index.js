/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { routes } from 'utils';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(push(routes.dashboard.path));
  }, []);

  return null;
}
