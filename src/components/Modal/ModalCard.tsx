import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import styles from './styles.module.scss'

import { addCard, editCard } from '../../redux/actions/cardAction'

interface FormValues {
    question: string
    answer: string
}

interface ModalCardProps {
    type: 'create' | 'edit'
    deckId: string
    questionValue?: string
    answerValue?: string
    cardId?: string
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

export const ModalCard: React.FC<ModalCardProps> = ({
    type,
    deckId,
    setShowModal,
    questionValue,
    answerValue,
    cardId,
}) => {
    const dispatch = useDispatch()
    const modalRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            setShowModal(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{
                    question: questionValue || '',
                    answer: answerValue || '',
                }}
                validationSchema={validate}
                onSubmit={(values: FormValues) => {
                    if (type === 'create') {
                        dispatch(addCard(deckId, values.question, values.answer))
                    } else {
                        dispatch(editCard(deckId, cardId!, values.question, values.answer))
                    }
                    setShowModal(false)
                }}>
                {(formik) => (
                    <div className={[styles.modalBlock, styles.modalCard].join(' ')} ref={modalRef}>
                        <h2>
                            {type === 'create' ? 'Создание новой карточки' : 'Изменение карточки'}
                        </h2>
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
                                <button type="submit">
                                    {type === 'create' ? 'Создать' : 'Сохранить'}
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}
