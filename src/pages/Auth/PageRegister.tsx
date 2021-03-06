import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { regUser } from '../../redux/actions/userAction'

import styles from './styles.module.scss'
import { RootState } from '../../redux/types/rootTypes'

interface FormValues {
    name: string
    email: string
    password: string
}

const validate = Yup.object<FormValues>({
    name: Yup.string()
        .max(20, 'Должно быть не более 20 символов')
        .min(2, 'Должно быть не менее 2 символов')
        .required('*Обязательно'),
    email: Yup.string().email('Неправильный email адрес').required('*Обязательно'),
    password: Yup.string()
        .max(15, 'Должно быть не более 15 символов')
        .min(6, 'Должно быть не менее 6 символов')
        .required('*Обязательно'),
})

export const PageRegister: React.FC = () => {
    const dispatch = useDispatch()
    const loader = useSelector((state: RootState) => state.app.loader)
    const history = useHistory()

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={(values: FormValues) => {
                dispatch(regUser(values.name, values.email, values.password, history))
            }}>
            {(formik) => (
                <div className={styles.auth}>
                    <h1>Регистрация</h1>
                    <Form className={styles.formLogin} onSubmit={formik.handleSubmit}>
                        <ErrorMessage name="name" className={styles.errors} component="span" />
                        <div className={styles.emailBlock}>
                            <Field type="text" name="name" id="name" required />
                            <label htmlFor="name" className={styles.labelName}>
                                Name
                            </label>
                        </div>

                        <ErrorMessage name="email" className={styles.errors} component="span" />
                        <div className={styles.emailBlock}>
                            <Field type="text" name="email" id="email" required />
                            <label htmlFor="email" className={styles.labelEmail}>
                                E-mail
                            </label>
                        </div>

                        <ErrorMessage name="password" className={styles.errors} component="span" />
                        <div className={styles.passwordBlock}>
                            <Field type="password" name="password" id="password" required />
                            <label htmlFor="password" className={styles.labelPassword}>
                                Password
                            </label>
                        </div>
                        <button type="submit" disabled={loader && true} className={styles.btnReg}>
                            Зарегистрироваться
                        </button>
                    </Form>
                    <Link to="/login" className={styles.linkLogin}>
                        Войти
                    </Link>
                </div>
            )}
        </Formik>
    )
}
