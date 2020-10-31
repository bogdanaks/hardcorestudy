import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { regUser } from '../../redux/actions/userAction'

import { ReactComponent as Logo } from '../../assets/logo.svg'
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

export const Register: React.FC = () => {
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
                    <div className={styles.logo}>
                        <Logo className={[styles.svg, loader ? styles.load : ''].join(' ')} />
                    </div>
                    <Form className={styles.formLogin} onSubmit={formik.handleSubmit}>
                        <ErrorMessage name="name" className={styles.errors} component="span" />
                        <div className={styles.emailBlock}>
                            <Field type="text" name="name" />
                            <label htmlFor="name" className={styles.labelEmail}>
                                Name
                            </label>
                        </div>

                        <ErrorMessage name="email" className={styles.errors} component="span" />
                        <div className={styles.emailBlock}>
                            <Field type="text" name="email" />
                            <label htmlFor="emailI" className={styles.labelEmail}>
                                E-mail
                            </label>
                        </div>

                        <ErrorMessage name="password" className={styles.errors} component="span" />
                        <div className={styles.passwordBlock}>
                            <Field type="password" name="password" />
                            <label htmlFor="passwordI">Password</label>
                        </div>
                        <button type="submit" disabled={loader && true}>
                            Зарегистрироваться
                        </button>
                    </Form>
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                    <span className={styles.site}>Hardcore Study</span>
                </div>
            )}
        </Formik>
    )
}
