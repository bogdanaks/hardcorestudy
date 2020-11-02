import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../../redux/actions/userAction'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import styles from './styles.module.scss'
import { RootState } from '../../redux/types/rootTypes'

interface FormValues {
    email: string
    password: string
}

const validate = Yup.object({
    email: Yup.string().email('Неправильный email адрес').required('*Обязательно'),
    password: Yup.string()
        .max(15, 'Должно быть не более 15 символов')
        .min(6, 'Должно быть не менее 6 символов')
        .required('*Обязательно'),
})

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const loader = useSelector((state: RootState) => state.app.loader)
    const history = useHistory()

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={(values: FormValues) => {
                dispatch(loginUser(values.email, values.password, history))
            }}>
            {(formik) => (
                <div className={styles.auth}>
                    <div className={styles.logo}>
                        <Logo className={[styles.svg, loader ? styles.load : ''].join(' ')} />
                    </div>
                    <Form className={styles.formLogin} onSubmit={formik.handleSubmit}>
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

                        <button type="submit" className={styles.btnLogin}>
                            Войти
                        </button>
                    </Form>
                    <Link to="/register" className={styles.linkReg}>
                        Регистрация
                    </Link>
                    <span className={styles.site}>Hardcore Study</span>
                </div>
            )}
        </Formik>
    )
}
