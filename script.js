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

// Абсурдная форма обратной связи
document.addEventListener('DOMContentLoaded', function() {
  const absurdForm = document.getElementById('absurdForm');
  const absurdClear = document.getElementById('absurdClear');
  const absurdResponse = document.getElementById('absurdResponse');
  const submitBtn = document.getElementById('submitBtn');
  
  if (absurdForm) {
    absurdForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Показываем загрузку
      submitBtn.innerHTML = '🔄 ЛЕТИТ...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      absurdResponse.style.display = 'block';
      absurdResponse.innerHTML = '<div style="text-align: center;">📡 Отправляем сигнал в космос...</div>';
      absurdResponse.style.border = '2px dashed #000';
      absurdResponse.style.background = '#fff';
      
      // Собираем данные
      const formData = {
        name: document.getElementById('absurdName').value,
        email: document.getElementById('absurdEmail').value,
        message: document.getElementById('absurdMessage').value
      };
      
      try {
        // Отправляем на наш API route
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Успех
          absurdResponse.innerHTML = `
            <div style="color: #155724; text-align: center;">
              <div style="font-size: 2em;">🎉</div>
              <strong>УСПЕХ!</strong><br>
              ${data.message}<br>
              <span style="font-size: 0.8em; color: #666;">(письмо должно прилететь через 5 абсурдных секунд)</span>
            </div>
          `;
          absurdResponse.style.border = '2px solid #155724';
          absurdResponse.style.background = '#d4edda';
          
          // Сброс формы через 3 секунды
          setTimeout(() => {
            absurdForm.reset();
            absurdResponse.style.display = 'none';
          }, 3000);
          
          // Абсурдная анимация
          submitBtn.innerHTML = '✅ УЛЕТЕЛО!';
          setTimeout(() => {
            submitBtn.innerHTML = '🚀 ОТПРАВИТЬ';
          }, 2000);
        } else {
          // Ошибка
          absurdResponse.innerHTML = `
            <div style="color: #721c24; text-align: center;">
              <div style="font-size: 2em;">💥</div>
              <strong>ОШИБКА!</strong><br>
              ${data.error || 'Что-то пошло не так...'}<br>
              <span style="font-size: 0.8em; color: #666;">(попробуйте снова или крикните громче)</span>
            </div>
          `;
          absurdResponse.style.border = '2px solid #721c24';
          absurdResponse.style.background = '#f8d7da';
        }
      } catch (error) {
        // Ошибка сети
        absurdResponse.innerHTML = `
          <div style="color: #856404; text-align: center;">
            <div style="font-size: 2em;">🌌</div>
            <strong>СИГНАЛ ПОТЕРЯН!</strong><br>
            Сообщение затерялось в космосе.<br>
            <span style="font-size: 0.8em; color: #666;">(проверьте интернет или используйте дымовые сигналы)</span>
          </div>
        `;
        absurdResponse.style.border = '2px solid #856404';
        absurdResponse.style.background = '#fff3cd';
      }
      
      // Возвращаем кнопку в исходное состояние
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = '🚀 ОТПРАВИТЬ';
      }, 2000);
    });
    
    // Кнопка сброса
    absurdClear.addEventListener('click', function() {
      absurdForm.reset();
      absurdResponse.style.display = 'none';
      
      // Анимация сброса
      this.innerHTML = '✨ СБРОШЕНО!';
      this.style.background = '#000';
      this.style.color = '#fff';
      
      setTimeout(() => {
        this.innerHTML = '🔄 СБРОС';
        this.style.background = '#fff';
        this.style.color = '#000';
      }, 1000);
    });
  }
});