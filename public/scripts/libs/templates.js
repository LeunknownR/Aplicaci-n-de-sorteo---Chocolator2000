const templates = {
    getMemberItem: (nameItem = "Elemento") => { 
        const memberItem = document.createElement('article');
        memberItem.className = "member-item";
        memberItem.innerHTML = /*html*/ `
            <div class="content">
                <span>${nameItem}</span>
                <input type="text"/>
            </div>
            <div class="actions">
                <button class="action edit">
                    <iconify-icon icon="teenyicons:edit-circle-solid"></iconify-icon>
                </button>
                <button class="action delete">
                    <iconify-icon icon="fluent:delete-24-filled"></iconify-icon>
                </button>
            </div>
        `;
        return memberItem;
    },
    getMemberItemResult: ({
        nameItem, invisible, idx
    }) => {
        const memberItem = document.createElement('article');
        memberItem.className = `member-item-relation-result member-item-relation-${idx + 1}-result${invisible ? ' invisible' : ''}`;
        memberItem.innerHTML = /*html*/ `<span>${nameItem}</span>`;
        return memberItem;
    }
};
export default templates;