import { render, fireEvent } from '@testing-library/react-native';
import Profile from '@/app/(tabs)/profile';

describe('<Profile />', () => {
  test('renders correctly on the Profile page', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('Your uploads will appear here.')).toBeTruthy();
  });

  test('shows the profile title', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('Legendary')).toBeTruthy();
  });

  test('shows the username', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('@doug')).toBeTruthy();
  });

  test('shows the description placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);
    expect(getByPlaceholderText('Write a description')).toBeTruthy();
  });

  test('updates the description when typing', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const input = getByPlaceholderText('Write a description');
    fireEvent.changeText(input, 'Hello world');

    expect(input.props.value).toBe('Hello world');
  });
});