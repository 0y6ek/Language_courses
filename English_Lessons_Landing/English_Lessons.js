// Функция для выбора услуги
function selectServiceCard(card) {
    // Убираем выделение с других карточек
    const allCards = document.querySelectorAll('.service-card.service-button');
    allCards.forEach(c => c.classList.remove('selected'));
    
    // Выделяем выбранную карточку
    card.classList.add('selected');
    
    // Получаем тип курса и переходим к форме
    const courseType = card.getAttribute('data-course-type');
    scrollToBookingForm(courseType);
}

// Функция для прокрутки к форме
function scrollToBookingForm(courseType = null) {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Если передан тип курса, выбираем его в форме
        if (courseType) {
            setTimeout(() => {
                const courseTypeSelect = document.getElementById('courseType');
                if (courseTypeSelect) {
                    courseTypeSelect.value = courseType;
                    // Убираем ошибку валидации если она была
                    clearFieldError('courseType');
                    
                    // Добавляем визуальную обратную связь
                    courseTypeSelect.style.borderColor = '#5D8BFF';
                    courseTypeSelect.style.backgroundColor = '#f8f9ff';
                    
                    // Возвращаем обычные стили через 2 секунды
                    setTimeout(() => {
                        courseTypeSelect.style.borderColor = '';
                        courseTypeSelect.style.backgroundColor = '';
                    }, 2000);
                }
            }, 500); // Небольшая задержка для плавности
        }
    }
}

// Добавляем обработчики событий для кнопок
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка в header
    const signUpBtn = document.getElementById('signUp');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', scrollToBookingForm);
    }
    
    // Кнопка CTA в hero секции
    const ctaBtn = document.querySelector('.cta-button');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', scrollToBookingForm);
    }
    
    // Добавляем обработчики для карточек услуг (теперь это button элементы)
    const serviceCards = document.querySelectorAll('.service-card.service-button');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            selectServiceCard(this);
        });
    });
    
    // Добавляем валидацию в реальном времени
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const courseTypeField = document.getElementById('courseType');
    
    if (nameField) {
        nameField.addEventListener('input', function() {
            const name = this.value.trim();
            if (name.length > 0) {
                const error = validateName(name);
                if (error) {
                    showFieldError('name', error);
                } else {
                    clearFieldError('name');
                }
            } else {
                clearFieldError('name');
            }
        });
        
        nameField.addEventListener('blur', function() {
            const name = this.value.trim();
            const error = validateName(name);
            if (error) {
                showFieldError('name', error);
            } else {
                clearFieldError('name');
            }
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            const phone = this.value.trim();
            if (phone.length > 0) {
                const error = validatePhone(phone);
                if (error) {
                    showFieldError('phone', error);
                } else {
                    clearFieldError('phone');
                }
            } else {
                clearFieldError('phone');
            }
        });
        
        phoneField.addEventListener('blur', function() {
            const phone = this.value.trim();
            const error = validatePhone(phone);
            if (error) {
                showFieldError('phone', error);
            } else {
                clearFieldError('phone');
            }
        });
    }
    
    if (courseTypeField) {
        courseTypeField.addEventListener('change', function() {
            const courseType = this.value;
            const error = validateCourseType(courseType);
            if (error) {
                showFieldError('courseType', error);
            } else {
                clearFieldError('courseType');
            }
        });
    }
});

// Функция валидации имени
function validateName(name) {
    if (!name || name.trim().length === 0) {
        return "Имя обязательно для заполнения";
    }
    if (name.trim().length < 2) {
        return "Имя должно содержать минимум 2 символа";
    }
    if (!/^[а-яА-ЯёЁa-zA-Z\s\-']+$/.test(name.trim())) {
        return "Имя может содержать только буквы, пробелы, дефисы и апострофы";
    }
    return null;
}

// Функция валидации телефона
function validatePhone(phone) {
    if (!phone || phone.trim().length === 0) {
        return "Телефон обязателен для заполнения";
    }
    // Убираем все символы кроме цифр, +, -, (, ), пробелов
    const cleanPhone = phone.replace(/[^\d+\-() ]/g, '');
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    
    if (digitsOnly.length < 10) {
        return "Телефон должен содержать минимум 10 цифр";
    }
    if (digitsOnly.length > 15) {
        return "Телефон не может содержать более 15 цифр";
    }
    if (!/^[\+]?[0-9\-\(\)\s]+$/.test(phone)) {
        return "Телефон может содержать только цифры, +, -, скобки и пробелы";
    }
    return null;
}

// Функция валидации типа курса
function validateCourseType(courseType) {
    if (!courseType || courseType.trim().length === 0) {
        return "Тип курса обязателен для выбора";
    }
    const validTypes = ['personal', 'exam', 'business'];
    if (!validTypes.includes(courseType)) {
        return "Выберите корректный тип курса";
    }
    return null;
}

// Функция для отображения ошибки поля
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Функция для очистки ошибки поля
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Функция для очистки всех ошибок
function clearAllErrors() {
    clearFieldError('name');
    clearFieldError('phone');
    clearFieldError('courseType');
}

async function send(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    
    const paragraph = document.querySelector("#submittion");
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const courseType = document.getElementById("courseType").value;
    const comment = document.getElementById("comment").value.trim();
    
    // Очищаем предыдущие ошибки
    clearAllErrors();
    
    // Валидируем поля
    let hasErrors = false;
    
    const nameError = validateName(name);
    if (nameError) {
        showFieldError('name', nameError);
        hasErrors = true;
    }
    
    const phoneError = validatePhone(phone);
    if (phoneError) {
        showFieldError('phone', phoneError);
        hasErrors = true;
    }
    
    const courseTypeError = validateCourseType(courseType);
    if (courseTypeError) {
        showFieldError('courseType', courseTypeError);
        hasErrors = true;
    }
    
    if (hasErrors) {
        showMessage("❌ Пожалуйста, исправьте ошибки в форме", "error");
        return false;
    }
    
    // Показываем индикатор загрузки
    paragraph.innerHTML = "⏳ Отправляем заявку...";
    paragraph.style.color = "#2196F3";
    paragraph.style.fontWeight = "bold";
    paragraph.style.marginTop = "15px";
    paragraph.style.padding = "10px";
    paragraph.style.backgroundColor = "#f0f8ff";
    paragraph.style.border = "1px solid #2196F3";
    paragraph.style.borderRadius = "5px";
    paragraph.style.display = "block";
    
    try {
        // Отправляем данные на сервер
        const response = await fetch('http://localhost:5000/submit-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                courseType: courseType,
                comment: comment
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Успешная отправка
            showMessage("✅ Спасибо, " + name + "! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.", "success");
            
            // Очищаем форму
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("courseType").value = "";
            document.getElementById("comment").value = "";
            
            // Очищаем ошибки
            clearAllErrors();
        } else {
            // Ошибка от сервера
            showMessage("❌ " + result.message, "error");
        }
        
    } catch (error) {
        console.error('Ошибка при отправке заявки:', error);
        showMessage("❌ Ошибка соединения с сервером. Проверьте, что сервер запущен.", "error");
    }
    
    // Предотвращаем стандартную отправку формы
    return false;
}

function showMessage(message, type) {
    const paragraph = document.querySelector("#submittion");
    
    paragraph.innerHTML = message;
    paragraph.style.fontWeight = "bold";
    paragraph.style.marginTop = "15px";
    paragraph.style.padding = "10px";
    paragraph.style.borderRadius = "5px";
    paragraph.style.display = "block";
    
    if (type === "success") {
        paragraph.style.color = "#4CAF50";
        paragraph.style.backgroundColor = "#f0f8f0";
        paragraph.style.border = "1px solid #4CAF50";
    } else if (type === "error") {
        paragraph.style.color = "#f44336";
        paragraph.style.backgroundColor = "#fff5f5";
        paragraph.style.border = "1px solid #f44336";
    }
    
    // Автоматически скрываем уведомление через 6 секунд
    setTimeout(() => {
        paragraph.style.display = "none";
        paragraph.innerHTML = "";
    }, 6000);
}
