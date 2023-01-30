import templates from "./templates.js";

const $btnBack = document.querySelector('#btn-back');
export const getMembers = () => {
    const $sectionsRelation = document.querySelectorAll(".section-relation");
    const members = [...$sectionsRelation].map($section => {
        return [...$section.querySelectorAll('.container .member-item .content span')]
            .map($itemSpan => $itemSpan.innerText);
    });
    return members;
}
const raffleMembers = (members = []) => {
    const taken = [];
    const result = [];
    for (let i = 0; i < members.length; i++) {
        let idx = 0;
        do {
            idx = parseInt(Math.random()*members.length);
        }
        while (taken.includes(idx));
        result.push(members[idx]);
        taken.push(idx);
    }
    return result;
}
const fillMembersItem = () => {
    let members = getMembers();
    if (members[1].length < members[0].length) 
        members[0].forEach((_, idx) => {
            members[1][idx] = members[1][idx] ? members[1][idx] : null;
        });
    members = members.map(raffleMembers);
    for (let i = 0; i < members.length; i++) {
        const containerResults = document.querySelector(`#container-results-${i+1}`);
        for (let j = 0; j < members[i].length; j++) {
            containerResults.append(
                templates.getMemberItemResult({
                    nameItem: members[i][j], 
                    invisible: members[i][j] === null ? true : false,
                    idx: i
                })
            );
        }
    }
}
const initBtnBack = () => {
    $btnBack.addEventListener('click', () => {
        // Mostrando vista inicial
        document.getElementById('section-results').classList.remove('active');
        document.getElementById('section-results').classList.remove('visible');
        document.getElementById('section-add-relations').classList.add('active');
        // Mostrando transición hacia resultados
        setTimeout(() => {
            document.getElementById('section-add-relations').classList.add('visible');
        }, 300);
        // Borrando resultados
        document.querySelectorAll('.container-results').forEach(container => {
            container.innerHTML = '';
        });
    });
}
const showResultView = () => {
    // Mostrando vista de resultados
    document.getElementById('section-results').classList.add('active');
    document.getElementById('section-add-relations').classList.remove('active');
    document.getElementById('section-add-relations').classList.remove('visible');
    // Mostrando transición hacia resultados
    setTimeout(() => {
        document.getElementById('section-results').classList.add('visible');
    }, 300);
}
// Generador de nombres con apellidos
const initResultTab = () => {
    const $btnRaffle = document.getElementById('btn-raffle');
    // Iniciando controlador de deshabilitación del botón de sortear
    setInterval(() => {
        const match = getMembers();
        $btnRaffle.classList[
            (match[0].length === 0 && match[1].length >= 0) || 
            (match[1].length === 0 && match[0].length > 0) || 
            (match[0].length === 1 && match[0].length === match[1].length)
            ? "add" : "remove"]('disabled');
    }, 200);
    $btnRaffle.addEventListener('click', () => {
        fillMembersItem();
        showResultView();
    });
}
const initResult = () => {
    initBtnBack();
    initResultTab();
}

export default initResult;