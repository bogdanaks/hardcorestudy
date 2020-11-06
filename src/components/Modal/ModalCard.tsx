import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import styles from './styles.module.scss'

import { addCard } from '../../redux/actions/cardAction'

interface FormValues {
    question: string
    answer: string
}

interface ModalCardProps {
    deckId: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const validate = Yup.object({
    question: Yup.string()
        .min(3, 'Должно быть не менее 3 символов')
        .max(200, 'Должно быть не более 200 символов')
        .required('*Обязательно'),
    answer: Yup.string()
        .min(3, 'Должно быть не менее 3 символов')
        .max(200, 'Должно быть не более 200 символов')
        .required('*Обязательно'),
})

export const ModalCard: React.FC<ModalCardProps> = ({ deckId, setShowModal }) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{
                    question: '',
                    answer: '',
                }}
                validationSchema={validate}
                onSubmit={(values: FormValues) => {
                    dispatch(addCard(deckId, values.question, values.answer))
                    setShowModal(false)
                }}>
                {(formik) => (
                    <div className={[styles.modalBlock, styles.modalCard].join(' ')}>
                        <h2>Создание новой карточки</h2>
                        <Form onSubmit={formik.handleSubmit}>
                            <ErrorMessage
                                name="question"
                                className={styles.errors}
                                component="span"
                            />
                            <div className={styles.questionBlock}>
                                <Field
                                    as="textarea"
                                    type="text"
                                    name="question"
                                    id="question"
                                    maxLength={200}
                                    placeholder="Вопрос"
                                    required
                                />
                            </div>

                            <ErrorMessage
                                name="answer"
                                className={styles.errors}
                                component="span"
                            />
                            <div className={styles.answerBlock}>
                                <Field
                                    as="textarea"
                                    type="text"
                                    name="answer"
                                    id="answer"
                                    maxLength={200}
                                    placeholder="Ответ"
                                />
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
