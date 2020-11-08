import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import styles from './styles.module.scss'

import { addDeck, editDeck } from '../../redux/actions/deckAction'

interface FormValues {
    title: string
    description: string
}

interface ModalDeckProps {
    type: 'create' | 'edit'
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    titleValue?: string
    descriptionValue?: string
    colorValue?: string
    deckId?: string
    theme: 'dark' | 'light'
}

const validate = Yup.object({
    title: Yup.string()
        .min(3, 'Должно быть не менее 3 символов')
        .max(20, 'Должно быть не более 20 символов')
        .required('*Обязательно'),
    description: Yup.string().max(200, 'Должно быть не более 200 символов'),
})

export const ModalDeck: React.FC<ModalDeckProps> = ({
    type,
    setShowModal,
    titleValue,
    descriptionValue,
    colorValue,
    deckId,
    theme,
}) => {
    const [color, setColor] = React.useState<string>(colorValue || 'blue')
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
        <div className={[styles.wrapper, theme === 'dark' ? styles.dark : ''].join(' ')}>
            <Formik
                initialValues={{
                    title: titleValue || '',
                    description: descriptionValue || '',
                }}
                validationSchema={validate}
                onSubmit={(values: FormValues) => {
                    if (type === 'create') {
                        dispatch(addDeck(values.title, color, values.description))
                    } else {
                        dispatch(editDeck(deckId!, values.title, values.description, color))
                    }
                    setShowModal(false)
                }}>
                {(formik) => (
                    <div className={styles.modalBlock} ref={modalRef}>
                        <h2>{type === 'create' ? 'Создание новой колоды' : 'Изменение колоды'}</h2>
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
                                <button type="submit">
                                    {type === 'create' ? 'Создать' : 'Изменить'}
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}
