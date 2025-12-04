const slides = document.querySelector('.slides');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;
const total = slides.children.length;
const slideWidth = 300; // ширина слайда

slides.style.width = `${total * slideWidth}px`;

next.addEventListener('click', () => {
  index = (index + 1) % total;
  slides.style.transform = `translateX(-${index * slideWidth}px)`;
});

prev.addEventListener('click', () => {
  index = (index - 1 + total) % total;
  slides.style.transform = `translateX(-${index * slideWidth}px)`;
});

// Обработка формы обратной связи
const feedbackForm = document.getElementById('feedbackForm');
const clearFormBtn = document.getElementById('clearForm');
const formMessage = document.getElementById('formMessage');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Показываем загрузку
        formMessage.style.display = 'block';
        formMessage.innerHTML = 'Отправляем в пустоту...';
        formMessage.style.background = '#fff';
        formMessage.style.border = '2px dashed #000';
        
        // Собираем данные формы
        const formData = new FormData(this);
        
        // Отправляем AJAX запрос
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.innerHTML = '✓ ' + data.message;
                formMessage.style.background = '#d4edda';
                formMessage.style.border = '2px solid #155724';
                formMessage.style.color = '#155724';
                
                // Очищаем форму через 3 секунды
                setTimeout(() => {
                    feedbackForm.reset();
                    formMessage.style.display = 'none';
                }, 3000);
            } else {
                formMessage.innerHTML = '✗ ' + data.errors.join('<br>');
                formMessage.style.background = '#f8d7da';
                formMessage.style.border = '2px solid #721c24';
                formMessage.style.color = '#721c24';
            }
        })
        .catch(error => {
            formMessage.innerHTML = '✗ Ошибка сети. Попробуйте снова или крикните в окно.';
            formMessage.style.background = '#f8d7da';
            formMessage.style.border = '2px solid #721c24';
            formMessage.style.color = '#721c24';
        });
    });
}

// Кнопка очистки формы
if (clearFormBtn) {
    clearFormBtn.addEventListener('click', function() {
        feedbackForm.reset();
        formMessage.style.display = 'none';
        
        // Анимация очистки
        this.style.background = '#000';
        this.style.color = '#fff';
        setTimeout(() => {
            this.style.background = '#fff';
            this.style.color = '#000';
        }, 200);
    });
}