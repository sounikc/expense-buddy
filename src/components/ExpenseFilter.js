import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ExpenseFilter(props) {

    const changeFilterHandler = (e) => {
        props.onChangeFilterYear(e.target.value);
    }

    return (
        <div className='d-flex justify-content-end'>
            <Row>
                <Col>
                Filter By Year:
                    <Form.Select value={props.selectedyear} aria-label="Default select" size="sm" onChange={changeFilterHandler}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </Form.Select>
                </Col>
            </Row>

        </div>
    )
}

export default ExpenseFilter;