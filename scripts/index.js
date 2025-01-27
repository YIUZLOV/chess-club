const participants = document.querySelector('.participants');
const participantsList = participants.querySelector('.participants__list');
const participantsItem = participants.querySelector('.participants__list_card').clientWidth;
const participantsButtonNext = participants.querySelector('.participants_next');
const participantsButtonBack = participants.querySelector('.participants_back');
const counterParticipants = participants.querySelector('.participants_counter');


const stages = document.querySelector('.stages');
const stagesList = stages.querySelector('.stages__list');
const stagesListItems = stages.querySelectorAll('.stages__list_element');
const stagesButtonNext = stages.querySelector('.stage_next');
const stagesButtonBack = stages.querySelector('.stage_back');


const anchorSupportButton = document.querySelector('.button_support');
const anchorDetailButton = document.querySelector('.button_detail');
const supportBlock = document.querySelector('.session');

function stagesCarusel() {
    let stagesCaruselDots = stages.querySelector('.scroll_dots');

    //создание точек скролла для карусели
    stagesListItems.forEach((_, index) => {
        let dot = document.createElement('span');
        dot.classList.add('scroll_dots_elem');
        if (index === 0) {
            dot.classList.add('active');
        }
        stagesCaruselDots.appendChild(dot);
    })
    let dots = stagesCaruselDots.querySelectorAll('.scroll_dots_elem');

    //функция для отображения карточки карусели
    function showItem(index) {
        stagesListItems.forEach((item, idx) => {
            item.classList.remove("active");
            dots[idx].classList.remove("active");
            if (idx === index) {
                item.classList.add("active");
                dots[idx].classList.add("active");
            }
        });
    }

    stagesButtonNext.addEventListener("click", () => {
        let index = [...stagesListItems].findIndex((item) =>
            item.classList.contains("active")
        );
        if (index !== (stagesListItems.length - 1)) {
            showItem((index + 1) % stagesListItems.length);
            stagesButtonBack.removeAttribute('disabled');
        } else {
            stagesButtonNext.setAttribute('disabled', '');
        }
    });
    
    stagesButtonBack.addEventListener("click", () => {
        let index = [...stagesListItems].findIndex((item) =>
            item.classList.contains("active")
        );
        if (index !== 0) {
            showItem((index - 1) % stagesListItems.length);
            stagesButtonNext.removeAttribute('disabled');
        } else {
            stagesButtonBack.setAttribute('disabled', '');
        }
    });
}

counterParticipants.textContent = 1;
let counter = 1;

//функция проверки активности кнопок вперед/назад
function checkActiveButton(buttonNext, buttonBack) {
    if (counter > 5) {
        buttonNext.setAttribute('disabled', '');
    } else {
        buttonNext.removeAttribute('disabled');
    }
    if (counter == 1) {
        buttonBack.setAttribute('disabled', '');
        } else {
        buttonBack.removeAttribute('disabled');
        }
};

//функция пролистывания карусели вперед
function scrollToNextItemParticipants() {
    function scrollBack() {
        participantsList.scrollTo({left: 0, top: 0, behavior: 'smooth'});
                counter = 1;
                counterParticipants.textContent = counter;
                checkActiveButton(participantsButtonNext, participantsButtonBack);
    }
    if (window.innerWidth <= 768) {
        if (participantsList.scrollLeft < (participantsList.scrollWidth - participantsItem)){
            participantsList.scrollBy({left: window.innerWidth, top: 0, behavior: 'smooth'});
            counter = counter + 1;
            counterParticipants.textContent = counter;
            checkActiveButton(participantsButtonNext, participantsButtonBack);
        } else {
            scrollBack();    
        }
    } else {
        counter = 3;
        if (participantsList.scrollLeft === 0){
            participantsList.scrollBy({left: window.innerWidth, top: 0, behavior: 'smooth'});
            counter = 6;
            counterParticipants.textContent = counter;
            checkActiveButton(participantsButtonNext, participantsButtonBack);
        } else {
            scrollBack()     
        }
    }
};

//функция пролистывания карусели назад
function scrollToBackItemParticipants() {
    if (participantsList.scrollLeft != 0){
        participantsList.scrollBy({left: -window.innerWidth, top: 0, behavior: 'smooth'});
        if (window.innerWidth <= 768) {
            counter = counter - 1;
        } else {
            counter = 1;
        }
        counterParticipants.textContent = counter;
        checkActiveButton(participantsButtonNext, participantsButtonBack); 
    } else {
        participantsList.scrollTo({left: participantsList.scrollWidth, top: 0, behavior: 'smooth'});
        counter = 6;
        counterParticipants.textContent = counter;
        checkActiveButton(participantsButtonNext, participantsButtonBack); 
    }
};

stagesCarusel();

//запуск интервала автоматической смены в карусели
setInterval(scrollToNextItemParticipants, 4000);

anchorSupportButton.addEventListener('click', () => {
    supportBlock.scrollIntoView({
        behavior: "smooth"
    })
})

anchorDetailButton.addEventListener('click', () => {
    stages.scrollIntoView({
        behavior: "smooth"
    })
})

participantsButtonNext.addEventListener('click', scrollToNextItemParticipants);
participantsButtonBack.addEventListener('click', scrollToBackItemParticipants);