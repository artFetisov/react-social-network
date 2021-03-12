import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import RenderAppContainer from './App';

//test('renders learn react link', () => {
//  const { getByText } = render(<RenderAppContainer />);
//  const linkElement = getByText(/learn react/i);
//  expect(linkElement).toBeInTheDocument();
//});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RenderAppContainer />, div);
  ReactDOM.unmountComponentAtNode(div)
});