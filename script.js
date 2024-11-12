const entities = {
    VOMM: ["NRW", "BERLIN", "HANNOVER", "ROME", "MONTPELLIER", "LUXEMBOURG", "CHARTES", "KEHL", "MONCTON", "MÜNCHEN"],
    FJKM: ["Bethlehem Mifankatia", "Filadelfia Meaux", "Gland Fahasoavana", "Kanana Fiadanana", "Montrouge Fiorenana Paris", "Peniela Fitiavana", "Betela Fahamarinana", "Straßbourg Famonjena", "Stuttgart Fahazavana", "Wagner Finoana Paris", "Ziona Vaovao Paris"]
};

let entityCounts = {};
let totalCount = 0;

Object.keys(entities).forEach(group => entities[group].sort());

document.getElementById('groupSelect').addEventListener('change', function() {
    const selectedGroup = this.value;
    const entitySelect = document.getElementById('entitySelect');
    entitySelect.innerHTML = '<option value="" disabled selected>-- Sélectionner une entité --</option>';
    entities[selectedGroup].forEach(entity => {
        const option = document.createElement('option');
        option.value = entity;
        option.textContent = entity;
        entitySelect.appendChild(option);
    });
    entitySelect.disabled = false;
});

document.getElementById('submitBtn').addEventListener('click', function() {
    const group = document.getElementById('groupSelect').value;
    const entity = document.getElementById('entitySelect').value;
    const count = parseInt(document.getElementById('guestCountInput').value) || 0;

    if (group && entity && count > 0) {
        if (!entityCounts[entity]) entityCounts[entity] = { count: 0, group: group };
        entityCounts[entity].count += count;
        totalCount += count;
        updateEntityList();
        resetEntryFields();
    }
});

function updateEntityList() {
    const entityList = document.getElementById('entityList');
    entityList.innerHTML = '';
    Object.keys(entityCounts).forEach(entity => {
        const listItem = document.createElement('li');
        listItem.className = `entity-item ${entityCounts[entity].group}`;
        listItem.innerHTML = `
            <span><strong>${entityCounts[entity].group}</strong> - ${entity}</span>
            <div class="count-controls">
                <button onclick="decrementCount('${entity}')">-</button>
                <input type="number" value="${entityCounts[entity].count}" onchange="updateCount('${entity}', this.value)">
                <button onclick="incrementCount('${entity}')">+</button>
            </div>
        `;
        entityList.appendChild(listItem);
    });
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('entityListSection').classList.remove('hidden');
}

function incrementCount(entity) {
    entityCounts[entity].count += 1;
    totalCount += 1;
    updateEntityList();
}

function decrementCount(entity) {
    if (entityCounts[entity].count > 0) {
        entityCounts[entity].count -= 1;
        totalCount -= 1;
        updateEntityList();
    }
}

function updateCount(entity, value) {
    const newValue = parseInt(value) || 0;
    totalCount += newValue - entityCounts[entity].count;
    entityCounts[entity].count = newValue;
    updateEntityList();
}

function resetEntryFields() {
    document.getElementById('groupSelect').selectedIndex = 0;
    document.getElementById('entitySelect').innerHTML = '<option value="" disabled selected>-- Sélectionner une entité --</option>';
    document.getElementById('entitySelect').disabled = true;
    document.getElementById('guestCountInput').value = 1;
}

document.getElementById('resetBtn').addEventListener('click', function() {
    entityCounts = {};
    totalCount = 0;
    updateEntityList();
});