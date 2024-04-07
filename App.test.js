import { render, screen } from '@testing-library/react';
import App from './App';
import Addminuser from './user';
import Login from './Login';

test('renders learn react link', () => {
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
