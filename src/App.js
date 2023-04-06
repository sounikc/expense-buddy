import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import ExpenseForm from './components/ExpensesForm';

function App() {
  return (
    <div className="container-fluid">
      <Container>
          <ExpenseForm></ExpenseForm>
        
      </Container>
    </div>
  );
}

export default App;
