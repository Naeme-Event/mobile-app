import EventProvider from './providers/EventProvider';
import CartProvider from './providers/CartProvider';
import Navigation from './navigation/navigation';

function App(): JSX.Element {
  return (
    // <AuthProvider>
    <EventProvider>
      <CartProvider>
        <Navigation />
      </CartProvider>
    </EventProvider>
    // </AuthProvider>
  );
}
export default App;
