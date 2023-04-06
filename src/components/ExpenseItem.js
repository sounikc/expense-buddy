import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ExpenseItem = (data) => {
let content;
console.log(data.filterData);
    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]
        content = <div className='expense-item-wrapper'>
        {
            data.filterData.length > 0 ?
                <div className="expense-item-wrapper">
                    {
                        data.filterData.map((item, index) => {
                            let d = new Date(item.date);
                            return (
                                <div className="expense-item p-5" key={index}>
                                <Row className="justify-content-md-center">
                                    <Col></Col>
                                    <Col><h4>{d.getDate()} {months[d.getMonth()]}</h4>
                                                {/* <p>{days[d.getDay()]}</p> */}
                                                <p>{d.getFullYear()}</p></Col>
                                    <Col>{item.name}</Col>
                                    <Col>{item.amount}</Col>
                                    <Col><button className="btn btn-primary">Delete</button></Col>
                                    <Col></Col>
                                </Row>
                                </div>
                            )
                        })
                    }
                </div>
                : <p className='no-item'>No Expense Found</p>
        }
        </div>
      return <div className="row">{content}</div>
}

export default ExpenseItem;