import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import styles from './styles.module.scss'

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
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={(values: FormValues) => {
                console.log(values)
            }}>
            {(formik) => (
                <div className={styles.auth}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <Form className={styles.formLogin} onSubmit={formik.handleSubmit}>
                        <ErrorMessage name="email" className={styles.errors} component="span" />
                        <div className={styles.emailBlock}>
                            <Field type="text" name="email" />
                            <label htmlFor="email" className={styles.labelEmail}>
                                E-mail
                            </label>
                        </div>

                        <ErrorMessage name="password" className={styles.errors} component="span" />
                        <div className={styles.passwordBlock}>
                            <Field type="password" name="password" />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button type="submit">Войти</button>
                    </Form>
                    <Link to="/register" className={styles.link}>
                        Регистрация
                    </Link>
                    <span className={styles.site}>Hardcore Study</span>
                </div>
            )}
        </Formik>
    )
}
