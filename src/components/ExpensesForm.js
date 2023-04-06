import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import './Expense.css';
import { addExpense, getExpense } from "../services/ExpenseService";
import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function ExpenseForm() {
    const [expenseData, setExpenseData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [visibleForm, setVisibleForm] = useState(false);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [selectedYear, setSelectedYear] = useState('2023');
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitted, isValid } } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit'
    });
    const onSubmit = ((values, e)=>{
        console.log('form fields:', values);
        addExpense(values).then(response => {
            console.log('expensedata');
            if (response.status === 200) {
                getExpense().then(response => {
                    setExpenseData(response.data);
                    setExpenseName('');
                    setExpenseAmount('');
                    setExpenseDate('');
                    console.log(expenseData);
                });
            } else {
                setError(response?.message)
            }
            e.target.reset();
        }).catch((err) => { setError('Something Went Wrong'); e.target.reset();})

    })

    const nameChangeHandler = (e) => {
        setExpenseName(e.target.value)
    }

    const amountChangeHandler = (e) => {
        setExpenseAmount(e.target.value)
    }

    const dateChangeHandler = (e) => {
        setExpenseDate(e.target.value)
        console.log(e.target.value);
    }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     setError();
    //     const newExpense = {
    //         name: expenseName,
    //         amount: expenseAmount,
    //         date: expenseDate
    //     }

    //     addExpense(newExpense).then(response => {
    //         console.log('expensedata');
    //         if (response.status === 200) {
    //             getExpense().then(response => {
    //                 setExpenseData(response.data);
    //                 setExpenseName('');
    //                 setExpenseAmount('');
    //                 setExpenseDate('');
    //                 console.log(expenseData);
    //             });
    //         } else {
    //             setError(response?.message)
    //         }
    //     }).catch((err) => { setError('Something Went Wrong'); })
    // }

    const changeFilterYearHandle = (filteryear = '') => {

        setSelectedYear(filteryear);
        if (filteryear == '') { setFilterData(expenseData); }
        else {
            let filter = [...expenseData].filter((expdata) => {
                const d = new Date(expdata.date);
                const fullYear = d.getFullYear();
                return fullYear == filteryear;
            })
            console.log(filter);
            setFilterData(filter);
        }
    }

    useEffect(() => {
        changeFilterYearHandle()
    }, [expenseData])

    useEffect(() => {

        getExpense().then(response => {
            if (response.status === 200) {
                setExpenseData(response.data);
            } else {
                setError(response?.message)
            }
        });
    }, [])

    let totalExpenseAmount = 0;
    filterData.map(item => {
        return totalExpenseAmount += +item.amount;
    })

    const showWarnToast = (err) => {
        toast.warn(err, {
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    useEffect(() => {
        if (error != '') {
            showWarnToast(error)
        }
    },[error])

    const spanStyle = {
        fontSize: '35px'
    }

    return (
        <div>
            <ToastContainer />
            <div className="expense-form">
                {
                    !visibleForm &&
                    <div className="col-md-12 text-center p-2">
                        <Button variant="primary" type="button" onClick={() => { setVisibleForm(!visibleForm) }}>
                            Add Expense
                        </Button>
                    </div>
                }

                {
                    visibleForm && <div className="col-md-6 formwrapper p-2">

                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" 
                                {...register('name',{required: 'Please enter expense name!'})}/>
                               
                                {errors?.name?.message && <p>{errors?.name?.message}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" placeholder="Enter Amount" 
                                {...register('amount',{required: 'Please enter expense name!'})}/>
                               
                                {errors?.amount?.message && <p>{errors?.amount?.message}</p>}
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" {...register('date',{required:'Please enter date'})}/>
                                {errors?.date?.message && <p>{errors?.date?.message}</p>}
                            </Form.Group>
                            <div className="d-flex btnwrapper">
                                <Button variant="info" type="button" onClick={() => { setVisibleForm(!visibleForm); }}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>

                        </Form>
                    </div>
                }
                <div className="col-md-12 text-center p-5 mt-3">
                    <p><h2>Total Expense:</h2> <span style={spanStyle} data-testid='total-amount-span'>{totalExpenseAmount}</span></p>
                </div>
                <ExpenseFilter onChangeFilterYear={changeFilterYearHandle} selectedyear={selectedYear}></ExpenseFilter>

                {
                    error ? <div className="col-md-12 text-center p-5 mt-3">
                        <h2>{error}</h2>
                    </div>
                        : <ExpenseItem {...{ filterData, setExpenseData }}></ExpenseItem>
                }


            </div>
        </div>


    )
}

export default ExpenseForm;