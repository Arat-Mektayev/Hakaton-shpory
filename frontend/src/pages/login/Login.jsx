import styles from './Login.module.css';

import  { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Toaster, toast } from 'sonner';
import axios from 'axios';



function Login () {
    const [isLogin , setIsLogin] = useState(true);
    const navigate = useNavigate();

    return (
        <>
            {/* <header className={styles.logheader}>
                <button className={styles.backbutton} onClick={ () => {  navigate('/')}}>
                    <img className={styles.eximg} src={exitimg} />
                </button>
            </header> */}

            <div className={styles.form}>
                <div className={styles.entryCard}>
                    <div className={styles.changebuttonform}  >
                        <button className={`${styles.changebutton1} ${isLogin ? styles.active : ''}`} onClick={() => setIsLogin(true)} >
                            Вход
                        </button>

                        <button className={`${styles.changebutton2} ${!isLogin ? styles.active : ''}`}  onClick={() => setIsLogin(false)}>
                            Регистрация
                        </button>
                    </div>

                    {isLogin? <EntryForm /> : <LoginForm />}

                </div>

            </div>
        </>
    );
}

function EntryForm () {
    const [formData, setFormData] = useState({
        telephone: '',
        mail: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateRussianPhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        console.log('Очищенный номер:', cleanPhone);

        // Проверяем: должно быть 11 цифр и начинаться с 7 или 8
        const phoneRegex = /^(7|8)\d{10}$/;
        const isValid = phoneRegex.test(cleanPhone);
        console.log('Номер валиден?:', isValid);

        return isValid;
    };


    const extractPhoneDigits = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        console.log('До извлечения цифр:', cleanPhone);

        // Убираем первую цифру (7 или 8) и берем следующие 10 цифр
        const digitsOnly = cleanPhone.substring(1);
        console.log('После извлечения 10 цифр:', digitsOnly);

        return digitsOnly;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.telephone || !formData.mail || !formData.password) {
            toast.error('Пожалуйста, заполните все поля');
            return;
        }

        if (!validateRussianPhone(formData.telephone)) {
            toast.error('Неверный формат телефона. Используйте российский номер (+7XXX...)');
            return;
        }

        setLoading(true);

        try {
            const loadingId = toast.loading('Вход...');

            const dataToSend = {
                ...formData,
                telephone: extractPhoneDigits(formData.telephone)
            };

            console.log('Данные для входа:', dataToSend);

            const response = await axios.post('/api/userLogin', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast.dismiss(loadingId);

            if (response.data.error) {
                toast.error(response.data.error);
            } else if (response.data.Match === true) {
                toast.success('Вход выполнен успешно!');
                // Сохраняем ID пользователя в localStorage или context
                localStorage.setItem('userId', response.data.id);
                navigate(`/user/${response.data.id}`);
            } else {
                toast.error('Ошибка входа. Проверьте данные.');
            }

        } catch (error) {
            console.error('Ошибка входа:', error);

            if (error.response) {
                const errorMessage = error.response.data?.error || error.response.data?.message || 'Ошибка при входе';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('Нет ответа от сервера');
            } else {
                toast.error('Произошла ошибка при отправке запроса');
            }
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={styles.eCard}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputform}>
                    <p>
                        Ном.телефона:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"Номер телефона(ру-формат)"}
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                    />
                    <p>
                        Эл.почта:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"Введите почту"}
                        name="mail"
                        value={formData.mail}
                        onChange={handleInputChange}
                    />
                    <p>
                        Пароль:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"Введите пароль"}
                        type={"password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <p >
                        <br />
                        <button
                            className={styles.entrybutton}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Вход...' : 'Вход'}
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}

function LoginForm () {
    const [confirm, setConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        telephone: '',
        mail: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    // Функция проверки российского номера телефона
    const validateRussianPhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        console.log('Очищенный номер:', cleanPhone);

        // Проверяем: должно быть 11 цифр и начинаться с 7 или 8
        const phoneRegex = /^(7|8)\d{10}$/;
        const isValid = phoneRegex.test(cleanPhone);
        console.log('Номер валиден?:', isValid);

        return isValid;
    };

    // Функция для извлечения только 10 цифр номера
    const extractPhoneDigits = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        console.log('До извлечения цифр:', cleanPhone);

        // Убираем первую цифру (7 или 8) и берем следующие 10 цифр
        const digitsOnly = cleanPhone.substring(1);
        console.log('После извлечения 10 цифр:', digitsOnly);

        return digitsOnly;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Текущий номер в форме:', formData.telephone);

        if (!confirm) {
            toast.error('Пожалуйста, примите пользовательское соглашение');
            return;
        }

        if (!formData.name || !formData.telephone || !formData.mail || !formData.password) {
            toast.error('Пожалуйста, заполните все поля');
            return;
        }

        // Проверка номера телефона
        if (!validateRussianPhone(formData.telephone)) {
            toast.error('Неверный формат телефона. Используйте российский номер (+7XXX...)');
            return;
        }

        setLoading(true);

        try {
            const loadingId = toast.loading('Регистрация...');

            // Подготавливаем данные для отправки
            const dataToSend = {
                ...formData,
                telephone: extractPhoneDigits(formData.telephone)
            };

            console.log('Данные для отправки:', dataToSend);

            const response = await axios.post('/api/user', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast.dismiss(loadingId);

            if (response.data.error) {
                toast.error(response.data.error);
            } else if (response.data.res) {
                toast.success(response.data.res);
                setFormData({
                    name: '',
                    telephone: '',
                    mail: '',
                    password: ''
                });
                setConfirm(false);
            } else {
                toast.error('Неизвестный ответ от сервера');
            }

        } catch (error) {
            console.error('Ошибка регистрации:', error);

            if (error.response) {
                const errorMessage = error.response.data?.error || error.response.data?.message || 'Ошибка при регистрации';
                toast.error(errorMessage);
            } else if (error.request) {
                toast.error('Нет ответа от сервера');
            } else {
                toast.error('Произошла ошибка при отправке запроса');
            }
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={styles.eCard}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputform}>
                    <p>
                        Ваше имя:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"Введите ваше имя"}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <p>
                        Ном.телефона:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"+79123456789"}
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                    />

                    <p>
                        Эл.почта:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"Введите почту"}
                        name="mail"
                        type="email"
                        value={formData.mail}
                        onChange={handleInputChange}
                    />

                    <p>
                        Пароль:
                    </p>
                    <input
                        className={styles.input_}
                        placeholder={"Придумайте пароль"}
                        type={"password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <p style={{ fontSize: "small"}}>
                        <input
                            type={"checkbox"}
                            checked={confirm}
                            onChange={() => { setConfirm(!confirm) }}
                        />
                        принятие условий <a
                        href="/useragreement"
                        target="_blank"
                        rel="noopener noreferrer"
                    > пользовательского соглашения </a>
                    </p>

                    <p>
                        <button
                            className={styles.entrybutton}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;