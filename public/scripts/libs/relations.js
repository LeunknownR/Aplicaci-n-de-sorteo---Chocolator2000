import { getMembers } from "./result.js";
import templates from "./templates.js";

const initEditMemberButton = $memberItem => {
    // Asociando evento de modificación en el botón de member-item
    $memberItem.value.querySelector('.action.edit').addEventListener('click', () => {
        // Intercambiando class edit
        $memberItem.content.classList.toggle('edit');
        // Verificando si ha sido revelado el campo de modificación y estableciendo el foco
        if (!$memberItem.content.classList.contains('edit')) return;
        $memberItem.inputText.value = $memberItem.spanText.innerHTML;
        $memberItem.inputText.focus();
    });
}
const initDeleteMemberButton = ($memberItem, $sectionContainer) => {
    // Asociando handler al evento del botón delete
    $memberItem.value.querySelector('.action.delete').addEventListener('click', () => {
        $sectionContainer.removeChild($memberItem.value);
    });
}
const initInputMemberText = $memberItem => {
    $memberItem.inputText.addEventListener('keypress', evt => {
        if (evt.key !== 'Enter') return;
        if ($memberItem.inputText.value.length > 0)
            $memberItem.spanText.innerText = $memberItem.inputText.value;
        $memberItem.content.classList.remove('edit');
    });
}
const addMemberItem = ($sectionContainer) => {
    const $memberItem = {
        value: templates.getMemberItem(`Elemento`),
        content: null,
        inputText: null,
        spanText: null
    };
    // Obteniendo referencia de content de member-item
    $memberItem.content = $memberItem.value.querySelector('.content');
    // Obteniendo referencia del input
    $memberItem.inputText = $memberItem.content.querySelector("input");
    // Obteniendo referencia del span
    $memberItem.spanText = $memberItem.content.querySelector("span");
    initEditMemberButton($memberItem);
    initInputMemberText($memberItem);
    initDeleteMemberButton($memberItem, $sectionContainer);
    // Agregando elemento miembro
    $sectionContainer.appendChild($memberItem.value);
    // Inicializando valores
    $memberItem.content.classList.add('edit');
    $memberItem.inputText.focus();
}
const initAddRelation = $sectionsRelation => {
    // Inicializando secciones de relación
    $sectionsRelation.forEach($section => {
        const $btnAddMember = $section.querySelector('.btn-add-member');
        $btnAddMember.addEventListener('click', () => {
            return addMemberItem($section.querySelector('.container'));
        });
    });
}
const initDeleteRelation = $sectionsRelation => {
    // Recorriendo secciones de relación
    $sectionsRelation.forEach(($section, idx) => {
        const $btnDeleteRelation = $section.querySelector('.btn-delete-relation');
        // Asignando handler al evento click del botón de eliminar relación
        const dialogConfirm = $section.querySelector('.dialog-confirm');
        const hideDialogConfirm = () => {
            dialogConfirm.classList.remove('active');
        };
        $btnDeleteRelation.addEventListener('click', () => {
            dialogConfirm.classList.toggle('active');
            dialogConfirm.querySelector('.confirm-yes').addEventListener('click', () => {
                $section.querySelector('.container').innerHTML = '';
                hideDialogConfirm();
            });
            dialogConfirm.querySelector('.confirm-no').addEventListener('click', hideDialogConfirm);
        });
        $btnDeleteRelation.addEventListener("blur", hideDialogConfirm);
        setInterval(() => {
            $btnDeleteRelation.disabled = getMembers()[idx].length === 0;
        }, 200);
    });
}
const initRelations = () => {
    const $sectionsRelation = document.querySelectorAll('.section-relation');
    initAddRelation($sectionsRelation);
    initDeleteRelation($sectionsRelation);
}

export default initRelations;