import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import styles from './styles.module.scss'

import { addDeck } from '../../redux/actions/deckAction'

interface FormValues {
    title: string
    description: string
}

const validate = Yup.object({
    title: Yup.string()
        .min(3, 'Должно быть не менее 3 символов')
        .max(20, 'Должно быть не более 20 символов')
        .required('*Обязательно'),
    description: Yup.string().max(200, 'Должно быть не более 200 символов'),
})

export const ModalDeck: React.FC<{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal }) => {
    const [color, setColor] = React.useState<string>('blue')
    const dispatch = useDispatch()
    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                }}
                validationSchema={validate}
                onSubmit={(values: FormValues) => {
                    dispatch(addDeck(values.title, color, values.description))
                    setShowModal(false)
                }}>
                {(formik) => (
                    <div className={styles.modalBlock}>
                        <h2>Создание новой колоды</h2>
                        <Form onSubmit={formik.handleSubmit}>
                            <ErrorMessage name="title" className={styles.errors} component="span" />
                            <div className={styles.titleBlock}>
                                <Field type="text" name="title" id="title" required />
                                <label htmlFor="title" className={styles.labelTitle}>
                                    Название
                                </label>
                            </div>

                            <ErrorMessage
                                name="description"
                                className={styles.errors}
                                component="span"
                            />
                            <div className={styles.descriptionBlock}>
                                <Field
                                    as="textarea"
                                    type="text"
                                    name="description"
                                    id="description"
                                    maxLength={200}
                                    placeholder="Описание"
                                />
                            </div>
                            <div className={styles.colors}>
                                <button
                                    type="button"
                                    onClick={() => setColor('blue')}
                                    className={[
                                        styles.blue,
                                        color === 'blue' && styles.active,
                                    ].join(' ')}></button>
                                <button
                                    type="button"
                                    onClick={() => setColor('red')}
                                    className={[styles.red, color === 'red' && styles.active].join(
                                        ' ',
                                    )}></button>
                                <button
                                    type="button"
                                    onClick={() => setColor('black')}
                                    className={[
                                        styles.black,
                                        color === 'black' && styles.active,
                                    ].join(' ')}></button>
                                <button
                                    type="button"
                                    onClick={() => setColor('green')}
                                    className={[
                                        styles.green,
                                        color === 'green' && styles.active,
                                    ].join(' ')}></button>
                                <button
                                    type="button"
                                    onClick={() => setColor('violet')}
                                    className={[
                                        styles.violet,
                                        color === 'violet' && styles.active,
                                    ].join(' ')}></button>
                                <button
                                    type="button"
                                    onClick={() => setColor('sea')}
                                    className={[styles.sea, color === 'sea' && styles.active].join(
                                        ' ',
                                    )}></button>
                            </div>
                            <div className={styles.controls}>
                                <button onClick={() => setShowModal(false)}>Отмена</button>
                                <button type="submit">Создать</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}
