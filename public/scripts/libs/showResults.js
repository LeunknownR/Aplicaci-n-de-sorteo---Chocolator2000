let members = [
    [],
    []
];

const GetMemberItemResult = (nameItem, idx, invisible) => { 
    const memberItem = document.createElement('article');
    memberItem.className = 
        `member-item-relation-result member-item-relation-${idx}-result${invisible ? ' invisible' : ''}`;
    memberItem.innerHTML = /*html*/ `<span>${nameItem}</span>`;
    return memberItem;
};

// What is use 'strict'?
const RaffleMembers = (members = []) => {
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

const GetMembers = () => {
    const $sectionsRelation = document.querySelectorAll(".section-relation");
    const members = [];
    $sectionsRelation.forEach(($section, idx) => {
        members[idx] = 
            Array.from(
                $section.querySelectorAll(
                    '.container .member-item .content span')
            ).map($itemSpan => $itemSpan.innerHTML);
    });
    return members;
}

const FillMembersItem = () => {
    (members[1].length < members[0].length) &&
        members[0].forEach((_, idx) => {
            members[1][idx] = members[1][idx] ? members[1][idx]: null;
        });

    members[1] = RaffleMembers(members[1]);
    for (let i = 0; i < members.length; i++) {
        const containerResults = document.querySelector(`#container-results-${i+1}`);
        for (let j = 0; j < members[i].length; j++) {
            containerResults.append(GetMemberItemResult(
                members[i][j], i+1, 
                members[i][j] === null ? true : false));
        }
    }
}

const InitBtnBack = () => {
    document.querySelector('#btn-back').addEventListener('click', () => {
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

const InitResultTab = () => {
    const $btnRaffle = document.getElementById('btn-raffle');
    // Iniciando controlador de deshabilitación del botón de sortear
    setInterval(() => {
        const match = GetMembers();
        $btnRaffle.classList[
            (match[0].length === 0 && match[1].length >= 0) || 
            (match[1].length === 0 && match[0].length > 0) || 
            (match[0].length === 1 && match[0].length === match[1].length)
            ? "add" : "remove"]('disable');
    }, 200);
    $btnRaffle.addEventListener('click', () => {
        members = GetMembers();
        FillMembersItem();
        ShowResultView();
    });
    InitBtnBack();
}
const ShowResultView = () => {
    // Mostrando vista de resultados
    document.getElementById('section-results').classList.add('active');
    document.getElementById('section-add-relations').classList.remove('active');
    document.getElementById('section-add-relations').classList.remove('visible');
    // Mostrando transición hacia resultados
    setTimeout(() => {
        document.getElementById('section-results').classList.add('visible');
    }, 300);
}

export default InitResultTab;